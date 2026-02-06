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
    name:String,
    data:{type:Buffer,required:true},
    contentType: { type: String, default: 'application/pdf' },
     createdAt: { type: Date, default: Date.now }

})
const pdf_model=new moongose.Model(Syllabus_Schema);
const User_model=new moongose.Model(user_Schema);
module.exports={Connect_todb,User_model,pdf_model};
