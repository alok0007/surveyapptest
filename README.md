# surveyapptest

https://www.webhostingsecretrevealed.net/blog/web-hosting-guides/make-a-website/
https://www.youtube.com/watch?v=hb26tQPmPl4
https://dzone.com/articles/upload-files-or-images-to-server-using-nodejs
https://code.msdn.microsoft.com/Upload-Files-Or-To-Server-15f69aaa#content
https://stackoverflow.com/questions/17319395/node-js-pg-postgresql-and-insert-queries-app-hangs
https://stackoverflow.com/questions/31177414/insert-data-from-form-into-mysql-using-node-js
http://www.javascriptpoint.com/nodejs-postgresql-tutorial-example/
https://www.postgresql.org/docs/9.1/sql-createtable.html
http://www.postgresqltutorial.com/postgresql-create-table/

https://expressjs.com/en/guide/using-template-engines.html
***********************SQL********************************************************


#connectionString: "postgres://kkcoplxstuhduv:2e83c360f9c88bbf3f708960d6a6a3c99fd71dc6b49dcb3b93d1ce93b1f670de@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d5f8ku16enksu0",
    

#First, let save our Database URL in the system environment. Your Database URL should be in the following format
postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
e.g postgres://olawalequest@127.0.0.1:5432/reflection_db.

CREATE TABLE SURVEY_FILE(
   FILE_NUMBER INT PRIMARY KEY     NOT NULL,
   VEHICLE_NUMBER           TEXT    NOT NULL,
   SURVEYOR_NAME            TEXT     NOT NULL,
   IMAGE_NAME        CHAR(50),
   SURVEY_DATE         DATE
);

INSERT INTO SURVEY_FILE (FILE_NUMBER,VEHICLE_NUMBER,SURVEYOR_NAME,IMAGE_NAME,SURVEY_DATE) VALUES (1011, 'RJ14CF9592', 'ARVIND', '1011.JPEG', '2007-12-13');
INSERT INTO SURVEY_FILE (FILE_NUMBER,VEHICLE_NUMBER,SURVEYOR_NAME,IMAGE_NAME,SURVEY_DATE) VALUES (1012, 'RJ14CF9593', 'KAILASH', '1012.JPEG', '2008-12-13');
INSERT INTO SURVEY_FILE (FILE_NUMBER,VEHICLE_NUMBER,SURVEYOR_NAME,IMAGE_NAME,SURVEY_DATE) VALUES (1013, 'RJ14CF9441', 'GOPAL', '1013.JPEG', '2007-12-14');


CREATE TABLE SURVEY_DOC(
   FILE_NUMBER INT PRIMARY KEY     NOT NULL,
   VEHICLE_NUMBER           TEXT   ,
   SURVEYOR_IMAGE            bytea ,    
   IMAGES_ID        CHAR(50),
   SURVEY_DATE         DATE
);
INSERT INTO SURVEY_DOC (FILE_NUMBER,VEHICLE_NUMBER,SURVEYOR_IMAGE,IMAGES_ID,SURVEY_DATE) VALUES (1002, 'RJ14CF9441', null, '1002_RJ14CF9441_1;1002_RJ14CF9441_2', '2007-12-14');

CREATE TABLE IMAGEMST(
   IMAGE_ID TEXT PRIMARY KEY     NOT NULL,
   IMAGE_NAME        VARCHAR(100),
   SURVEYOR_IMAGE            bytea   
);
INSERT INTO SURVEY_DOC (IMAGE_ID,IMAGE_NAME,SURVEYOR_IMAGE,SURVEYOR_IMAGE) VALUES ('1002_RJ14CF9441_1', '1002_RJ14CF9441_1.jpeg', null);


Queries:
1) Need input name details like file number, registration number, along with validation.
2) need to know how they want the flow of search screen.
3) do they want download feature of photos as well?
4) do they want download full report option, if yes then let us knwo the format.
5) image size restriction will be 1 MB, number of images can be upload with one file will be 10 maximum.

form fields
1. Report number(File Number)*: only number
2. Report date: user entry *: calender : only past/current
3. Vehicle Number*: alpha nummeric not extra charector
4. photos*: limit 10