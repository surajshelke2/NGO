const z = require("zod");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { StudentData, teacherData } = require("../model/user.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");


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

    //check in the other models

    const otherMailExist = await teacherData.findOne({ email: data.email });
    if (otherMailExist) {
      throw new Error("Email already taken");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await StudentData.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    sendVerifyMail(data.firstName, data.email, userId);
    res.json({
      message: "User created successfully",

      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      <a href="http://localhost:4000/api/v1/user/student/verify?id=${user_id}">Verify Email</a>
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
    const updatedInfo = await StudentData.updateOne(
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

const login = asyncHandler(async (req, res) => {
  try {
    const { success, data } = signinSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    if(!user){
      
    }
    const user = await StudentData.findOne({
      email: data.email,
     
    });

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

module.exports = { register, login, updateUser, getUsers,verifyMail };
