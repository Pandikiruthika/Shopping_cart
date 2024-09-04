const vendorModel = require("../Model/Vendor/vendorModel");
const { reqData } = require("../Utils/constant");
exports.CreateVendorDetails = async (req, res) => {
  try {
    const data = reqData(req);
    const roletype = req.user.roletype;

    await vendorModel
      .findOne({
        companyname: data.companyname,
        status: "active",
      })
      .then(async (vendor) => {
        if (!vendor) {
          if (roletype === "Admin") {
            await vendorModel
              .create({
                companyname: data.companyname,
                contactnumber: data.contactnumber,
                emailid: data.emailid,
                address: data.address,
                categoryid:data.categoryid,
                subcategoryid:data.subcategoryid,
                createat: new Date(),
                createby: req.user.emailid,
              })
              .then((data) => {
                res.status(200).send("Vendor Created Successfully");
              })
              .catch((err) => {
                res.status(400).send(err);
              });
          } else {
            res.status(500).send("Data Not Found");
          }
        } else {
          res.status(403).send("Vendor Already Exist");
        }
      })
      .catch((err) => {
        res.status(404).send("Vendor Not Found");
      });
  } catch(error) {
    res.status(500).send(error);
  }
};


exports.getAllVendorDetails = async (req, res) => {

    try {
        const  roletype=req.user.roletype
        if(roletype==="Admin"){
            await vendorModel
            .find({ status: "active" })
            .then((data) => {
              res.status(200).send(data);
      
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }else{
            res.status(500).send("Data Not Found")
        }
  
    } catch {
      res.status(500).send("Error while VendorDetails Get ALL");
    }
  };


  exports.getOneVendorDetails = async (req, res) => {
    try {
        const data=reqData(req)
      await vendorModel
        .findOne({ _id: data.id, status: "active" })
        .then(async (data) => {
          await res.status(200).send(data);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } catch {
      res.status(500).send("Error while GetOne VendorDetails");
    }
  };



  exports.updateVendor =async(req,res)=>{
    try {
        const data=reqData(req)
await vendorModel.findOneAndUpdate({_id:data.id,status:"active"}).then((results)=>{
    res.status(200).send("Vendor Updated SucessFully")
})    } catch (error) {
        res.status(500).send(error)
    }
  }
