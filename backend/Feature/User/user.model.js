const mongoose = require("mongoose");
const userSheme = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  emailid: {
    type: String,
    require: true,
  },
  roletype:{
    type:String,
    enum:["Admin","User"],
    default:"User"
  }
});
