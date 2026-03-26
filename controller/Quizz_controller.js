const { GoogleGenAI } = require("@google/genai");
const {v4}=require('uuid');
const { Quiz_model, Course_model } = require("../Database/Schema/user");

const { extract_text, Split_into_chunks } = require("./pdf_data_extract");

const generate_quiz=async(chunks)=>{
try{
    const ai = new GoogleGenAI({});
    const allQuestions=[];
    for(const i=0;i<chunks.length;i++){

        const prompt = `
        You are a quiz generator. Based on the following notes, create exactly 15 multiple-choice questions.
        Each question must have:
        - "question": string
        - "options": array of 4 strings
        - "answer": the correct option string
        
        Return ONLY valid JSON in the following format:
        [
            {
                "question": "...",
                "options": ["...", "...", "...", "..."],
                "answer": "..."
                }
                ] Study material: ${chunks[i]}`
                const response=await ai.models.generateContent({
                    model:"gemini-3-flash-preview",
                    contents:prompt
                })
               const rawText = response.text();
      const jsonStart = rawText.indexOf("[");
      const jsonEnd = rawText.lastIndexOf("]") + 1;
        const cleanJson = rawText.slice(jsonStart, jsonEnd);
      const questions = JSON.parse(cleanJson);
      allQuestions.push(...questions);
               
            }
                
                return allQuestions;

}catch(err){
     console.error("Quiz generation failed:", err);
    throw new Error("Failed to generate quiz");
}
}
const Quizz=async(req,res)=>{
    
    try{

        const {topic,email}=req.body;
        if(!topic||!email){
              res.status(500).json({success:false,message:"Invalid request"});
        }

        
        const course=Course_model.find({topic:topic,email:email});
        
        const modules=course.modules;
        const quiz_obj=[];
        modules.forEach(async(e)=>{
            const text=await extract_text(e);
            const data= Split_into_chunks(e,3000);
            const quiz=await generate_quiz(data);
            quiz_obj.push(quiz);
        })
     


          const generated_quiz=new Quiz_model({
        id:v4(),
        topic:topic,
        quiz:quiz_obj 
    })
    await generated_quiz.save();
    return generated_quiz;

    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }

}
const Quizz_controller=async(topic,modules)=>{
    const quiz_obj=[];
    modules.forEach(e => {
        try{

            const quiz=generate_quiz(JSON.stringify(e.lessons));
             quiz_obj.push(quiz);

        }catch(err){
            console.log(err);
            res.status(500).json({success:false,message:err.message});
        }
        
    });
  

}
module.exports=Quizz_controller;