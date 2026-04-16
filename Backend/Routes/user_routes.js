<<<<<<< HEAD
const express=require('express');
const GeneratePdf_Controller=require('../controller/Generatepdf_controller');
const Register_controller=require('../controller/Register_controller');
const Syllabus_controller = require('../controller/Syllabus_controller');

const Login_controller = require('../controller/Login_controller');
const YoutubeVideo = require('../controller/YoutubeVideo_Controller');
const Authorization = require('../controller/Authorization');
const Quizz = require('../controller/Quizz_controller');
const user_router=express.Router();

user_router.post("/login",Login_controller);
user_router.post("/register",Register_controller);
user_router.post("/generatepdf",Authorization,GeneratePdf_Controller);
user_router.post("/syllabus",Authorization,Syllabus_controller);
user_router.post("/generateQuizz",Authorization,Quizz);
user_router.post("/suggestYoutube",Authorization,YoutubeVideo);
module.exports=user_router;
=======
const express = require('express');

const GeneratePdf_Controller = require('../controller/Generatepdf_controller');
const Register_controller = require('../controller/Register_controller');
const Syllabus_controller = require('../controller/Syllabus_controller');
const Quizz_controller = require('../controller/Quizz_controller');
const Login_controller = require('../controller/Login_controller');
const YoutubeVideo = require('../controller/YoutubeVideo_Controller');
const Authorization = require('../controller/Authorization');
const getCourses = require("../controller/getCourses");
const getCourseById = require("../controller/getCourseById");

const user_router = express.Router();

user_router.post("/login", Login_controller);
user_router.post("/register", Register_controller);
user_router.post("/generatepdf", Authorization, GeneratePdf_Controller);
user_router.post("/syllabus", Authorization, Syllabus_controller);
user_router.post("/generateQuizz", Authorization, Quizz_controller);
user_router.post("/suggestYoutube", Authorization, YoutubeVideo);
user_router.get("/mycourses", Authorization, getCourses);
user_router.get("/course/:id", Authorization, getCourseById);

module.exports = user_router;
>>>>>>> 4da85a71fdf6bdce444320f42f0b7d5281cdc557
