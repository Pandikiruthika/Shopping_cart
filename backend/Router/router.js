const Router = require("express").Router();
const userController = require("../Controller/userController");
const productCategoryController = require("../Controller/productCategoryController");
const Auth=require("../MiddleWare/auth")
// user Router

Router.route("/verifyotp").post(userController.verifyOtp);
Router.route("/createuser")
  .post(Auth.auth,userController.createUser)
  .put(Auth.auth,userController.updateUser)
  .get(Auth.auth,userController.getallUser);
Router.route("/login").post(userController.login);
Router.route("/getuser/:emailid").get(Auth.auth,userController.getOneUser);

// category Router

Router.route("/categorycreation")
  .post(Auth.auth,productCategoryController.productCategory)
  .get(Auth.auth,productCategoryController.getall)
  .put(Auth.auth,productCategoryController.updateCategory);
Router.route("/getcategory/:id").get(Auth.auth,productCategoryController.getOne);
module.exports = Router;
