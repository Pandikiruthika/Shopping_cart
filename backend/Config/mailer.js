const nodeMailer = require("nodemailer");
const { generateOtp } = require('../Utils/constant');

const fromEmail = nodeMailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.MAILPASSWORD
    }
});

const sendMail = (to) => {
  const otp = generateOtp();  // Generate OTP here    

    const toMail = {
        from: process.env.FROM_EMAIL,
        to: to,
        subject: 'Shopping cart',
        text: `Welcome to Shopping Cart, your OTP is ${otp}`  
    };

    fromEmail.sendMail(toMail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent successfully to ${toMail.to}`);
        }
    });

    return otp; 
}

module.exports = { sendMail };
