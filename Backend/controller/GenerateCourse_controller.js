const { Course_model } = require("../Database/Schema/user");
const Pdf = require("pdfkit");
const {GoogleGenAI}=require('@google/genai');
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
 const ai=new GoogleGenAI({});
 const generatedCourse = await ai.models.generateContent({
   model:"gemini-3-flash-preview",
   contents: prompt
 });

 let text = generatedCourse.text;
 text = text.replace(/```json|```/g,"").trim();

return JSON.parse(text);
}

const Generate_course = async (email,topic,hours,modules)=>{
  

try{
   const arr=[];
   const Course_data= await courseGenerator(hours,modules);
   
    for (const e of Course_data.modules) {
      const pdfBuffer = await new Promise((resolve, reject) => {
        const doc = new Pdf();
        const chunks = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        doc.fontSize(30).text(e.title, { align: 'center' });
        doc.moveDown();

        e.lessons.forEach(lesson => {
          doc.fontSize(22).text(lesson.title);
          doc.moveDown();
          doc.fontSize(18).text(lesson.explanation);
          doc.moveDown();
          doc.fontSize(18).text(lesson.example);
          doc.moveDown();
          doc.fontSize(18).text(lesson.real_world_usage);
          doc.moveDown();
          doc.fontSize(18).text(lesson.summary);
          doc.moveDown();
        });

        doc.end();
      });

      arr.push({
        filename: e.title,
        modules:  pdfBuffer
      });
    }

   
    const Course = new Course_model({
      email,
      topic,
      data: arr
    });

    await Course.save();

    console.log("Course generated successfully");

    return Course;

  } catch (err) {
   throw new Error(err.message);
  }
};



module.exports = Generate_course;
