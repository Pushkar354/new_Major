const { GoogleGenAI } = require("@google/genai");

const Syllabus_controller = async (req,res)=>{

try{

 const ai = new GoogleGenAI({});
 const {topic,hours} = req.body;

 if(!topic || !hours){
   return res.status(400).json({error:"invalid input"});
 }

 const response = await ai.models.generateContent({
  model:"gemini-3-flash-preview",
  contents:`
Generate a structured course syllabus.

Topic: ${topic}
Duration: ${hours} hours

Rules:
- Divide into modules
- Each module must contain lessons
- Make it realistic for industry learning

Return ONLY valid JSON:
{
 "topic":"",
 "duration":"",
 "modules":[
   {
     "title":"",
     "lessons":[]
   }
 ]
}
`
 });

 
 let text = response.text;

 
 text = text.replace(/```json|```/g,"").trim();

 const data = JSON.parse(text);

 res.json(data);

}catch(err){

 console.error(err);
 res.status(500).json({error:"AI generation failed"});

}

}

module.exports = Syllabus_controller;
