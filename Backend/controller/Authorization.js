const jwt = require("jsonwebtoken");

<<<<<<< HEAD
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
    req.body.email=email;
    next();
}
module.exports=Authorization
=======
const Authorization = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized user",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      msg: "Token error",
    });
  }
};

module.exports = Authorization;
>>>>>>> 4da85a71fdf6bdce444320f42f0b7d5281cdc557
