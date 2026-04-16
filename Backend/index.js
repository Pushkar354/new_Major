const express=require("express");
const app=express();
const dotenv=require('dotenv');
const { Connect_todb } = require("./Database/Schema/user.js");


dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user_router=require("./Routes/user_routes.js");
Connect_todb();

app.listen(3000,()=>{
    console.log("listening on port 3000");
})
app.use("/user",user_router);
app.get("/",(req,res)=>{
    console.log("hi");
})

