const { Syllabus_model } = require("../Database/Schema/user");

const generatePdf = async(email,topic,modules)=>{
try{

 const doc = new Pdf();
 const chunks = [];

 doc.on("data",chunk=>chunks.push(chunk));
 doc.on("end",async()=>{
    const pdf= Buffer.concat(chunks);
    const Syllabus=new Syllabus_model({
          email:email,
          topic:topic,
          data:pdf
    })
await Syllabus.save();
return Syllabus;
});

 doc.fontSize(30).text(topic,{align:'center'});
 doc.moveDown();

 modules.forEach(m=>{
    doc.fontSize(22).text(m.title,{align:'left'});
    doc.moveDown();
    doc.fontSize(22).text(m.content,{align:'left'});
    doc.moveDown();
 });

 doc.end();

}catch(err){
 console.log(err);
}}
module.exports=generatePdf;