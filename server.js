const Express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
var fs = require('fs');
var datetime = require('node-datetime');
const port = parseInt(process.env.PORT, 10) || 3000
const pool = new Pool({
    connectionString: "postgres://kkcoplxstuhduv:2e83c360f9c88bbf3f708960d6a6a3c99fd71dc6b49dcb3b93d1ce93b1f670de@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d5f8ku16enksu0",
    ssl: true
});
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./src/config/application.properties');

const globals = {
    INSERT_ERROR: "INSERT_ERROR",
    INSERT_SUCCESS: "INSERT_SUCCESS",
    SELECT_SUCCESS: "SELECT_SUCCESS",
    GENERIC_ERROR: "GENERIC_ERROR",
    SELECT_ERROR: "SELECT_ERROR",
};
const app = Express();
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(Express.static(path.join(__dirname, 'build')));
app.use(fileUpload());

const handleResponse = async (code, obj, res, reqType) => {
    try {
        const response = {};
        response.code = code;
        if (reqType === globals.INSERT_ERROR) {
            response.type = globals.INSERT_ERROR;
            response.message = obj;
        }
        else if (reqType === globals.INSERT_SUCCESS) {
            response.type = globals.INSERT_SUCCESS;
            response.message = `Rows inserted successfully!`;
        }
        else if (reqType === globals.SELECT_SUCCESS) {
            response.type = globals.SELECT_SUCCESS;
            response.message = obj;
        }
        else if (reqType === globals.GENERIC_ERROR) {
            response.type = globals.GENERIC_ERROR;
            response.message = obj;
        }
        res.statusCode = 200;
        res.json(response);
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.json(e);
    }
}

const handleSearch = async (obj, res, client) => {
    try {
        const images = [];
        if (obj.rows && obj.rows.length > 0) {
            const imageIds = obj.rows[0].images_id;
            const imagesArr = imageIds.split(";");
            for (var i = 0; i < imagesArr.length; i++) {
                if (imagesArr[i]) {
                    await client.query(`SELECT image_name, incident_image FROM imagemst WHERE image_id = $1`, [imagesArr[i]])
                        .then(response => {
                            if (response.rows[0]) {
                                const image = {};
                                image.name = response.rows[0].image_name;
                                image.obj = response.rows[0].incident_image;
                                images.push(image);
                            }
                        }).catch(e => { console.log(e) });
                }
            }
        }
        return images;
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.json(e);
    }
}


app.post('/upload', async (req, res) => {
    try {
        let imageFiles = req.files;
        let params = req.body;
        let images_id = '';
        const client = await pool.connect();


        var dt = datetime.create(params.surveyDate);
        var formattedDate = dt.format('m/d/y H:M');
        console.log(formattedDate);

        if (imageFiles) {
            let count = 0;
            Object.keys(imageFiles).forEach(key => {
                count++;
                //console.log(count);
                let image_id = `${params.fileNumber}_${params.registrationNumber}_${count}`;
                images_id += `${image_id};`;
                const imageString = Buffer.from(imageFiles[key].data).toString('base64');
                //console.log(imageString);
                client.query(`INSERT INTO IMAGEMST (IMAGE_ID, INCIDENT_IMAGE, IMAGE_NAME) ` +
                    `VALUES($1, $2, $3)`, [image_id, imageString, imageFiles[key].name])
                    .catch(e => {
                        console.log(e);
                        if (e.code === "23505") {
                            return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                        }
                        else {
                            return handleResponse(500, e, res, globals.INSERT_ERROR)
                        }
                    });
            });
        }
        client.query(`INSERT INTO ` +
            `survey_doc(FILE_NUMBER, VEHICLE_NUMBER, IMAGES_ID, SURVEY_DATE) ` +
            `VALUES($1, $2, $3, $4)`, [params.fileNumber, params.registrationNumber, images_id, formattedDate])
            .then(response => {
                return handleResponse(200, response, res, globals.INSERT_SUCCESS);
            })
            .catch(e => {
                console.log(e);
                if (e.code === "23505") {
                    return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                }
                else {
                    return handleResponse(500, e, res, globals.INSERT_ERROR)
                }
            });
        await client.release();
    } catch (e) {
        console.log(e);
        return handleResponse(500, e, res, globals.GENERIC_ERROR);
    }
});




