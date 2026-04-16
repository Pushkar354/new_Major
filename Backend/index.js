const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { Connect_todb } = require("./Database/Schema/user.js");
const cors = require("cors");

dotenv.config();

// ✅ CORS FIRST
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const user_router = require("./Routes/user_routes.js");
app.use("/user", user_router);

// DB connect
Connect_todb();

// Test route
app.get("/", (req, res) => {
  res.send("Backend working"); // MUST send response
});

// Server
app.listen(3000, () => {
  console.log("listening on port 3000");
});