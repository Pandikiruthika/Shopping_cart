const productDetailModel = require("../Model/productDetails/productModel");
const categoryModel = require("../Model/ProductCategory/productCategoryModel");
const subCategoryModel = require("../Model/ProductCategory/subcategoryModel");
const vendorModel = require("../Model/Vendor/vendorModel");
const { reqData } = require("../Utils/constant");
const imageupload = require("../uploads/subCategoryUploads");


exports.createProduct = (req, res) => {

  imageupload.array('files')(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }  
    try {
      const data = reqData(req);
      // console.log(data,"shdshds")
      const roletype = req.user.roletype;
      if (roletype !== "Admin") {
        return res.status(403).send("Invalid User");
      }

      const vendor = await vendorModel.findOne({ _id: "67023d0bc5c08cdb31f2213c", status: "active" });

      if (!vendor) {
        return res.status(404).send("Vendor not found or inactive");
      }

      const productDetails=[{
        vendorid: vendor._id,
        vendorname: vendor.companyname,
        packerinfo: vendor.companyname,
        netWeight: data.netWeight,
        supplierinfo: vendor.address,
        typeofproduct: data.typeofproduct,
        pattern: data.pattern,
        productDescription: data.productDescription,
      }]

console.log(productDetails)
      // Use req.file to access the uploaded file
      await productDetailModel.create({
        categoryid: data.categoryid,
        subcategoryid: data.subcategoryid,
        file: req.files,  // Ensure this uses req.file
        productdetails: productDetails,
        price: data.price,
        colour: data.colour,
        extraCharges: data.extraCharges,
        createat: new Date(),
        createby: req.user.emailid,
        size: ["XS", "M", "L", "XL", "XXL", "XXXL"],
      });

      res.status(200).send("Product created successfully");
    } catch (error) {
      console.error("Error:", error); // Debugging line
      res.status(500).send({ message: error.message });
    }
  });
};





exports.getproduct = async (req, res) => {
  try {
    const data = reqData(req);
    console.log(data,"sshh")
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






exports.getByProductId = async (req, res) => {
  try {
    const data = reqData(req);
    console.log(data.id,"3456789272727272727277737337377722727272727272727  ")
    await productDetailModel
      .find({ _id: data.id, status: "active" })
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
    console.log(data,"sbsb")
    
      await productDetailModel.findOneAndUpdate(
        { _id: data._id, status: "active" },
        { $set: { rating: data.rating, review: data.review } },
        { new: true }
      ).then((result)=>{
        res.status(200).send("Thank you for your review")
      }).catch((err)=>{
        res.status(404).send(err)
      })
    
  } catch (error) {
    res.status(404).send(error);
  }
};
