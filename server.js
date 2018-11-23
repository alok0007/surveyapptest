var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://kkcoplxstuhduv:2e83c360f9c88bbf3f708960d6a6a3c99fd71dc6b49dcb3b93d1ce93b1f670de@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d5f8ku16enksu0",
    ssl: true
});

var app = Express();
app.use(bodyParser.json());
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count 

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});




app.post("/api/Upload", function (req, res) {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.end("Something went wrong!");
        }
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM tsttable');
            const results = { 'results': (result) ? result.rows : null };
            client.release();
        } catch (err) {
            console.error(err);
           // res.send("Error " + err);
        }
        res.send("File uploaded sucessfully!.");
    });
});

app.listen(process.env.PORT || 4000, function () {
    console.log('Your node js server is running');
});