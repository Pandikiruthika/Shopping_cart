const productCategoryModel = require("../Model/ProductCategory/productCategoryModel");
const { reqData } = require("../Utils/constant");
exports.productCategory = async (req, res) => {
  try {
    const data = reqData(req);
    let roleType = req.user.roletype;

    await productCategoryModel
      .findOne({ categoryname: data.categoryname, status: "active" })
      .then(async (result) => {
        if (result) {
          res.status(404).send("Category already exist");
        } else {
          if (roleType === "Admin") {
            await productCategoryModel
              .create({
                categoryname: data.categoryname,
                createby: req.user.emailid,
                createat: new Date(),
              })
              .then((data) => {
                res.status(200).send("Product Category Created Sucessfully");
              })
              .catch((err) => {
                res.status(404).send("Error in Creation");
              });
          } else {
            res.status(404).send("Data Not found");
          }
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getall = async (req, res) => {
  try {
    await productCategoryModel
      .find({ status: "active" })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(404).send("Error in getAll CategoryProduct");
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const data = reqData(req);
    await productCategoryModel
      .findOne({ _id: data.id, status: "active" })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(505).send("Error in get CategoryProduct");
      });
  } catch (error) {
    res.status(505).send(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const data = reqData(req);
    let roleType = req.user.roletype;
    if (roleType === "Admin") {
      await productCategoryModel
        .findOneAndUpdate(
          { _id: data._id },
          {
            $set: {
              categoryname: data.categoryname,
              updateby: req.user.emailid,
              updateat: new Date(),
            },
          }
        )
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(505).send("Error in Update CategoryProduct");
        });
    } else {
      res.status(505).send("Data Not Found");
    }
  } catch (error) {
    res.status(505).send(error);
  }
};
