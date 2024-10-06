const subProductCategoryModel = require("../Model/ProductCategory/subcategoryModel");
const productCategoryModel = require("../Model/ProductCategory/productCategoryModel");
const { reqData } = require("../Utils/constant");
const imageupload = require("../uploads/subCategoryUploads");



exports.createSubProductCategory = async (req, res) => {
  imageupload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    try {
      console.log(req.body, "nn");
      const data = req.body; // Assuming req.body contains the relevant data
      const roletype = req.user.roletype;

      // Check if sub-category already exists
      const existingSubCategory = await subProductCategoryModel.findOne({
        categoryid: data.categoryid,
        subcategoryname: data.subcategoryname,
        status: "active",
      });

      if (existingSubCategory) {
        return res.status(404).send("Data Already Exists");
      }

      // Check if category exists and is active
      const existingCategory = await productCategoryModel.findOne({ _id: data.categoryid, status: "active" });

      if (!existingCategory) {
        return res.status(404).send("Category Not Found");
      }

      // Only Admins can create sub-categories
      if (roletype === "Admin") {
        const newSubCategory = await subProductCategoryModel.create({
          categoryid: existingCategory._id,
          subcategoryname: data.subcategoryname,
          file: req.file ? req.file.filename : null, // Save file name if uploaded
          createat: new Date(),
          createby: req.user.emailid,
        });

        res.status(200).send("SubCategory created Successfully");
      } else {
        res.status(403).send("Permission Denied");
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).send("Error in creating subcategory");
    }
  });
};



exports.getOneCategory = async (req, res) => {
  try {
    const data = reqData(req);
    await subProductCategoryModel
      .findOne({ _id: data.id, status: "active" })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(404).send("Data Not Found");
      });
  } catch (error) {
    res.status(500).send(error);
  }
};



exports.getAllSubcategory=async(req,res)=>{
  try {
    const data=reqData(req)
    await subProductCategoryModel.find({status:"active"}).then((result)=>{
      res.status(200).send(result)
    }).catch((err)=>{
      res.status(404).send("Error in getting Data");
    })
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
}
