const bcrypt=require('bcrypt');
const cookie=require('cookie-parser');
const jwt=require('jsonwebtoken');
const { User_model } = require('../Database/Schema/user');

 const Login_controller=async(req,res)=>{
    try{

        const {email,password}=req.body;
        if(!email||!password){
         return res.status(500).json({success:false,message:"Invalid input"});
        }
        const user=await User_model.findOne({email:email});
        if(!user){
          return   res.status(500).json({success:false,message:"user does not exits"});
        }
        const hashedPassword=user.password;
        const checkhash=await bcrypt.compare(password,hashedPassword);
        if(checkhash){
          const token=  jwt.sign({email:email,name:user.name},process.env.JWT_SECRET);
         return res.status(200).json({success:true,token:token,})
        }else{
           return res.status(500).json({success:false,message:"invalid attempt"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:err.message});
    }
}
module.exports=Login_controller;
