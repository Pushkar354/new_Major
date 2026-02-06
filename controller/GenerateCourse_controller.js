const { GoogleGenAI } = require("@google/genai");

const Generate_course = async (req,res)=>{

try{

 const ai = new GoogleGenAI({});
 const {hours,modules} = req.body;

 if(!Array.isArray(modules) || !hours){
   return res.status(400).json({error:"invalid input"});
 }

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

 const response = await ai.models.generateContent({
   model:"gemini-3-flash-preview",
   contents: prompt
 });

 let text = response.text;
 text = text.replace(/```json|```/g,"").trim();

 const data = JSON.parse(text);

 res.json(data);

}catch(error){

 console.error(error);
 res.status(500).send("course generation failed");

}

}

module.exports = Generate_course;
