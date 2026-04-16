const { Course_model } = require("../Database/Schema/user");
const courseGenerator=async(hours,modules)=>{
   const prompt = `
Generate detailed lesson content.

Duration: ${hours} hours

Modules:
${JSON.stringify(modules)}

Rules:
- explain every lesson
- include explanation
- example
- real world usage
- summary

Return ONLY valid JSON:
{
 "modules":[
   {
     "title":"",
     "lessons":[
       {
         "title":"",
         "explanation":"",
         "example":"",
         "real_world_usage":"",
         "summary":""
       }
     ]
   }
 ]
}
`;

 const generatedCourse = await ai.models.generateContent({
   model:"gemini-3-flash-preview",
   contents: prompt
 });

 let text = generatedCourse.text;
 text = text.replace(/```json|```/g,"").trim();

return JSON.parse(text);
}

const Generate_course = async (email,hours,modules)=>{
  

try{
   const arr=[];
   const Course_data= await courseGenerator(hours,modules);
   
   Course_data.modules.forEach(e => {
      const obj={};
      const doc=new Pdf();
      const chunks=[];
      doc.on('data',chunk=>chunks.push(chunk));
      doc.on('end', ()=>{
         obj.filename=e.title;
         obj.data=Buffer.concat(chunks);
         arr.push(obj);
      });
      doc.fontSize(30).text(e.title,{align:'center'});
      doc.moveDown();
      e.lessons.forEach(lesson => {
          doc.fontSize(22).text(lesson.title,{align:'left'});
          doc.moveDown();
          doc.fontSize(18).text(lesson.explanation,{align:'left'});
          doc.moveDown();
          doc.fontSize(18).text(lesson.example,{align:'left'});
          doc.moveDown();
          doc.fontSize(18).text(lesson.real_world_usage,{align:'left'});
          doc.moveDown();
          doc.fontSize(18).text(lesson.summary,{align:'left'});
          doc.moveDown();
      });
      doc.end();
   });
    const Course=  new Course_model({
      email:email,
      topic:topic,
      modules:arr
    })
    await Course.save();
    console.log("Course generated succesfully");
    return Course;
}catch(err){
   res.status(500).send("Course generation failed");
}

}

module.exports = Generate_course;
