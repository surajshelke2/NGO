const z = require("zod");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { StudentData, teacherData } = require("../model/User");

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  password: z.string(),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const updateSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
});

let studentCounter = 1; // Initial counter value

function generateRollNumber() {
  const rollNumber = `RT${String(studentCounter).padStart(4, "0")}`;
  studentCounter += 1;
  return rollNumber;
}

const register = asyncHandler(async (req, res) => {
  try {
    const { success, data } = signupSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    const existingUser = await StudentData.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already taken");
    }
    const roll_No = generateRollNumber();
    const user = await StudentData.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      rollNo: roll_No,
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.json({
      message: "User created successfully",

      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { success, data } = signinSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    const user = await StudentData.findOne({
      email: data.email,
      password: data.password,
    });

  
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.json({
        success: true,
        message: "I am Student",
        token,
      });
    }  else {
      throw new Error("Error while logging in");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { success, data } = updateSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    await StudentData.updateOne({ _id: req.userId }, { $set: data });

    res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await StudentData.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
        { rollNo: { $regex: filter } },
      ],
    });

    res.json({
      users: users.map((user) => ({
        email: user.email,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName:user.lastName,
        rollNo: user.rollNo,
        role :user.role,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { register, login, updateUser, getUsers };
