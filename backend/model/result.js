const mongoose = require("mongoose");
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  subjects: [{
    subjectName: {
      type: String,
      required: true
    },
    marksObtained: {
      type: Number,
      required: true
    },
    totalMarks: {
      type: Number,
      required: true
    }
  }]
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
