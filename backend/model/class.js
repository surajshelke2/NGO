const mongoose = require("mongoose");
const { createClassFolder } = require("../controller/classService");

const classSchema = mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    classCode: {
      type: String,
      required: true,
    },
    classTeacher: {
      type: String,
      required: true,
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
  folderId: {
    type: String,
  },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
});

const unitSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  folderId: {
    type: String,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);
const Unit = mongoose.model("Unit", unitSchema);
const Class = mongoose.model("Class", classSchema);
module.exports = { Class, Subject, Unit };
