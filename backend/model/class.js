const mongoose = require("mongoose");
const { createClassFolder } = require("../controller/classService");


const classSchema = mongoose.Schema(
  {
    className: {
      type: String,
      required:true
    },
    classCode : {
      type: String,
      required : true
    },
    classTeacher : {
      type : String,
      required : true
    },
    folderId: {
      type: String,
      
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  },
  {
    timestamps: true,
  }
);

const subjectSchema = mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "Subject name is required"],
  },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
});

const unitSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  contents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
});

const contentSchema = new mongoose.Schema({
  contentTitle: { type: String, required: true },
  files:[{type:mongoose.Schema.Types.ObjectId,ref:"File"}]

});

const resultSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    score: { type: Number, required: true },
    remarks: { type: String },
  },
  { timestamps: true }
);



classSchema.pre("save", async function (next) {
  try {
    const folderId =await createClassFolder(this.className, this.classCode);
    this.folderId= folderId;
    
   
    next();
  } catch (error) {
    console.error("Error creating class folder:", error);
    next(error);
  }
});






const Result = mongoose.model("Result", resultSchema);
const Content = mongoose.model("Content", contentSchema);
const Subject = mongoose.model("Subject", subjectSchema);
const Unit = mongoose.model("Unit", unitSchema);
const Class = mongoose.model("Class", classSchema);
module.exports = { Class, Result, Subject, Unit, Content };
