const express=require('express');
const GeneratePdf_Controller=require('../controller/Generatepdf_controller');
const Register_controller=require('../controller/Register_controller');
const Syllabus_controller = require('../controller/Syllabus_controller');
const user_router=express.Router();


user_router.post("/register",Register_controller);
user_router.post("/generatepdf",GeneratePdf_Controller)
user_router.post("/syllabus",Syllabus_controller)
module.exports=user_router;