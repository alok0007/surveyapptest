const Express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const util = require("util");
const path = require('path');
const port = parseInt(process.env.PORT, 10) || 3000
const pool = new Pool({
    connectionString: "postgres://kkcoplxstuhduv:2e83c360f9c88bbf3f708960d6a6a3c99fd71dc6b49dcb3b93d1ce93b1f670de@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d5f8ku16enksu0",
    ssl: true
});

const app = Express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count 

// Serve static files from the React app
app.use(Express.static(path.join(__dirname, 'build')));

app.post("/api/Upload", function (req, res) {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.end("Something went wrong!");
        }
        try {
            let fileNumber = req.body.filenumber;
            let vehicleRegNumber = req.body.vehicleregnumber;
            let surveyorName = req.body.surveyorname;
            console.log('fileNumber going to insert is ' + fileNumber);
            const client = await pool.connect();
            const result = await client.query('INSERT into SURVEY_FILE (FILE_NUMBER,VEHICLE_NUMBER,SURVEYOR_NAME,IMAGE_NAME,SURVEY_DATE) VALUES($1, $2, $3, $4, $5) RETURNING FILE_NUMBER',
                [fileNumber, vehicleRegNumber, surveyorName, '1013.JPEG', new Date()]);
            const results = { 'results': (result) ? result.rows : null };
            console.log('Row inserted with id: ' + result.rows[0].file_number);
            console.log('Record inserted : ' + util.inspect(result.rows));
            // res.status(200).send(result.rows);

            res.end("File uploaded sucessfully with !." + result.rows[0].file_number);
            // res.render('pages/db', {results: result.rows} ); 
            client.release();
        } catch (err) {
            console.error(err);
            // res.send("Error " + err);
        }
        // res.status(200).send(result.rows);
        //res.send("File uploaded sucessfully!.");
    });
});

app.post("/api/Search", function (req, res) {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.end("Something went wrong!");
        }
        try {
            let fileNumber = req.body.filenumber;
            let vehicleRegNumber = req.body.vehicleregnumber;
            console.log('fileNumber search is ' + fileNumber);
            console.log('vehicleRegNumber search is ' + vehicleRegNumber);
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM survey_file where FILE_NUMBER = $1', [fileNumber]);
            const results = { 'results': (result) ? result.rows : null };
            console.log('Record File Number Searched is:' + result.rows[0].file_number);
            console.log('Record Searched is:' + util.inspect(result.rows[0]));
            res.status(200).send(result.rows);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
        // res.status(200).send(result.rows);
        //res.send("File uploaded sucessfully!.");
    });
});

  app.get('/ping', (req, res) => {
            return res.end("200!");
        }); 


app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
});
