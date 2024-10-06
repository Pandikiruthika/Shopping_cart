const MenusModel = require("../Model/menus/menusModel");
const {reqData}=require("../Utils/constant")
exports.createMenus = (req, res) => {
  try {
    const data=reqData(req)
    const roletype=req.user.roletype
    console.log(roletype,"vgg")
    MenusModel.findOne({ $or: [{ menuorder: data.menuorder }, { menusname: data.menusname }],status: "active" })
      .then(async (menus) => {
        if (!menus) {
            if(roletype==="Admin"){
                MenusModel.create({
                    menusname: data.menusname,
                    menuorder: data.menuorder,
                    roletype:data.roletype,
                    createat: new Date(),
                    createby: req.user.emailid,
                  })
                    .then((data) => {
                     
                      res.status(200).send("Menu Created Successfully");
                    })
                    .catch((err) => {
                      res.status(400).send("Registration failed");
                    });
            }else{
                res.status(500).send("invalid User")
            }
         
        } else {
          res.status(409).send(`Already exist`)
        }
      }
      );


  } catch (err) {
    return res.status(400).send("Menu Creation failed");
  }
};

exports.getAllMenus = async (req, res) => {
  try {
    const roletype=req.user.roletype
    await MenusModel
      .find({ roletype: roletype, status: "active" })
      
      .then((data) => {
        res.status(200).send(data);

      })
      .catch((err) => {
        res.status(500).send(err);
      });


  } catch {
    res.status(500).send("Error while Menu Model Get ALL");
  }
};

exports.getOneMenu = async (req, res) => {
  try {
    const data=reqData(req)
    const roletype=req.user.roletype
    await MenusModel.findOne({ roletype: roletype,status: "active" })
      .then(async (menus) => {
        res.status(200).send(menus);
      
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch {
    res.status(500).send("Error while menu Get one");
  }
};



exports.updateOneMenu = async (req, res) => {
  try {
    const data=reqData(req)
    MenusModel.findOneAndUpdate(
      { _id: data.id,status: "active" },
      {
        $set: {
          menusname: data.menusname,
          menuorder: data.menuorder,
          rootapi: data.rootapi,
          groupname:data.groupname,
          menuapi:data.menuapi,
          status:data.status,
          updateat:new Date(),
          updateby:req.user.emailid
        },
      },
      { new: true }
    )
      .then((data) => {

        res.status(200).send("Menu Updated Successfully");
      })
      .catch((err) => {
        res.status(500).send(err);
      });


  } catch {
    res.status(500).send("Error while updating one in menus");
  }
};


exports.deleteByIdmenu = async (req, res) => {
  try {
    const data=reqData(req)
    const roletype=req.user.roletype
    if(roletype==="Admin"){
        await MenusModel.findByIdAndDelete({ _id: data.id,status:"active" })
        .then((data) => {
          res.status(200).send("Menu Deleted Successfully");
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }else{
        res.status(500).send("invalid User")
    }
   
  } catch {
    res.status(500).send("Error while in delete one in menu");
  }
};





