const express=require('express')
const verifyToken=require('../middleware/userMiddleware')
const router=express.Router()
router.get('/protected',verifyToken,(req,res)=>{
  console.log(req.userId);
 
  res.status(200).json({message:"protected route access"})
})




module.exports=router