 const mongoose = require("mongoose");

const vendorsSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: Number,
    required: true,
  },
  emailid: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory",
    required:true
  },
  subcategoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subproductcategory",
    required:true
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: true,
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

module.exports = mongoose.model("vendordetails", vendorsSchema);
