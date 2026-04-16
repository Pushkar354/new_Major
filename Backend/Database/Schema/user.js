const moongose=require('mongoose');

const Connect_todb=()=>{

    moongose.connect(process.env.MONGO_URI).then(() => console.log("Database connected")).catch((error)=>{console.log(error)});
    
}

const user_Schema=new moongose.Schema({
    name:{type:String,
        required:true
    },
    email:{type:String,
        unique:true,
        required:true
    },
    password:String

})
const Syllabus_Schema=new moongose.Schema({
    email:String,
    topic:String,
    data:{type:Buffer,required:true},
    contentType: { type: String, default: 'application/pdf' },
     createdAt: { type: Date, default: Date.now }

})
const pdf_Schema = new moongose.Schema({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true }, // PDF binary data
  contentType: { type: String, default: 'application/pdf' }
});
// const Course_Schema=new moongose.Schema({
//     email:String,
//     topic:String,
//     data:{type:Buffer,required:true},
//     modules:[pdf_Schema],
//      createdAt: { type: Date, default: Date.now }

// })
const Course_Schema = new moongose.Schema({
  email: String,
  topic: String,
  modules: { type: Array }, // ✅ allow videos array
  createdAt: { type: Date, default: Date.now }
});
const Module_quiz=new moongose.Schema({
    quiz:{type: moongose.Schema.Types.Mixed, required: true}
})
const Quiz_Schema=new moongose.Schema({
    id:String,
    topic:String,
    quiz:[Module_quiz],
    createdAt:{type:Date,default:Date.now}
});
const Syllabus_model = moongose.model('Syllabus', Syllabus_Schema);
const User_model = moongose.model('User', user_Schema);
const Course_model = moongose.model('Course', Course_Schema);
const Quiz_model = moongose.model('Quiz', Quiz_Schema);
module.exports={Connect_todb,User_model,Syllabus_model,Course_model,Quiz_model};
