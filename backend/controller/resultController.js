const { StudentData } = require("../model/user");

const asyncHandler = require("express-async-handler");

const searchStudents = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await StudentData.find(keyword);

    console.log(users);

    res.send(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = { searchStudents };
