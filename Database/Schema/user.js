const moongose=require('moongose');

Connect_todb=()=>{

    moongose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,
    useUnifiedTopology: true}).then(console.log("Database connected")).catch((error)=>{console.log(error)});
}

const user_Schema=new moongose.Schema({
    email:{type:String,
        unique:true,
        required:true
    },
    password:String

})
const Syllabus_Schema=new Moongose.Schema({
    email:String,
    topic:String,
    data:{type:Buffer,required:true},
    contentType: { type: String, default: 'application/pdf' },
     createdAt: { type: Date, default: Date.now }

})
const pdf_Schema = new mongoose.Schema({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true }, // PDF binary data
  contentType: { type: String, default: 'application/pdf' }
});
const Course_Schema=new Moongose.Schema({
    email:String,
    topic:String,
    data:{type:Buffer,required:true},
    modules:[pdf_Schema],
     createdAt: { type: Date, default: Date.now }

})
const Syllabus_model=new moongose.Model(Syllabus_Schema);
const User_model=new moongose.Model(user_Schema);
const Course_model=new moongose.Model(Course_Schema);
module.exports={Connect_todb,User_model,Syllabus_model,Course_model};
