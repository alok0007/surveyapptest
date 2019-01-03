var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'creativetechjaipur@gmail.com',
        pass: 'ag@549508'
    }
});
const mailOptions = {
    from: 'creativetechjaipur@gmail.com', // sender address
    to: 'nikhileshtiwari80@gmail.com', // list of receivers
    subject: 'Hello Arvind bhaiya, this mail send by code', // Subject line
    html: '<h1>Customer Queries</h1><h2>Customer Name: Amit Sharma</h2><h2>Report Number: 1003</h2><h2>Vehicle Registration Number: RJ14FD4343</h2><h2>Report Date: 10/01/2019</h2><h2>Queries : please give me photos</h2>'
   /* , attachments: [
        {   // utf-8 string as an attachment
            filename: 'text1.txt',
            content: 'hello world!'
        },
        {   // binary buffer as an attachment
            filename: 'text2.txt',
            content: 'hello world!'
        }
    ]*/
};

transporter.sendMail(mailOptions, function (err, info) {
    if (err)
        console.log(err)
    else
        console.log(info);
});



