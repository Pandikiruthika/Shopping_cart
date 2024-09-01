const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
    categoryname: {
      type: String,
      required: true,
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
  module.exports = mongoose.model("productcategory", productCategorySchema);
  
  
  
 