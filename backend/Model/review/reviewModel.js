const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productDetail",
        required: true,
      },
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      userName: {
        type: String,
        required: false,
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
})
module.exports = mongoose.model("review", reviewSchema);