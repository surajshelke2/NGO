const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const multer = require("multer");
const fileController = require("./controller/fileController");
const connectDB = require("./databases/data");
const fileRouter = require("./router/fileRouter");
const resultRouter = require("./router/resultRouter");
require("dotenv").config();
const { authMiddleware } = require("./middleware/auth");
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";

    if (file.mimetype.startsWith("image")) {
      uploadPath += "images/";
    } else if (file.mimetype === "application/pdf") {
      uploadPath += "pdfs/";
    } else {
      return cb({ error: "Mime type not supported" });
    }

    cb(null, uploadPath);
  },
});

const upload = multer({ storage });

// Routes
app.post(
  "/api/v1/class/subject/unit/content/file/upload/:unitId",
  upload.single("file"),
  authMiddleware,
  fileController.upload
);

// Define routes with Router
const studentRouter = require("./router/user");
const teacherRouter = require("./router/teacher");
const classRouter = require("./router/class");
const subjectRouter = require("./router/subject");
const unitRouter = require("./router/unit");


app.use("/api/v1/user/student", studentRouter);
app.use("/api/v1/user/teacher", teacherRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/class/subject", subjectRouter);
app.use("/api/v1/class/subject/unit", unitRouter);
app.use("/api/v1/class/subject/unit/content/file", fileRouter);
app.use("/api/v1/class/result", resultRouter);

app.get("/api/v1", (req, res) => {
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
(async () => {
  await connectDB();
})()
  .then(() => {
    app.listen(3000, "localhost", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("server error");
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
