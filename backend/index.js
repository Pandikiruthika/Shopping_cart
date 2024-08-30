const express =require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app =express()
const db=require("./Config/database")


// db connection
db;
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))
app.use(bodyParser.json({limit:"50mb"}))
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running at http://localhost:${process.env.PORT}`)
})