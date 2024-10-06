const mongoose = require("mongoose");

const menusSchema = new mongoose.Schema({
  menusname: {
    type: String,
    required: true,
  },
  menuorder: {
    type: Number,
    required: true,
  },
  roletype:{
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "inactive", "remove"],
    required: true,
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
module.exports = mongoose.model("menus", menusSchema);
