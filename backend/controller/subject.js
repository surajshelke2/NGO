const { Subject, Class } = require("../model/class");
const asyncHandler = require("express-async-handler");
const z = require("zod");


const subjectSchema = z.object({
  subjectName: z.string().min(1),
  units: z.array(z.string()).optional(),
});

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({}).populate("units");
    if (!subjects || subjects === 0) {
      res.status(200).json({
        success: true,
        subjects,
        message:"Empty Subject"
      });
    }

    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const createNewSubject = asyncHandler(async (req, res) => {
  try {
    // const { success, data } = subjectSchema.safeParse(req.body);
    const data = req.body;
    // if (!success) {
    //   throw new Error("Enter the Valid Data");
    // }

    // if (!data.subjectName) {
    //   throw new Error("The subjectName field is empty");
    // }
    console.log(data);

    const classData = await Class.findOne({className:data.className,classCode:data.classId});
    console.log(classData);
    const classID = classData._id;
    if (!classID) {
      throw new Error("Class ID is required");
    }

    // Create the subject and associate it with the specified class
    const subject = await Subject.create({
      subjectName: data.subject,
      classID: classID, 
    });

    const class1 = await Class.findOne({_id:classID});
    class1.subjects.push(subject._id);
    await class1.save();

    res.status(200).json({
      success: true,
      message: "Subject has been created",
      data: subject,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.subjectName) {
      // Duplicate subjectName error
      return res.status(400).json({
        success: false,
        error: "Duplicate subjectName. Please choose a different name.",
      });
    }

    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});


const deleteSubject = asyncHandler(async (req, res) => {
  try {
    const {subjectId} = req.query;

    const deleteSub =await Subject.findByIdAndDelete(subjectId);

    if(!deleteSub){

      throw new Error("Subject not Found")
    }

    await Class.updateMany(
      {subjects:deleteSub._id},
      {$pull:{subjects:deleteSub._id}}
    )


    res.status(200).json({
      success: true,
      message: "Subject has been Deleted",
    });
  } catch (error) {
    let err = error || "Internal Server Error";
    res.status(500).json({
      success: false,
      err,
    });
  }
});

const updateSubjectName = asyncHandler(async (req, res) => {
  try {
    const { subjectId, NewSubjectName } = req.body;

    if (!subjectId) {
      throw new Error("Subject is Not Found");
    }

    if (!NewSubjectName) {
      throw new Error("Pelase Enter the Subject Name");
    }

    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      {
        subjectName: NewSubjectName,
      },
      {
        new: true,
      }
    ).populate("units");

    res.status(200).json({
      success: true,
      message: "Subject has been Updated",
      data: updatedSubject,
    });
  } catch (error) {
    let err = error || "Internal Server Error";
    res.status(500).json({
      success: false,
      err,
    });
  }
});

module.exports = {
  getAllSubjects,
  updateSubjectName,
  deleteSubject,
  createNewSubject,
};
