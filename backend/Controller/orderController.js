const orderDetailModel = require("../Model/orderDetail/orderDetailModel");
const userModel = require("../Model/UserModel/userModel");
const productModel = require("../Model/productDetails/productModel");
const { reqData, generateOtp } = require("../Utils/constant");
const mongoose=require("mongoose")
exports.placeOrder = async (req, res) => {
  try {
    const data = reqData(req);
    const orderid = generateOtp();
    await userModel
      .find({ emailid: req.user.emailid, status: "active" })
      .then(async (user) => {
        // console.log(user[0],"gggggg")
        await productModel
          .find({ _id: data.productid, status: "active" })
          .then(async (product) => {
            
            const users = [{
              userid: user[0]._id,
              name: user[0].name,
              emailid:user[0].emailid,
              Address: user[0].Address,
              city: user[0].city,
              phoneNumber: user[0].phoneNumber,
            }]
            const products = [{
              productid: product[0]._id,
              image:product[0].file,
              typeofProduct:product[0].productdetails[0].typeofproduct,
              productDescription:product[0].productdetails[0].productDescription,
              vendorname:product[0].productdetails[0].vendorname,
              productprice: product[0].price,
              extracharges: product[0].extraCharges,
              totalamount: Number(product[0].price) + Number(product[0].extraCharges),
              soldBy: product[0].vendorname,
            }];
            const currentDate = new Date();
    const estimatedDate = new Date(currentDate.setDate(currentDate.getDate() + 5));
            
    await orderDetailModel
              .create({
                productDetails: products,
                userDetails: users,
                noofitems: data.noofitems,
                paymentMethod: data.paymentMethod,
                confirmOrder: false,
                orderid: orderid,
                size: data.size,
                orderstatus: data.orderstatus,
                createat: new Date(),
                estimatedate :estimatedDate,
                createby: req.user.emailid,
              })
              .then((result) => {
                res.status(200).send("Order Placed Sucessfully");
              })
              .catch((err) => {
                res.status(404).send(err);
              });
          })
          .catch((err) => {
            res.status(404).send("product Not Found");
          });
      })
      .catch((err) => {
        res.status(500).send("Data not found");
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllorder = async (req, res) => {
  try {
    const data = reqData(req);
    //  console.log(data.userid,"ggggg")
    // console.log(result,"ffffffg")
    // const userId = new mongoose.Types.ObjectId(data.userid);
    console.log(req.user.emailid,"ddgdgdg")
    await orderDetailModel
      .find({ "userDetails.emailid": req.user.emailid, status: "active" })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.updateorder = async (req, res) => {
//   try {
//     const data = reqData(req);
//     const roletype = req.user.roletype;
//     if (roletype === "Admin") {
//       await orderDetailModel
//         .findOneAndUpdate(
//           { orderid: data.orderid, status: "active" },
//           { $set: { orderstatus: data.orderstatus } },
//           { new: true }
//         )
//         .then((result) => {
//           res.status(200).send("orderstatus Updated Sucessfully");
//         })
//         .catch((err) => {
//           res.status(404).send(err);
//         });
//     } else {
//       await orderDetailModel
//         .findOneAndUpdate(
//           {
//             orderid: data.orderid,
//             status: "active",
//           },
//           { $set: { status: "inactive" } },
//           { new: true }
//         )
//         .then((result) => {
//           res.status(200).send("Order cancel");
//         })
//         .catch((err) => {
//           res.status(404).send(err);
//         });
//     }
//   } catch (error) {
//     res.status(404).send(error);
//   } 
// };




exports.updateorder = async (req, res) => {
  try {
    const data = reqData(req);
    const roletype = req.user.roletype;

      await orderDetailModel
        .findOneAndUpdate(
          {
            orderid: data.orderid,
            status: "active",
          },
          { $set: { orderstatus:"ordered Placed" } },
          { new: true }
        )
        .then((result) => {
          res.status(200).send("Order Placed Sucessfully");
        })
        .catch((err) => {
          res.status(404).send(err);
        });
  } catch (error) {
    res.status(404).send(error);
  } 
};
