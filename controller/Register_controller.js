const bcrypt=require("bcrypt");
Register_controller=(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            res.send("Invalid input");
        }
        const hashPassword=bcrypt.hash(password,10);

    }catch(error){
        console.log(error);
    }
}

module.exports=Register_controller;