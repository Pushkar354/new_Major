const { GoogleGenAI } = require("@google/genai");
const { v4: uuidv4 } = require('uuid');
const { Quiz_model, Course_model } = require("../Database/Schema/user");

const { extract_text, Split_into_chunks } = require("./pdf_data_extract");

const generate_quiz=async(chunks)=>{

    const ai = new GoogleGenAI({});
   
      const MAX_QUESTIONS = 50;

  const promises = chunks.map(async (chunk, index) => {
    try {
      const prompt = `
You are a strict JSON generator.

Generate EXACTLY 15 multiple-choice questions.

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
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      const rawText = response.text;

      
      const start = rawText.indexOf("[");
      const end = rawText.lastIndexOf("]") + 1;

      if (start === -1 || end === -1) {
        console.error(`Chunk ${index}: Invalid JSON format`);
        return [];
      }

      const parsed = JSON.parse(rawText.slice(start, end));

      
      const validQuestions = parsed.filter(q =>
        q &&
        typeof q.question === "string" &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        q.options.every(opt => typeof opt === "string") &&
        typeof q.answer === "string" &&
        q.options.includes(q.answer)
      );

      return validQuestions;

    } catch (err) {
      console.error(`Chunk ${index} failed:`, err.message);
      return [];
    }
  });
    const results = await Promise.all(promises);
     let allQuestions = results.flat();
     if (allQuestions.length > MAX_QUESTIONS) {
    allQuestions = allQuestions.slice(0, MAX_QUESTIONS);
  }

  return allQuestions;
}
const Quizz=async(req,res)=>{
    
    try{

        const {topic,email}=req.body;
        if(!topic||!email){
              res.status(500).json({success:false,message:"Invalid request"});
        }

        
        const course=await Course_model.findOne({topic:topic,email:email});
        const modules=course.data;
        const quiz_obj=[];
        for (const e of modules) {
            const text=await extract_text(e.modules);
            const data= Split_into_chunks(text,3000);
            const quiz=await generate_quiz(data);
            quiz_obj.push(quiz);
        }
     


          const generated_quiz=new Quiz_model({
        email:email,
        topic:topic,
        quiz:quiz_obj 
    })
    await generated_quiz.save();
    return generated_quiz;

    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }

}

module.exports=Quizz;