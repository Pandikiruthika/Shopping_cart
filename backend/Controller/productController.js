const productDetailModel = require("../Model/productDetails/productModel");
const categoryModel = require("../Model/ProductCategory/productCategoryModel");
const subCategoryModel = require("../Model/ProductCategory/subcategoryModel");
const vendorModel = require("../Model/Vendor/vendorModel");
const { reqData } = require("../Utils/constant");

exports.createProduct = (req, res) => {
  try {
    const data = reqData(req);
    const roletype = req.user.roletype;

    if (roletype !== "Admin") {
      return res.status(404).send("Invalid User");
    }
    vendorModel
      .findOne({ _id: data.productdetails[0].vendorid, status: "active" })
      .then((vendor) => {
        if (!vendor) {
          return res.status(404).send("Vendor not found or inactive");
        }

       
        let arr = [];
        data.productdetails.forEach((e) => {
          const obj = {
            vendorid: vendor.vendorid,
            vendorname: vendor.companyname,
            packerinfo: vendor.companyname,
            netWeight: e.netWeight,
            supplierinfo: vendor.address,
            typeofproduct: e.typeofproduct,
            pattern: e.pattern,
            productDescription: e.productDescription,
          };
          arr.push(obj);
        });

        return productDetailModel.create({
          categoryid: data.categoryid,
          subcategoryid: data.subcategoryid,
          file1: data.file1,
          file2: data.file2,
          file3: data.file3,
          file4: data.file4,
          productdetails: arr,
          price: data.price,
          colour: data.colour,
          extraCharges:data.extraCharges,
          createat:new Date(),
          createby:req.user.email,
          size: ["XS", "M", "L", "XL", "XXL", "XXXL"],
        });
      })
      .then(() => {
        res.status(200).send("Product created successfully");
      })
      .catch((err) => {
        res.status(500).send({ message: err.message || "Internal Server Error" });
      });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};


exports.getproduct = async (req, res) => {
  try {
    const data = reqData(req);
    await productDetailModel
      .find({ subcategoryid: data.subcategoryid, status: "active" })
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateproduct = async (req, res) => {
  try {
    const data = reqData(req);
    const roletype = req.user.roletype;
    if (roletype === "User") {
      await productDetailModel.findOneAndUpdate(
        { _id: data._id, status: "active" },
        { $set: { rating: data.rating, review: data.review } },
        { new: true }
      ).then((result)=>{
        res.status(200).send("Thank you for your review")
      }).catch((err)=>{
        res.status(404).send(err)
      })
    }else{
      await productDetailModel.findOneAndUpdate(
        { _id: data._id, status: "active" },
        { $set: { extraCharges:data.extraCharges,price:data.price ,updateat:new Date(),updateby:req.user.emailid} },
        { new: true }
      ).then((result)=>{
        res.status(200).send("Updated Sucessfully")
      }).catch((err)=>{
        res.status(404).send(err)
      })
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
