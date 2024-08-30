const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  phoneNumber: {
    type: Number,
    require: false,
  },
  emailid: {
    type: String,
    require: true,
  },
  roletype: {
    type: String,
    enum: ["Admin", "User"],
    require: true,
    default: "User",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    require: true,
    default: "active",
  },
  createat: {
    type: String,
    required: true,
  },
  createby: {
    type: String,
    required: true,
  },
  updateat: {
    type: String,
    required: false,
  },
  updateby: {
    type: String,
    required: false,
  },
});
module.exports=mongoose.model("user",userSchema)