app.post('/uploadExtra', async (req, res) => {
    try {
        let imageFiles = req.files;
        let params = req.body;
        let images_id = '';
        const client = await pool.connect();


        var dt = datetime.create(params.surveyDate);
        var formattedDate = dt.format('m/d/y H:M');
        console.log(formattedDate);
        await client.query(`SELECT images_id FROM survey_doc WHERE FILE_NUMBER = $1 and VEHICLE_NUMBER = $2`,
            [params.fileNumber, params.registrationNumber]).then(async response => {
                console.log("response>> " + response);
                console.log("response.rows[0]>> " + response.rows);
                console.log("response.rows.length>> " + response.rows.length);
                
                if (response.rows.length > 0) {
                    var imagesStr = response.rows[0].images_id;
                    images_id = response.rows[0].images_id;
                    var s = response.rows[0].images_id.split(";");
                    var existingcount = s.length;
                    console.log("existingcount>> " + existingcount);
                    console.log("imagesStr>> " + imagesStr);
                    if (imageFiles) {
                        let count = existingcount-1;
                        Object.keys(imageFiles).forEach(key => {
                            count++;
                            //console.log(count);
                            let image_id = `${params.fileNumber}_${params.registrationNumber}_${count}`;
                            images_id += `${image_id};`;
                            const imageString = Buffer.from(imageFiles[key].data).toString('base64');
                            //console.log(imageString);
                            client.query(`INSERT INTO IMAGEMST (IMAGE_ID, INCIDENT_IMAGE, IMAGE_NAME) ` +
                                `VALUES($1, $2, $3)`, [image_id, imageString, imageFiles[key].name])
                                .catch(e => {
                                    console.log(e);
                                    if (e.code === "23505") {
                                        return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                                    }
                                    else {
                                        return handleResponse(500, e, res, globals.INSERT_ERROR)
                                    }
                                });
                        });
                    }
                    client.query(`UPDATE survey_doc SET IMAGES_ID = ($1) where FILE_NUMBER =($2) and VEHICLE_NUMBER = ($3)`, 
                    [images_id, params.fileNumber, params.registrationNumber])
                        .then(response => {
                            return handleResponse(200, response, res, globals.INSERT_SUCCESS);
                        })
                        .catch(e => {
                            console.log(e);
                            if (e.code === "23505") {
                                return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                            }
                            else {
                                return handleResponse(500, e, res, globals.INSERT_ERROR)
                            }
                        });



                }

                else {


                    if (imageFiles) {
                        let count = 0;
                        Object.keys(imageFiles).forEach(key => {
                            count++;
                            //console.log(count);
                            let image_id = `${params.fileNumber}_${params.registrationNumber}_${count}`;
                            images_id += `${image_id};`;
                            const imageString = Buffer.from(imageFiles[key].data).toString('base64');
                            //console.log(imageString);
                            client.query(`INSERT INTO IMAGEMST (IMAGE_ID, INCIDENT_IMAGE, IMAGE_NAME) ` +
                                `VALUES($1, $2, $3)`, [image_id, imageString, imageFiles[key].name])
                                .catch(e => {
                                    console.log(e);
                                    if (e.code === "23505") {
                                        return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                                    }
                                    else {
                                        return handleResponse(500, e, res, globals.INSERT_ERROR)
                                    }
                                });
                        });
                    }
                    client.query(`INSERT INTO ` +
                        `survey_doc(FILE_NUMBER, VEHICLE_NUMBER, IMAGES_ID, SURVEY_DATE) ` +
                        `VALUES($1, $2, $3, $4)`, [params.fileNumber, params.registrationNumber, images_id, formattedDate])
                        .then(response => {
                            return handleResponse(200, response, res, globals.INSERT_SUCCESS);
                        })
                        .catch(e => {
                            console.log(e);
                            if (e.code === "23505") {
                                return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                            }
                            else {
                                return handleResponse(500, e, res, globals.INSERT_ERROR)
                            }
                        });

                }

                return handleResponse(200, response, res, globals.SELECT_SUCCESS);
            }).catch(e => {

            });


        await client.release();
    } catch (e) {
        console.log(e);
        return handleResponse(500, e, res, globals.GENERIC_ERROR);
    }
});






app.post('/requestForUpload', async (req, res) => {
    try {
        let params = req.body;
        const client = await pool.connect();

        client.query(`INSERT INTO ` +
            `image_request(REQUESTOR_NAME, FILE_NUMBER, VEHICLE_NUMBER, REQUEST_DATE) ` +
            `VALUES($1, $2, $3, $4)`, [params.requestorName, params.fileNumber, params.registrationNumber, new Date()])
            .then(response => {
                return handleResponse(200, response, res, globals.INSERT_SUCCESS);
            })
            .catch(e => {
                console.log(e);
                if (e.code === "23505") {
                    return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                }
                else {
                    return handleResponse(500, e, res, globals.INSERT_ERROR)
                }
            });
        await client.release();
    } catch (e) {
        console.log(e);
        return handleResponse(500, e, res, globals.GENERIC_ERROR);
    }
});


app.get('/search/:fileNumber/:registrationNumber', async (req, res) => {

    try {
        const client = await pool.connect();
        await client.query(`SELECT images_id FROM survey_doc WHERE FILE_NUMBER = $1 and VEHICLE_NUMBER = $2`,
            [req.params.fileNumber, req.params.registrationNumber]).then(async response => {
                const imageJson = await handleSearch(response, res, client);
                response.imageData = imageJson;
                response.fileNumber = req.params.fileNumber;
                return handleResponse(200, response, res, globals.SELECT_SUCCESS);
            }).catch(e => {
                if (e.code === "23505") {
                    return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                }
                else {
                    return handleResponse(500, e, res, globals.SELECT_ERROR)
                }
            });
        await client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.post('/ping', async (req, res) => {
    res.json("200 OK!");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`);
});
