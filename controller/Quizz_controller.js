const { GoogleGenAI } = require("@google/genai");
const { v4: uuidv4 } = require('uuid');
const { Quiz_model, Course_model } = require("../Database/Schema/user");

const { extract_text, Split_into_chunks, handleRateLimit } = require("./pdf_data_extract");

const generate_quiz = async (chunks) => {

  const ai = new GoogleGenAI({});
  let allQuestions = [];
  const MAX_QUESTIONS = 50;
  let API_CALL_COUNT = 0;
  const MAX_DAILY_CALLS = 18;

  for (let index = 0; index < chunks.length; index++) {
    const chunk = chunks[index];

    if (API_CALL_COUNT >= MAX_DAILY_CALLS) {
      console.log("Daily quota reached");
      break;
    }

    try {
      const prompt = `
You are a strict JSON generator.

Generate EXACTLY 5 multiple-choice questions.

Rules:
- Return ONLY a JSON array
- NO explanation text
- NO markdown
- NO extra characters
- Each object must have:
  - "question": string
  - "options": array of exactly 4 strings
  - "answer": must match one option exactly

Format:
[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "answer": "..."
  }
]

Study material:
${chunk}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: prompt
      });

      API_CALL_COUNT++; 

      const rawText = response.text;

      const start = rawText.indexOf("[");
      const end = rawText.lastIndexOf("]") + 1;

      if (start === -1 || end === -1) {
        console.error(`Chunk ${index}: Invalid JSON format`);
        continue; // ❗ don't return, just skip
      }

      let parsed = [];
      try {
        parsed = JSON.parse(rawText.slice(start, end));
      } catch {
        console.error(`Chunk ${index}: JSON parse failed`);
        continue;
      }

      allQuestions.push(...parsed);

    } catch (err) {
      console.error(`Chunk ${index} failed:`, err.message);
      continue; // ❗ don't return, continue loop
    }
  }

  if (allQuestions.length > MAX_QUESTIONS) {
    allQuestions = allQuestions.slice(0, MAX_QUESTIONS);
  }

  return allQuestions;
};
const Quizz=async(req,res)=>{
    
    try{

        const {topic,email}=req.body;
        if(!topic||!email){
             return res.status(500).json({success:false,message:"Invalid request"});
        }

        
        const course=await Course_model.findOne({topic:topic,email:email});
        const modules=course.data;
        const quiz_obj=[];
        for (const e of modules) {
            const text=await extract_text(e.modules); 
            const quiz=await generate_quiz([text]);
            if(quiz.length!=0){

              quiz_obj.push(...quiz);
            }
        }
        if(quiz_obj.length<=10){
           throw new Error("Quiz not generated");
         
        }
     


          const generated_quiz=new Quiz_model({
        email:email,
        topic:topic,
        quiz:quiz_obj 
    })
    await generated_quiz.save();
    return res.status(200).json({
      success:true,
      quizz:generated_quiz
    }) 

    }catch(err){
       throw new Error(err.message);
    }

}

module.exports=Quizz;