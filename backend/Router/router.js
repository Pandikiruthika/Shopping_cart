const Router = require("express").Router();
const userController = require("../Controller/userController");
const productCategoryController = require("../Controller/productCategoryController");
const subproductCategoryController = require("../Controller/subCategoryController");
const vendorController=require("../Controller/vendorController")
const productController=require("../Controller/productController")
 const Auth = require("../MiddleWare/auth");
 const orderController=require("../Controller/orderController")
// user Router

Router.route("/verifyotp").post(userController.verifyOtp);
Router.route("/createuser")
  .post(Auth.auth, userController.createUser)
  .put(Auth.auth, userController.updateUser)
  .get(Auth.auth, userController.getallUser);
Router.route("/login").post(userController.login);
Router.route("/getuser/:emailid").get(Auth.auth, userController.getOneUser);

// category Router

Router.route("/categorycreation")
  .post(Auth.auth, productCategoryController.productCategory)
  .get(Auth.auth, productCategoryController.getall)
  .put(Auth.auth, productCategoryController.updateCategory);
Router.route("/getcategory/:id").get(
  Auth.auth,
  productCategoryController.getOne
);
// subcategory Router
Router.route("/subcategory").post(
  Auth.auth,
  subproductCategoryController.createSubProductCategory
).get(subproductCategoryController.getAllSubcategory)
Router.route("/getproduct/:id").get(
  Auth.auth,
  subproductCategoryController.getOneCategory
);


// vendor Router
Router.route("/vendor").post(Auth.auth,vendorController.CreateVendorDetails).get(Auth.auth,vendorController.getAllVendorDetails)
Router.route("/vendor/:id").get(Auth.auth,vendorController.getOneVendorDetails).put(Auth.auth,vendorController.updateVendor)
// product route
Router.route("/product").post(Auth.auth,productController.createProduct)
Router.route("/product/:subcategoryid").get(Auth.auth,productController.getproduct)
Router.route("/update").put(Auth.auth,productController.updateproduct)

// order Route
Router.route("/order").post(Auth.auth,orderController.placeOrder)
Router.route("/getorder/:userid").get(Auth.auth,orderController.getAllorder)
Router.route("/getupdate").put(Auth.auth,orderController.updateorder)
module.exports = Router;
