const { Subject, Class, Unit } = require("../model/class");
const asyncHandler = require("express-async-handler");
const z = require("zod");

const subjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(3),
  contents: z.array(z.string()).optional(),
});

const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find({}).populate("contents");
    if (!units || units === 0) {
      res.status(200).json({
        success: true,
        units,
        message: "Empty Subject",
      });
    }

    res.status(200).json({
      success: true,
      data: units,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const createNewUnit = asyncHandler(async (req, res) => {
  try {
    const { success, data } = subjectSchema.safeParse(req.body);

    if (!success) {
      throw new Error("Enter the Valid Data");
    }

    if (!data) {
      throw new Error("The Data field is empty");
    }

    const subjectId = req.body.subjectId;

    if (!subjectId) {
      throw new Error("Subject ID is required");
    }

    // Create the subject and associate it with the specified class
    const unit = await Unit.create({
      title: data.title,
      description: data.description,
    });

    const subject = await Subject.findOne({ _id: subjectId });
    subject.units.push(unit._id);
    await subject.save();

    res.status(200).json({
      success: true,
      message: "unit has been created",
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.req.body.title
    ) {
      // Duplicate subjectName error
      return res.status(400).json({
        success: false,
        error: "Duplicate unitName. Please choose a different name.",
      });
    }

    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

const deleteUnits = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);

    const deletedUnit = await Unit.findByIdAndDelete(id);

    if (!deletedUnit) {
      throw new Error("Unit not found");
    }

    console.log("Deleted!");

    await Subject.updateMany(
      { units: deletedUnit._id },
      { $pull: { units: deletedUnit._id } }
    );

    res.status(200).json({
      success: true,
      message: "Unit has been Deleted",
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      error:error.message,
    });
  }
});

const updateSchema = z.object({
  unitId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
});
const updateUnits = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { success, data } = updateSchema.safeParse(req.body);

    if (!success) {
      throw new Error("Enter the Valid Deatils");
    }
    if (!data.unitId) {
      throw new Error("Unit is Not Found");
    }

    await Unit.findByIdAndUpdate(
      data.unitId,
      {
        title: data.title,
        description: data.description,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Unit has been Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

module.exports = {
  getAllUnits,
  deleteUnits,
  updateUnits,
  createNewUnit,
};
