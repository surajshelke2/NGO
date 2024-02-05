const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const  studentRouter = require('./router/user')
const teacherRouter = require("./router/teacher");
const classRouter = require('./router/class')
const subjectRouter = require('./router/subject')
const unitRouter = require("./router/unit");
require("dotenv").config();
const connectDB = require("./databases/data");
const bodyParser = require("body-parser");
const app = express();
const fileController = require('./controller/fileController');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(express.json())



const multer=require('multer');

var storage = multer.diskStorage({

destination:(req,file,cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype==='image/png') {

        cb(null, 'uploads/images')
    } 
    else if (file.mimetype === 'application/pdf') {
        cb(null, 'uploads/pdfs')
    } 
    else {
        console.log(file.mimetype)
        cb({ error: 'Mime type not supported' })
    }
}})


const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res) {
  if (!req.file) {
   
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send('File uploaded successfully.');
});

app.post('/api/v1/class/subject/unit/content/file/upload/:classId', upload.single('file'), fileController.upload);


// Routes

app.use("/api/v1/user/student", studentRouter);
app.use("/api/v1/user/teacher", teacherRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/class/subject",subjectRouter)
app.use("/api/v1/class/subject/unit",unitRouter)
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
(async()=>{
  await connectDB();
})().then(()=>{
  app.listen(PORT,'192.168.59.242',() => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err)=>{
  console.log("server error")
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});