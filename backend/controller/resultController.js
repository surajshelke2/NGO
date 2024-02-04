
const Result = require("../model/resultModel");
const { StudentData } = require("../model/user");
const asyncHandler = require("express-async-handler");

const searchStudents = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.query
      ? {
          $or: [
            { name: { $regex: req.query.query, $options: "i" } },
            { email: { $regex: req.query.query, $options: "i" } },
          ],
        }
      : {};

    const users = await StudentData.find(keyword);

    console.log(users);

    res.send(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

const getStudentById = async (req, res) => {
  const studentId = req.query.query;

  if (!studentId) {
    return res.status(400).json({
      status: "fail",
      message: "Student Id Not Found",
    });
  }

  try {
    const student = await StudentData.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student Not Found",
        success: false,
      });
    }

    res.status(200).json({
      status: "success",
      student,
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const SubmitResult = async (req, res) => {
  try {
    const { student, subjects } = req.body;

    if (!student || !subjects) {
      return res.status(400).json({
        status: "Fail",
        message: "No Data Provided",
      });
    }

    

    let existingResult = await Result.findOne({ student: student._id });
    
    
    if (!existingResult) {
      existingResult = await Result.create({
        student: student._id,
        subjects: subjects,
      });

      console

      await StudentData.findByIdAndUpdate(student._id, {
        $set: { result: existingResult._id },
      });
    } else {
      existingResult.subjects.push(...subjects);
      existingResult = await existingResult.save();
    }

    console.log(existingResult);
    res.status(200).json({
      status: "Success",
      message: "Subjects added to result successfully",
      data: existingResult,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { searchStudents, getStudentById, SubmitResult };
