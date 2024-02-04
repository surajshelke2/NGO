const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },

  subjects: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      marksObtained: {
        type: Number,
        required: true,
      },
      totalMarks: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
