const dotenv=require("dotenv")
const mongoose=require("mongoose")
dotenv.config()
mongoose.connect(process.env.MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{
    console.log("Database connect SucessFully")
}).catch((err)=>{
    console.log(err)
    process.exit()
})