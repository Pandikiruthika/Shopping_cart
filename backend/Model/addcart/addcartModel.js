const mongoose = require("mongoose");
const addcartSchema = new mongoose.Schema({
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
useremail:{
    type: String,
        required: true, 
},
      productDetails: {
        type: Array,
        required: true,
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
module.exports = mongoose.model("addcart", addcartSchema);