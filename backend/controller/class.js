const asynchandler = require("express-async-handler");
const { Class } = require("../model/class");
const { createClassFolder } = require("./classService");

const getAllClasses = asynchandler(async (req, res) => {
  // console.log(req);
  const classes = await Class.find({}).populate("subjects");

  if (!classes || classes.length == 0)
    return res.status(200).json({ message: "classes Are not allocated" });
  else {
    return res.status(200).json({
      success: true,
      classes,
    });
  }
});

const createNewClass = asynchandler(async (req, res) => {
  try {
    const { className, classCode, classTeacher } = req.body;
    console.log(req.body);
    if (!className || !classCode || !classTeacher) {
      throw new Error("Incomplete data provided for class creation.");
    }

    const existingClass = await Class.findOne({ className, classCode });
    if (existingClass) {
      throw new Error("Class with the same name and code already exists.");
    }

    const newClass = new Class({ className, classCode, classTeacher });
    await newClass.save();

    const folderId = await createClassFolder(
      className,
      classCode,
      process.env.FOLDER_ID
    );
    newClass.folderId = folderId;
    await newClass.save();

    return res.status(200).json({
      data: newClass,
      message: "Class created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

const renameClassName = asynchandler(async (req, res) => {
  try {
    const { classId, newName } = req.body;

    if (!classId) {
      throw new Error("Subject is Not Found");
    }

    if (!newName || newName.length === 0) {
      throw new Error("Pelase Enter the Subject Name");
    }

    const updatedSubject = await Class.findByIdAndUpdate(
      classId,
      { className: newName },
      { new: true }
    ).populate("subjects");

    return res.status(200).json({
      data: updatedSubject,
      message: "Class updated successfully",
      success: true,
    });
  } catch (error) {
    let err = error || "Internal Server Error";
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

const deleteClass = asynchandler(async (req, res) => {
  try {
    const classId = req.params.id;

    // Assuming Class.deleteOne() triggers pre-delete hooks defined in the schema

    const exitsClass = await Class.findOne({ _id: "65b38dba38d3bed6c62bebaf" });
    console.log(classId);
    if (!exitsClass) {
      throw new Error("Class Not Found");
    }

    await Class.deleteOne({ _id: classId });
    console.log("Data is Deleted");
    res
      .status(204)
      .json({
        status: true,

        message: "class is Deleted",
      })
      .end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  getAllClasses,
  renameClassName,
  createNewClass,
  deleteClass,
};
