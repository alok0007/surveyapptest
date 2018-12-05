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

const app = Express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(Express.static(path.join(__dirname, 'build')));
app.use(fileUpload());

app.post('/upload', async (req, res, next) => {
    console.log(req);
    console.log(req.body);
    let imageFiles = req.files;
    let params = req.body;
    let images_id = '';
    try {
        const client = await pool.connect();
        if (imageFiles) {
            let count = 1;
            Object.keys(imageFiles).forEach(key => {
                count++;
                let image_id = `${params.fileNumber}_${params.registrationNumber}_${count}`;
                images_id += `${image_id};`;
                client.query(`INSERT INTO imagemst (image_id, SURVEYOR_IMAGE, IMAGE_NAME) ` +
                    `VALUES($1, $2, $3)`, [image_id, imageFiles[key], imageFiles[key].name]);
            });
        }
        console.log(client);
        const result = client.query(`INSERT INTO ` +
            `survey_doc(FILE_NUMBER, VEHICLE_NUMBER, IMAGES_ID, SURVEY_DATE) ` +
            `VALUES($1, $2, $3, $4)`, [params.fileNumber, params.registrationNumber, images_id, new Date()]);
            await client.release();
            res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.get('/ping', (req, res) => {
    return res.end("200!");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
});
