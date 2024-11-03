const mongoose = require("mongoose");
const orderDetailSchema = new mongoose.Schema({
  productDetails: {
    type: Array,
    required: true,
  },
  userDetails: {
    type: Array,
    required: true,
  },
  noofitems: {
    type: Number,
    required: true,
    default: 1,
  },
  paymentMethod: {
    type: String,
    enum: ["Online payment", "Cash on Delivery"],
    require: true,
  },
  confirmOrder: {
    type: Boolean,
    require: true,
    default: false,
  },
  orderid: {
    type: Number,
    require: true,
  },
  orderstatus: {
    type: String,
    enum: ["Delivered", "ordered Placed", "order Dispatch","order Cancel","Pending"],
    required: true,
    default:"Pending"
  },
  size: {
    type: String,
    require: true,
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
  estimatedate:{
    type: Date,
    required: true
  },
  day:{
    type: String,
    required: true
  },
  updateby: {
    type: String,
    required: false,
  }
});
module.exports = mongoose.model("orderDetail", orderDetailSchema);
