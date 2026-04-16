const { Syllabus_model } = require("../Database/Schema/user");
const Pdf = require("pdfkit");
const generatePdf = async(email,topic,modules)=>{
 return new Promise((resolve, reject) => {
    try {
      const doc = new Pdf();
      const chunks = [];

      doc.on("data", chunk => chunks.push(chunk));

      doc.on("end", async () => {
        try {
          const pdf = Buffer.concat(chunks);

          const Syllabus = new Syllabus_model({
            email: email,
            topic: topic,
            data: pdf
          });

          await Syllabus.save();

          resolve(Syllabus); // ✅ THIS sends data back
        } catch (err) {
          reject(err);
        }
      });

      doc.on("error", err => reject(err));

      // PDF content
      doc.fontSize(30).text(topic, { align: 'center' });
      doc.moveDown();

      modules.forEach(m => {
        doc.fontSize(22).text(m.title, { align: 'left' });
        doc.moveDown();
        doc.fontSize(16).text(m.content, { align: 'left' });
        doc.moveDown();
      });

      doc.end();

    } catch (err) {
      throw new Error(err.message);
      reject(err);
    }
  });
};
module.exports=generatePdf;
