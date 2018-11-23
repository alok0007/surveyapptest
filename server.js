var Express = require('express'); 
var multer = require('multer'); 
var bodyParser = require('body-parser'); 
var pg = require('pg');
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
    upload(req, res, function (err) { 
        if (err) { 
		console.log(err);
            return res.end("Something went wrong!"); 
        } 
        pg.connect("postgres://kkcoplxstuhduv:2e83c360f9c88bbf3f708960d6a6a3c99fd71dc6b49dcb3b93d1ce93b1f670de@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d5f8ku16enksu0", function(err, client, done) {
            client.query('SELECT * FROM DUEL', function(err, result) {
              done();
              if(err) return console.error(err);
              console.log(result.rows);
            });
          });
        return res.end("File uploaded sucessfully!."); 
        
    }); 
}); 
 
app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});