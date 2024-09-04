const mongoose = require("mongoose");


const subCategorySchema = new mongoose.Schema({
 
  categoryid: {      
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory",
  },
  subcategoryname: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false,
    default: null
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


module.exports = mongoose.model("subproductcategory", subCategorySchema);
