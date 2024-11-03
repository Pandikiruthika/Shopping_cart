const Router = require("express").Router();
const userController = require("../Controller/userController");
const productCategoryController = require("../Controller/productCategoryController");
const subproductCategoryController = require("../Controller/subCategoryController");
const vendorController=require("../Controller/vendorController")
const productController=require("../Controller/productController")
const MenusController=require("../Controller/menusController")
 const Auth = require("../MiddleWare/auth");
 const orderController=require("../Controller/orderController")
 const reviewController=require("../Controller/reviewController")
 const cartController=require("../Controller/Addcartcontroller")
// user Router

Router.route("/verifyotp").post(userController.verifyOtp);
Router.route("/createuser")
  .post( userController.createUser)
  .put(Auth.auth,userController.updateUser)
  .get(Auth.auth, userController.getallUser);
Router.route("/login").post(userController.login);
Router.route("/getuser/:emailid").get(userController.getOneUser);

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
Router.route("/product/:subcategoryid").get(productController.getproduct)
Router.route("/productdetail/:id").get(productController.getByProductId)
Router.route("/update").put(Auth.auth,productController.updateproduct)

// order Route
Router.route("/order").post(Auth.auth,orderController.placeOrder)
Router.route("/getorder").get(Auth.auth,orderController.getAllorder)
Router.route("/orderDetail/:orderid").get(Auth.auth,orderController.getorderByid)
Router.route("/updateorder").put(Auth.auth,orderController.updateorder)
Router.route("/deleteorder").put(Auth.auth,orderController.deleteorder)
Router.route('/menus').post(Auth.auth, MenusController.createMenus).get(Auth.auth, MenusController.getAllMenus)
Router.route('/getmenus').get(Auth.auth, MenusController.getOneMenu).put(Auth.auth, MenusController.updateOneMenu)


// review Router
Router.route('/review').post(Auth.auth,reviewController.createReview)
Router.route("/getreview/:productid").get(reviewController.getReview)
// AddCart
Router.route('/addCart').post(Auth.auth,cartController.createCart).get(Auth.auth,cartController.getCart).delete(Auth.auth,cartController.deleteCart)


module.exports = Router;

