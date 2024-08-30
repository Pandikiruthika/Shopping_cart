const userModel=require("../Model/UserModel")
const {reqData}=require("../Utils/constant")
exports.createUser=async(req,res)=>{
    try {
        const data=reqData(req)
      await  userModel.findOne({emailid:data.emailid,status:active}).then((result)=>{
            if(result){
                res.status(409).send(`User already exist`)
            }else{
              if(data.roletype){
                userModel.create({
                    name:data.name,
                    phoneNumber:data.phoneNumber,
                    emailid:data.emailid,
                    
                })
              }
            }
        }).catch((err)=>{
            res.status(404).send("Data Not Found")
        })
    } catch (error) {
        res.status(500).send(error)
    }
}