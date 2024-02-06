const z = require("zod");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { teacherData, StudentData } = require("../model/user.js");
const bcrypt = require("bcrypt");

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  password: z.string(),
  degree: z.string(),
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
  degree: z.string().optional(),
});

//Register Mail Of the Students

const register = asyncHandler(async (req, res) => {
  try {
    const { success, data } = signupSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(422)
        .json({ success: false, message: "Invalid input data" });
    }

    const existingUser = await teacherData.findOne({ email: data.email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already taken" });
    }

    const otherMailExist = await StudentData.findOne({ email: data.email });
    if (otherMailExist) {
      throw new Error("Email already taken");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await teacherData.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      degree: data.degree,
      isVerify: data.isVerify,
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    sendVerifyMail(data.firstName, data.email, userId);
    return res.status(200).json({
      success: true,
      message: "User created successfully. Check your email for verification.",
      token: token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Sned Verification

const sendVerifyMail = asyncHandler(async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: `
      <h2>Hii ${name}</h2>
      <p>Click the following link to verify your email:</p>
      <a href="http://192.168.59.242:4000/api/v1/user/teacher/verify?id=${user_id}">Verify Email</a>
    `,
      text: "hello",
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending verification email:", error.message);
      }
      console.log("Verification email sent:", info);
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Verified Mail

const verifyMail = asyncHandler(async (req, res) => {
  try {
    const updatedInfo = await teacherData.updateOne(
      { _id: req.query.id },
      {
        $set: {
          isVerify: true,
        },
      }
    );

    if (updatedInfo.nModified === 1) {
      console.log("Email Verification Is Completed !!");
      res.status(204).send();
    } else {
      console.log("User not found or already verified.");
      res.status(404).send("User not found or already verified.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Get Login Studnet

const login = asyncHandler(async (req, res) => {
  try {
    const { success, data } = signinSchema.safeParse(req.body);
  
    if (!success) {
      return res
        .status(422)
        .json({ success: false, message: "Invalid input data" });
    }
    const user = await teacherData.findOne({
      email: data.email
    });
    console.log("user : ",user)
 
    if(!user){
      throw new Error("user doesn't exist")
    }

    if (!user.isVerify) {
      return res
        .status(401)
        .json({ success: false, message: "Please verify your email before logging in" });
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        message: "I am Teacher",
        token,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//Update Student

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { success, data } = updateSchema.safeParse(req.body);
    if (!success) {
      return res
        .status(422)
        .json({ success: false, message: "Invalid input data" });
    }

    await teacherData.updateOne({ _id: req.userId }, { $set: data });

    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//Get All Users

const getUsers = asyncHandler(async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await teacherData.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
        { email: { $regex: filter, $options: "i" } },
      ],
    });

    res.status(200).json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        role: user.role,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = { register, login, updateUser, getUsers, verifyMail };
