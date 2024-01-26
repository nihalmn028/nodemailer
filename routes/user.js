const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')
const schema=require('../model/schema')
const jwt=require('jsonwebtoken')
router.post('/register',async (req,res)=>{
  try {
    const {username,password}=req.body
    const hashedPassword=await bcrypt.hash(password,10)
   await schema.create({username,password:hashedPassword})
    res.status(200).json({message:"register successfully"})
  } catch (error){
    res.status(500).json({error:"register failed"})
  }
 
})
router.post('/login',async (req,res)=>{
  try {
    const {username,password}=req.body
    const user=await schema.findOne({username})
    if(!user){
    return res.status(401).json({error:"authentication failed"})}
  const passwordMatch=await bcrypt.compare(password,user.password)
  if(!passwordMatch){
    return res.status(401).json({error:"authentication failed"})}
const token=await jwt.sign({userId:user._id},"secret key",{expiresIn:"1h"})
res.status(200).json({token})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"login failed"})

  }
})
router.post('/forgot',async (req,res)=>{
  try {
    const {username}=req.body
   const schema1=await schema.findOne({username})
   if(!schema1)
   return res.status(401).json({error:"otp failed"})
  const otp= Math.floor(100000+Math.random()*900000)
  
  await schema.findByIdAndUpdate(schema1._id,{otp},{new:true})

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
    html: `otp is <h1> ${otp}</h1>`
  };
  
  // Send email
  await transporter.sendMail(mailOptions, () => {
   
    console.log('Email sent:');
   
   
  
  });
  
    res.status(200).json({message:"otp successfull"})
  } catch (error){
    res.status(500).json({error:"otp failed"})
    console.log(error);

  }
 
})














module.exports=router