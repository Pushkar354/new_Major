const { GoogleGenAI } = require("@google/genai");
const {v4}=require('uuid');
const { Quiz_model } = require("../Database/Schema/user");

const generate_quiz=async(notes)=>{
try{
    const ai = new GoogleGenAI({});
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
    ]  ${notes}`;
    const quiz=await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt
    })
    let text = quiz.text;
    text = text.replace(/```json|```/g,"").trim();
     const data = JSON.parse(text);

    return data;

}catch(err){
    return err;
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
    const generated_quiz=new Quiz_model({
        id:v4(),
        topic:topic,
        quiz:quiz_obj 
    })
    await generated_quiz.save();
    return generated_quiz;

}
module.exports=generate_quiz