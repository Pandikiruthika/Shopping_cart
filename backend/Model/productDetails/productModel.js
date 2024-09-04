const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory",
    required: true,
  },
  subcategoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subproductcategory",
    required: true,
  },
  file1: {
    type: String,
    required: true,
    default: null,
  },
  file2: {
    type: String,
    required: false,
    default: null,
  },
  file3: {
    type: String,
    required: false,
    default: null,
  },
  file4: {
    type: String,
    required: false,
    default: null,
  },
  productdetails: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colour: {
    type: String,
    required: false,
  },
  size: {
    type: [String],
    enum: ["XS", "M", "L", "XL", "XXL", "XXXL"],
    required: false,
  },
  extraCharges:{
    type:Number,
    required:true,
    default:0
  },
  
  rating: {
    type: Number,
    required: false,
  },
  review: {
    type: String,
    required: false,
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
  }
});

module.exports = mongoose.model("productDetail", productCategorySchema);
