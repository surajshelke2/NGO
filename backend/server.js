const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const  studentRouter = require('./router/user')
const teacherRouter = require("./router/teacher");

require("dotenv").config();
const connectDB = require("./databases/data");
const bodyParser = require("body-parser");
const { verifyMail } = require("./controller/teacher");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(express.json())

// Routes

app.use("/api/v1/user/student", studentRouter);
app.use("/api/v1/user/teacher", teacherRouter);
app.use("/api/v1", (req, res) => {
  console.log("App is running fine!!");
  res.json({ message: "App is running fine...." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
;(async ()=>{
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
})();
