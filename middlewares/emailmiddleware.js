const nodemailer = require('nodemailer'); 
const {
    EMAIL_PASSWORD,
    EMAIL_ID
}=require("../config/config.json")
exports.sendemail=async(htmloption)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_ID,
          pass: EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
      }
      });
      
      const mailOptions={
        from: EMAIL_ID,
        to: htmloption.to,
        subject: htmloption.subject,
        text: htmloption.text,
        html:htmloption.html,
        attachments:htmloption.attachments
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + mailOptions.to);
        }
      }); 
}