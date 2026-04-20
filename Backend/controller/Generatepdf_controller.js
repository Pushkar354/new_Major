

const Generate_course = require("./GenerateCourse_controller");
const generatePdf = require("./Syllabuspdf_Controller");

const GeneratePdf_Controller = async (req,res)=>{

  const {email}=req.user;
const {topic,hours,modules} = req.body;

if(!topic || !hours  || !Array.isArray(modules)){
   return res.status(400).send("invalid input");
}




try{

generatePdf(email, topic, modules).catch(err => {
  console.error("PDF generation failed:", err);
});
 const Course=await Generate_course(email,topic,hours,modules);

return res.json({
   success:true,
   course:Course
})

}catch(err){
 res.status(500).json({
   msg:err.message,
   success:false
 });
}

}

module.exports = GeneratePdf_Controller;
