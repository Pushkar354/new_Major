const Pdf = require("pdfkit");

const GeneratePdf_Controller = async (req,res)=>{

const {topic,hours,modules} = req.body;

if(!topic || !hours || !modules || !Array.isArray(modules)){
   return res.status(400).send("invalid input");
}

const generatePdf = ()=>{
return new Promise((resolve,reject)=>{

try{

 const doc = new Pdf();
 const chunks = [];

 doc.on("data",chunk=>chunks.push(chunk));
 doc.on("end",()=>resolve(Buffer.concat(chunks)));

 doc.fontSize(30).text(topic,{align:'center'});
 doc.moveDown();

 modules.forEach(m=>{
    doc.fontSize(22).text(m.title,{align:'left'});
    doc.moveDown();
    doc.fontSize(18).text(m.content,{align:'left'});
    doc.moveDown();
 });

 doc.end();

}catch(err){
 reject(err);
}

})
}

try{

 const pdf = await generatePdf();

 res.setHeader('Content-Type','application/pdf');
 res.send(pdf);

}catch(err){
 res.status(500).send("PDF generation failed");
}

}

module.exports = GeneratePdf_Controller;
