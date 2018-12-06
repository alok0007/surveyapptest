const Express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const port = parseInt(process.env.PORT, 10) || 3000
const pool = new Pool({
    connectionString: "postgres://kkcoplxstuhduv:2e83c360f9c88bbf3f708960d6a6a3c99fd71dc6b49dcb3b93d1ce93b1f670de@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d5f8ku16enksu0",
    ssl: true
});

const globals = {
    INSERT_ERROR: "INSERT_ERROR",
    INSERT_SUCCESS: "INSERT_SUCCESS",
    GENERIC_ERROR: "GENERIC_ERROR"
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
        else if (reqType === globals.GENERIC_ERROR) {
            response.type = globals.GENERIC_ERROR;
            response.message = obj;
        }
        res.statusCode = 200;
        res.json(response);
    } catch (e) {
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
        if (imageFiles) {
            let count = 1;
            Object.keys(imageFiles).forEach(key => {
                count++;
                let image_id = `${params.fileNumber}_${params.registrationNumber}_${count}`;
                images_id += `${image_id};`;
                client.query(`INSERT INTO imagemst (image_id, SURVEYOR_IMAGE, IMAGE_NAME) ` +
                    `VALUES($1, $2, $3)`, [image_id, imageFiles[key], imageFiles[key].name])
                    .catch(e => {
                        if (e.code === "23505") {
                           return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                        }
                        else {
                           return  handleResponse(500, e, res, globals.INSERT_ERROR)
                        }
                    });
            });
        }
        client.query(`INSERT INTO ` +
            `survey_doc(FILE_NUMBER, VEHICLE_NUMBER, IMAGES_ID, SURVEY_DATE) ` +
            `VALUES($1, $2, $3, $4)`, [params.fileNumber, params.registrationNumber, images_id, new Date()])
            .then(response => {
                return handleResponse(200, response, res, globals.INSERT_SUCCESS);
            })
            .catch(e => {
                if (e.code === "23505") {
                   return handleResponse(23505, 'Duplicate entry error', res, globals.INSERT_ERROR)
                }
                else {
                   return handleResponse(500, e, res, globals.INSERT_ERROR)
                }
            });
        await client.release();
    } catch (e) {
       return handleResponse(500, e, res, globals.GENERIC_ERROR);
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
