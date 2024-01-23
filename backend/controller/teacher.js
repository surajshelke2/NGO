const z = require("zod");
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { teacherData } = require("../model/User");


const signupSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  middleName:z.string(),
  password: z.string(),
  degree :z.string()
});
const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});
const updateSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  degree:z.string().optional()
});


const register = asyncHandler(async (req, res) => {
  try {
    const { success, data } = signupSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    const existingUser = await teacherData.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already taken");
    }

    const user = await teacherData.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      degree:data.degree
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

    const user = await teacherData.findOne({
      email: data.email,
      password: data.password,
    });

   
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.json({
        success: true,
        message: "I am Teacher",
        token,
      });
    }else {
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

    await teacherData.updateOne({ _id: req.userId }, { $set: data });

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
    const users = await teacherData.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
        { rollNo: { $regex: filter } },
      ],
    });

    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        rollNo: user.rollNo,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { register, login, updateUser, getUsers };




module.exports={register}





