const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    rollNo: {
      type: String,
      required: [true, "Please provide your Roll No."],
      index: { unique: true },
      trim: true,
    },
    role: {
      type: String,
      default: "Student",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },

    middleName: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },

    lastName: {
      type: String,
      require: true,
      trim: true,
      maxLength: 50,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const StudentData = mongoose.model("student", StudentSchema);

const teacherSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: 30,
    minLength: 3,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    default: "Teacher",
    required: true,
  },
  degree: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    maxLength: 30,
    minLength: 3,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  middleName: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    maxLength: 30,
    minLength: 3,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
    maxLength: 50,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
},{
  timestamps:true
});

const teacherData = mongoose.model("teacher", teacherSchema);

module.exports = { StudentData, teacherData };
