# surveyapptest

https://www.webhostingsecretrevealed.net/blog/web-hosting-guides/make-a-website/
https://www.youtube.com/watch?v=hb26tQPmPl4
https://dzone.com/articles/upload-files-or-images-to-server-using-nodejs
https://code.msdn.microsoft.com/Upload-Files-Or-To-Server-15f69aaa#content
https://stackoverflow.com/questions/17319395/node-js-pg-postgresql-and-insert-queries-app-hangs
https://stackoverflow.com/questions/31177414/insert-data-from-form-into-mysql-using-node-js

***********************SQL********************************************************

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
