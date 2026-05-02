const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { Connect_todb } = require("./Database/Schema/user.js");
const cors = require("cors");

dotenv.config();


app.use(cors({
  origin: "https://deft-syrniki-f0af94.netlify.app",
  credentials: true
}));

Connect_todb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const user_router = require("./Routes/user_routes.js");
app.use("/user", user_router);




app.get("/", (req, res) => {
  res.send("Backend working"); // MUST send response
});


app.listen(process.env.PORT||3000, () => {
  console.log("listening on port");
});
