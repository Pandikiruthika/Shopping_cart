const subProductCategoryModel = require("../Model/ProductCategory/subcategoryModel");
const productCategoryModel = require("../Model/ProductCategory/productCategoryModel");
const { reqData } = require("../Utils/constant");

exports.createSubProductCategory = async (req, res) => {
    try {
      console.log(req.body,"nn")
    const data = reqData(req);
    const roletype = req.user.roletype;
    await subProductCategoryModel
      .findOne({
        categoryid: data.categoryid,
        subcategoryname: data.subcategoryname,
        status: "active",
      })
      .then(async (result) => {
        if (result) {
          res.status(404).send("Data Already Exists");
        } else {
          await productCategoryModel
            .findOne({ _id: data.categoryid, status: "active" })
            .then(async (result1) => {
              if (roletype === "Admin") {
                await subProductCategoryModel
                  .create({
                    categoryid: result1._id,
                    subcategoryname: data.subcategoryname,
                    file: data.file,
                    createat: new Date(),
                    createby: req.user.emailid,
                  })
                  .then((data) => {
                    res.status(200).send("SubCategory created Sucessfully");
                  })
                  .catch((err) => {
                    res.status(500).send("Error in creation");
              });
              } else {
                res.status(500).send("Data Not Found");
              }
            })
            .catch((err) => {
              res.status(404).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(404).send("Data Not Found");
      });
  } catch (error) {
    res.status(404).send(error);
  }
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
