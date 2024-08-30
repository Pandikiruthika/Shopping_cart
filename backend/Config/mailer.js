const nodeMailer=require("nodemailer")
const {generateOtp}=require('../Utils/constant')
const fromEmail=nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.FROM_EMAIL,
        pass:MAILPASSWORD
    }
})
const sendMail=(to)=>{
    const toMail={
        from:process.env.FROM_EMAIL,
        to:to,
        Subject:'Shopping cart',
        text:`Welcome to  Shopping Cart,your OTP is ${generateOtp()}`
    }
    
    fromEmail.sendMail(toMail, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent sucessFully to ${toMail.to}`);
        }
      });
}
module.exports={sendMail}