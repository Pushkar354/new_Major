const jwt = require("jsonwebtoken");

const Authorization=(req,res,next)=>{
    const{token}=req.headers;
    if(!token){
        res.status(200).json({success:false,msg:"UnAuthorized user"});
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    if(!decode){
        res.status(200).json({success:false,msg:"UnAuthorized user"});

    }
    const email=decode.email;
    req.body.email=email;
    next();
}
module.exports=Authorization