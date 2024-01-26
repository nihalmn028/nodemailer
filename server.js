const express = require('express')
const app=express()
const mongoose=require('mongoose')
const router=require('./routes/user')
const otpRouter=require('./routes/otp')
const protectRouter=require('./routes/protected')
const dotenv=require('dotenv').config()

app.use(express.json())

app.use('/',router)
app.use('/',router)
app.use('/',otpRouter)
app.use('/',protectRouter)





app.listen(process.env.PORT,()=>{
  console.log("server running")
mongoose.connect(process.env.STRING,{
  useNewUrlParser:true,
  UseUnifiedTopology:true
}).then(()=>{
  console.log("db connected")
})
.catch((err)=>{
  console.log(err)
})
})