var nodemailer = require('nodemailer');
var generator = require('generate-password');

var transporter = nodemailer.createTransport({
  service: "Gmail",
    auth: {
        user: 'nurenderbishnoi@gmail.com',
        pass: '*99292529059672368472#'
    }
});

emailsenddata = (Email) => {
    var RandomNumbers = generator.generate({
        length: 10,
        numbers: true
    })    
    const mailOptions = {
        from: 'nurenderbishnoi2929@gmail.com', // sender address
        to: Email, // list of receivers
        subject: 'send password', // Subject line
        // html: "verify :-  " + "<b>" + RandomNumbers + "</b>"
        html: "<body style=' height: 100vh; display: flex; align-items: center; justify-content: center;background: #333;font-family: sans-serif;'><div style='text-align:center;width: 50vw;max-width: 400px;min-width: 300px;margin: 0 auto;background: #fff;padding: 50px 35px;'> <p>Having trouble with login ?</p><div style='max- width:50vw; background-color: #e0e0e0; color: #333; border-radius: 10px; margin: 0 auto; display: flex; align-items: center; justify-content: center; text-align: center; flex-direction: column;'><h2 style='margin-bottom: 5px;'>Forget password Code</h2> <p style='color: #1fa299; letter-spacing: 15px; font-size: 35px; font-weight: bold;'>" + RandomNumbers + "</p> <p> Here is Password change code you requested</p></div><div style='text-align:center;'><p>Here by using this, you agree to the <span style='text-decoration:underline;text-transform:capitalize;'>Terms & condition.</span></p> <p>If you didn’t mean to reset your password, then you can just ignore this email; your password will not change.</p</div></div></body>"
    };
    return mailOptions
}
module.exports = { transporter ,emailsenddata}