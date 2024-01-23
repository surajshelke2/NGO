const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
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
    index: { unique: true }, //Makes the field indexed for faster search
    trim: true,
  },
  role:{

    type:String,
    default:'Student',
    required:true

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
    unique: true,
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
},{
  timestamps: true,
});

const StudentData = mongoose.model("studentData", StudentSchema);

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
  role:{

    type:String,
    default:'Teacher',
    required:true

  },
  degree: {
    type: String,
    require: true,
    unique: true,
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
    unique: true,
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
});

const teacherData = mongoose.model("teacherData", teacherSchema);

module.exports = { StudentData, teacherData };
