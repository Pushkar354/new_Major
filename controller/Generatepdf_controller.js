const Pdf = require("pdfkit");

const Generate_course = require("./GenerateCourse_controller");
const generatePdf = require("./Syllabuspdf_Controller");

const GeneratePdf_Controller = async (req,res)=>{

const {email,topic,hours,modules} = req.body;

if(!topic || !hours  || !Array.isArray(modules)){
   return res.status(400).send("invalid input");
}




try{

 const pdf = await generatePdf(email,topic,modules);
 const Course=await Generate_course(email,hours,modules);

res.json({
   success:true,
   syllabus:pdf,
   course:Course
})

}catch(err){
 res.status(500).json({
   success:false
 });
}

}

module.exports = GeneratePdf_Controller;
