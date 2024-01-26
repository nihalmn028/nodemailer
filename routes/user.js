const express=require('express')
const router=express.Router()
const nodemailer=require('nodemailer')
const schema=require('../model/schema')
router.post('/register',async (req,res)=>{
  try {
    const {username,password}=req.body
   await schema.create({username,password})
    res.status(200).json({message:"register successfully"})
  } catch (error){
    res.status(500).json({error:"register failed"})
  }
 
})
router.post('/forgot',async (req,res)=>{
  try {
    const {username}=req.body
   const schema1=await schema.findOne({username})
   if(!schema1)
   return res.status(401).json({error:"otp failed"})
  const otp= Math.floor(1000000+Math.random()*9000000)
  const sotp= otp.toString()
  await schema.findByIdAndUpdate(schema1._id,{otp:sotp},{new:true})

  // Create a transporter using SMTP transport
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nihalmn03@gmail.com',
      pass: "odcg twju lmnw qrgw"
    }
  });
  
  // Email content
  const mailOptions = {
    from: 'nihalmn03@gmail.com',
    to: username,
    subject: 'subject otpp', 
    text: "otp is "+sotp
  };
  
  // Send email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  
    res.status(200).json({message:"otp successfull"})
  } catch (error){
    res.status(500).json({error:"otp failed"})
  }
 
})














module.exports=router