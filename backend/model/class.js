const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    className: {
      type: Number,
      required: [true, "Please provide a Class Name"],
    },
    classCode : {
      type: String,
      required : true
    },
    classTeacher : {
      type : String,
      required : true
    },
    classCode:{
      type:Number,
      required:[true,"Please Proivde the class Number"],
      unique:true
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
    unique:true
  } ,
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
});

const unitSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  contents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
});

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileURL: { type: String },

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


const Result = mongoose.model("Result", resultSchema);
const Content = mongoose.model("Content", contentSchema);
const Subject = mongoose.model("Subject", subjectSchema);
const Unit = mongoose.model("Unit", unitSchema);
const Class = mongoose.model("Class", classSchema);
module.exports = { Class, Result, Subject, Unit, Content };
