const z = require("zod");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { StudentData, teacherData } = require("../model/user.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const sendSuccessResponse = (res, message, data = null) => {
  res.status(200).json({
    success: true,
    message: message,
    data: data,
  });
};

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

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
    sendSuccessResponse(res, "User created successfully", { token: token });
  } catch (error) {
    console.error("Error in register:", error.message);
    sendErrorResponse(res, 400, error.message);
  }
});

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
      <div class="container">
      <h1>Welcome to Educative!</h1>
      <h2>Email Verification</h2>
      <p>We're excited to have you onboard. To complete your registration and unlock all the benefits of Educative, please click the button below to verify your email address:</p>
      <a href="http://localhost:4000/api/v1/user/student/verify?id=${user_id}" class="btn">Verify Email</a>
      <p>If you did not request this verification, please ignore this email.</p>
      </div>
    `,
      text: "hello",
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw new Error("Failed to send verification email");
  }
});

const verifyMail = asyncHandler(async (req, res) => {
  try {
    const updatedInfo = await StudentData.updateOne(
      { _id: req.query.id },
      { $set: { isVerify: true } }
    );
    const type = req.originalUrl.includes("student") ? "student" : "teacher";
    sendSuccessResponse(
      res,
      "Thank you for Verifying Email!",
      `<h1>Thank You for Verifying Email!</h1><a href="http://localhost:5173/user/register/?role=${type}">click here to redirect to website!</a>`
    );
  } catch (error) {
    console.error("Error in verifyMail:", error.message);
    sendErrorResponse(res, 500, "Failed to verify email");
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { success, data } = signinSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    const user = await StudentData.findOne({ email: data.email });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    if (!user.isVerify) {
      throw new Error("Please verify your email before logging in");
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      sendSuccessResponse(res, "Logged in successfully", { token: token });
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error("Error in login:", error.message);
    sendErrorResponse(res, 400, error.message);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { success, data } = updateSchema.safeParse(req.body);
    if (!success) {
      throw new Error("Invalid input data");
    }

    await StudentData.updateOne({ _id: req.userId }, { $set: data });

    sendSuccessResponse(res, "Updated successfully");
  } catch (error) {
    console.error("Error in updateUser:", error.message);
    sendErrorResponse(res, 400, error.message);
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

    const formattedUsers = users.map((user) => ({
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      rollNo: user.rollNo,
      role: user.role,
      _id: user._id,
    }));

    sendSuccessResponse(res, "Users retrieved successfully", { users: formattedUsers });
  } catch (error) {
    console.error("Error in getUsers:", error.message);
    sendErrorResponse(res, 500, "Internal server error");
  }
});

module.exports = { register, login, updateUser, getUsers, verifyMail };
