const jwt = require("jsonwebtoken");

const Authorization=(req,res,next)=>{
    const{token}=req.headers;
    if(!token){
       return res.status(400).json({success:false,msg:"UnAuthorized user"});
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    if(!decode){
        return res.status(400).json({success:false,msg:"UnAuthorized user"});

    }
    const email=decode.email;
    req.user={};
    req.user.email=email;
    next();
}
module.exports=Authorization
