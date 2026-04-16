const jwt = require("jsonwebtoken");

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