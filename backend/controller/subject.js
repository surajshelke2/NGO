const { Subject, Class } = require("../model/class");
const asyncHandler = require("express-async-handler");
const z = require("zod");
const { createClassFolder, createOtherFolder } = require("./classService");

const subjectSchema = z.object({
  subjectName: z.string().min(1),
  units: z.array(z.string()).optional(),
});

const getAllSubjects = async (req, res) => {
  try {
    const response = await Class.findOne({ _id: req.params.classid }).populate(
      "subjects"
    );
    const subjects = response.subjects;
    console.log(subjects);
    if (!subjects || subjects === 0) {
      res.status(200).json({
        success: true,
        data: [],
        message: "Empty Subject",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: subjects,
    });
    return;
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
    return;
  }
};

const createNewSubject = asyncHandler(async (req, res) => {
  try {
    // const { success, data } = subjectSchema.safeParse(req.body);
    const data = req.body;

    // console.log(data);

    // const classData = await Class.findOne({className:data.className,classCode:data.classId});
    // console.log(classData);
    // const classID = classData._id;
    const classID = req.params.classid;
    if (!classID) {
      res.status(401).json({
        success: false,
        message: "Class doesn't exists!",
      });
      return;
    }

    // Create the subject and associate it with the specified class
    const exists = await Class.findById(classID);
    console.log("Class Folder Id :", exists);
    const folderId = await createOtherFolder(data.subject, "", exists.folderId);

    if (!folderId) {
      return res.status(400).json({
        message: "Not able to find the parent FolderId",
      });
    }
    const subject = await Subject.create({
      subjectName: data.subject,
      classID: classID,
      folderId: folderId,
    });

    const class1 = await Class.findOne({ _id: classID });
    class1.subjects.push(subject._id);
    await class1.save();

    res.status(200).json({
      success: true,
      message: "Subject has been created",
      data: subject,
    });
    return;
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.subjectName
    ) {
      // Duplicate subjectName error
      return res.status(400).json({
        success: false,
        message: "Duplicate subjectName. Please choose a different name.",
      });
    }

    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});

const deleteSubject = asyncHandler(async (req, res) => {
  try {
    const { subjectId } = req.query;

    const deleteSub = await Subject.findByIdAndDelete(subjectId);

    if (!deleteSub) {
      throw new Error("Subject not Found");
    }

    await Class.updateMany(
      { subjects: deleteSub._id },
      { $pull: { subjects: deleteSub._id } }
    );

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
