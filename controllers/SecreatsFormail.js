var nodemailer = require('nodemailer');

function mailSendHandel(toUser,token,res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sahoo.tusharkanta21@gmail.com',
          pass: 'tusarkanta123'
        }
      });

      var mailOptions = {
        from: 'sahoo.tusharkanta21@gmail.com',
        to: toUser,
        subject: 'Link for Reset password',
        text: `click the link to reset password it will be valid for 5 mins`,
        html:`<a href="http://localhost:3000/forgotPasswordUpdate/${toUser}/${token}">http://localhost:3000/forgotPasswordUpdate/${toUser}/${token}</a>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send({
              message:"Password reset link sent successfully",
              code:"mailSend successful"
          })
        }
      });
      
}

module.exports = {
    mailSendHandel
}