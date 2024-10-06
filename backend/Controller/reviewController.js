const reviewModel = require("../Model/review/reviewModel");
const productDetailModel = require("../Model/productDetails/productModel");
const userModel = require("../Model/UserModel/userModel");
const { reqData } = require("../Utils/constant");
exports.createReview = async (req, res) => {
  try {
    const data = reqData(req);
    
    await userModel
      .findOne({ emailid:req.user.emailid, status: "active" })
      .then(async (user) => {
        if (!user) {
          res.status(404).send("Not a User");
        } else {
          await productDetailModel
            .findOne({ _id:data.productid, status: "active" })
            .then(async (product) => {
              if (!product) {
                res.status(500).send("product Not Found");
              } else {
                await reviewModel
                  .create({
                    productid: product._id,
                    userid: user._id,
                    rating: data.rating,
                    review: data.review,
                    status: "active",
                    userName: user.name,
                    createat: new Date(),
                    createby: req.user.emailid,
                  })
                  .then((data1) => {
                    res.status(200).send("Thank you for Your Review");
                  })
                  .catch((err) => {
              console.log(err,"ddg")

                    res.status(500).send(err);
                  });
              }
            })
            .catch((err) => {
              res.status(500).send("product Not Found");
            });
        }
      })
      .catch((err) => {
        console.log(err,"nbcbcb")
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(500).send("Error in Review Creation");
  }
};

exports.getReview = async (req, res) => {
  try {
    const data = reqData(req);
    await reviewModel
      .find({ productid: data.productid, status: "active" })
      .then((datas) => {
        res.status(200).send(datas);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } catch (error) {
    res.status(500).send("Error in Review Creation");
  }
};
