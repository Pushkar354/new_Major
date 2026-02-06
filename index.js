const express=require("express");
const app=express();
const dotenv=require('dotenv');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user_router=require("./Routes/user_routes.js");


app.listen(3000,()=>{
    console.log("listening on port 3000");
})
app.use("/user",user_router);
app.get("/",(req,res)=>{
    console.log("hi");
})


dotenv.config();