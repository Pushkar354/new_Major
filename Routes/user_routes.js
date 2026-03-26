const express=require('express');
const GeneratePdf_Controller=require('../controller/Generatepdf_controller');
const Register_controller=require('../controller/Register_controller');
const Syllabus_controller = require('../controller/Syllabus_controller');
const Quizz_controller = require('../controller/Quizz_controller');
const Login_controller = require('../controller/Login_controller');
const YoutubeVideo = require('../controller/YoutubeVideo_Controller');
const Authorization = require('../controller/Authorization');
const user_router=express.Router();

user_router.post("/login",Authorization,Login_controller);
user_router.post("/register",Authorization,Register_controller);
user_router.post("/generatepdf",Authorization,GeneratePdf_Controller);
user_router.post("/syllabus",Authorization,Syllabus_controller);
user_router.post("/generateQuizz",Authorization,Quizz_controller);
user_router.post("/suggestYoutube",Authorization,YoutubeVideo);
module.exports=user_router;