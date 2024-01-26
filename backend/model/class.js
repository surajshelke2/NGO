const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    className: {
      type: String,
      required: [true, "Please provide a Class Name"],
      trim: true,
      unique: true,
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
  },
  classID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class"
  }
  ,
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

// triggers

// Define pre-delete hook for class
classSchema.pre("deleteOne", { document: true }, async function (next) {
  const classId = this._conditions._id;

  try {
    // Delete associated subjects
    await mongoose.model("Subject").deleteMany({ class: classId });
    next();
  } catch (error) {
    next(error);
  }
});

// Define pre-delete hook for subject
subjectSchema.pre("deleteOne", async function (next) {
  const subjectId = this._conditions._id;

  try {
    // Delete associated units
    await mongoose.model("Unit").deleteMany({ subject: subjectId });
    next();
  } catch (error) {
    next(error);
  }
});

// Define pre-delete hook for unit
unitSchema.pre("deleteOne", async function (next) {
  const unitId = this._conditions._id;

  try {
    // Delete associated contents
    await mongoose.model("Content").deleteMany({ unit: unitId });
    next();
  } catch (error) {
    next(error);
  }
});

const Result = mongoose.model("Result", resultSchema);
const Content = mongoose.model("Content", contentSchema);
const Subject = mongoose.model("Subject", subjectSchema);
const Unit = mongoose.model("Unit", unitSchema);
const Class = mongoose.model("Class", classSchema);
module.exports = { Class, Result, Subject, Unit, Content };
