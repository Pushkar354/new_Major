const pdf=require('pdf-parse');
const extract_text=async(modules)=>{

    const data=await pdf(modules);
    return data.text;
}
const Split_into_chunks=(text,size)=>{
const chunks=[];
for(let i=0;i<text.length;i+=size){
    chunks.push(text.slice(i,i+size));
}
return chunks;
}
module.exports={extract_text,Split_into_chunks}