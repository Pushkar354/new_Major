// const { Syllabus_model } = require("../Database/Schema/user");
// const Pdf = require("pdfkit");


// const generatePdf = async(email,topic,modules)=>{
// try{

//  const doc = new Pdf();
//  const chunks = [];

//  doc.on("data",chunk=>chunks.push(chunk));
//  doc.on("end",async()=>{
//     const pdf= Buffer.concat(chunks);
//     const Syllabus=new Syllabus_model({
//           email:email,
//           topic:topic,
//           data:pdf
//     })
// await Syllabus.save();
// return Syllabus;
// });

//  doc.fontSize(30).text(topic,{align:'center'});
//  doc.moveDown();

//  modules.forEach(m=>{
//     doc.fontSize(22).text(m.title,{align:'left'});
//     doc.moveDown();
//     doc.fontSize(22).text(m.content,{align:'left'});
//     doc.moveDown();
//  });

//  doc.end();

// }catch(err){
//  console.log(err);
// }}
// module.exports=generatePdf;




const { Syllabus_model } = require("../Database/Schema/user");
const Pdf = require("pdfkit");

const generatePdf = (email, topic, modules) => {
  return new Promise((resolve, reject) => {
    const doc = new Pdf();
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    doc.on("end", async () => {
      try {
        const pdfBuffer = Buffer.concat(chunks);
        await Syllabus_model.create({
          email,
          topic,
          data: pdfBuffer,
        });

        resolve(pdfBuffer);
      } catch (err) {
        reject(err);
      }
    });


    doc.fontSize(25).text(topic, { align: "center" });
    doc.moveDown(2);

    modules.forEach((m, i) => {
      doc.fontSize(18).text(`Module ${i + 1}: ${m.title}`);
      doc.moveDown();

      if (m.lessons && m.lessons.length > 0) {
        m.lessons.forEach((lesson, j) => {
          doc.fontSize(14).text(`Lesson ${j + 1}: ${lesson.title}`);
          doc.moveDown(0.5);

          doc.fontSize(12).text(lesson.explanation || "");
          doc.moveDown(1);
        });
      } else {
        doc.text("No content available");
        doc.moveDown();
      }
    });
    doc.end();
  });
};

module.exports = generatePdf;