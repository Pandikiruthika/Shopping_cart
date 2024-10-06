const userModel = require("../Model/UserModel/userModel");
const { reqData } = require("../Utils/constant");
const { sendMail } = require("../Config/mailer");
const jwt = require("jsonwebtoken");
let otpStore = {};
exports.verifyOtp = async (req, res) => {
  try {
    const data = reqData(req);
    const otp = sendMail(data.emailid);
    otpStore = { otp: otp, emailid: data.emailid };
    if (!otp) {
      res.status(409).send("fail to send Otp");
    } else {
      res.status(200).send("OTP sent. Please verify with the OTP");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = reqData(req);
    userModel
      .findOne({ emailid: otpStore.emailid, status: "active" })
      .then((result) => {
        if (result) {
          res.status(504).send("User Already exist ");
        } else {
          if (data.otp === otpStore.otp) {
            if (data.roletype) {
              userModel.create({
                emailid: otpStore.emailid,
                roletype: data.roletype,
                createby: otpStore.emailid,
                createat: new Date(),
              });
              res.status(200).send("Admin created sucessfully");
            } else {
              userModel.create({
                emailid: otpStore.emailid,
                createby: otpStore.emailid,
                createat: new Date(),
              });
              res.status(200).send("User created sucessfully");
            }
          } else {
            res.status(504).send("Invalid Otp ");
          }
        }
      })
      .catch((err) => {
        res.status(504).send("User Already exist ");
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const data = reqData(req);
    
    userModel
      .findOne({ emailid: otpStore.emailid, status: "active" })
      .then((result) => {
        if (!result) {
          res.status(504).send("You are not a user,please register");
        } else {
          if (data.otp === otpStore.otp) {
            const payload = {
              emailid: result.emailid,
              roletype: result.roletype,
            };
            const token = jwt.sign(payload, process.env.SECRET);
            res.status(200).json({ msg: "Login Successful", token: token });
          } else {
            res.status(504).send("Invalid Otp ");
          }
        }
      })
      .catch((err) => {
        res.status(504).send("Enter the correct Email");
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const data = reqData(req);
    console.log(req.user.emailid,"ggg")
    await userModel
      .findOneAndUpdate(
        { emailid: data.emailid, status: "active" },
        {
          $set: {
            name: data.name,
            phoneNumber: data.phoneNumber,
            Address:data.Address,
            city:data.city,
            state:data.state,
            updateat: new Date(),
            updateby: data.emailid,
          },
        },
        { new: true }
      )
      .then((result) => {
        res.status(200).send("User Updated SucessFully");
      })
      .catch((err) => {
        res.status(500).send("Not Updated");
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getallUser = async (req, res) => {
  try {
   
    await userModel
      .find({ status: "active" })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(404).send("Error in getting All User");
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const data = reqData(req);
    console.log(data.emailid,"gg")
    await userModel
      .findOne({emailid:data.emailid, status: "active" })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(404).send("Error in getting All User");
      });
  } catch (error) {
    res.status(404).send(error);
  }
};
