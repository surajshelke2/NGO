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







module.exports={register}





