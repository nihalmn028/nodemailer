const express=require('express')
const otpRouter=express.Router()
const schema=require('../model/schema')

otpRouter.post('/otp',async (req,res)=>{
  try {
    const {otp,password}=req.body
   const schema1=await schema.findOne({otp})
   if(!schema1)
   return res.status(401).json({error:"password failed"})
  
  
  await schema.findByIdAndUpdate(schema1._id,{password},{new:true})

  // Create a transporter using SMTP transport
  
  // Email content
 
    res.status(200).json({message:"password successfull"})
  } catch (error){
    res.status(500).json({error:"password failed"})
  }
 
})














module.exports=otpRouter