const express =require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app =express()
const db=require("./Config/database")
const Router=require('./Router/router')


// db connection
db;
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))
app.use(bodyParser.json({limit:"50mb"}))
app.use('/images', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api",Router)
app.listen(process.env.PORT,()=>{
    console.log(`Server is Running at http://localhost:${process.env.PORT}`)
})