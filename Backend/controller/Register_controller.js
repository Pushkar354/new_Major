const bcrypt=require("bcrypt");
const { User_model } = require("../Database/Schema/user");
const Register_controller=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            res.status(500).json({success:false,message:"Invalid input"});
        }
        const user=await User_model.findOne({email:email});
        if(user){
            return res.status(500).json({success:false, message:"user exists"});
        }
        
        const hashPassword=await bcrypt.hash(password,10);

        const user_created=new User_model({
             name:name,
             email:email,
             password:hashPassword
        })
        console.log(user_created);
         await user_created.save();
         res.status(200).json({success:true,user:user_created});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}

module.exports=Register_controller;