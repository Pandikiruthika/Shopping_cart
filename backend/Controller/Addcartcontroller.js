const addcartModel = require("../Model/addcart/addcartModel");
const productDetailModel = require("../Model/productDetails/productModel");
const userModel = require("../Model/UserModel/userModel");
const { reqData } = require("../Utils/constant");
exports.createCart = async (req, res) => {
  try {
    const data = reqData(req);
    console.log(data,"fff")
    await userModel
      .findOne({ emailid:req.user.emailid, status: "active" })
      .then(async (user) => {
        if (!user) {
          res.status(404).send("Not a User");
        } else {
          await productDetailModel
            .findOne({ _id:data.productid, status: "active" })
         
            .then(async (product) => {
                await addcartModel
                  .create({
                    productid: product._id,
                    userid: user._id,
                    status: "active",
                    useremail:req.user.emailid,
                    productDetails:product,
                    createat: new Date(),
                    createby: req.user.emailid,
                  })
                  .then((data1) => {
                    res.status(200).send("AddCart SucessFully");
                  })
                  .catch((err) => {
              console.log(err,"ddg")

                    res.status(500).send(err);
                  });
            
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


exports.getCart= async (req, res) => {
    try {
      const data = reqData(req);
      console.log("dgdgdgd")
      await addcartModel
        .find({ useremail: req.user.emailid, status: "active" })
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


  
  exports.deleteCart = async (req, res) => {
    try {
      const data = reqData(req);
      console.log(data);
      await addcartModel.findOneAndDelete({productid:data.id }).then((data)=>{
        res.status(200).send( data );
      }).catch((err)=>{
        // console.log(err,"cncn")
        res.status(404).send({ message: "Item not found" });
      })
  
     
  
    } catch (error) {
      console.error("Error deleting cart item:", error);
      res.status(500).send({ message: "Error deleting cart item", error });
    }
  };
  