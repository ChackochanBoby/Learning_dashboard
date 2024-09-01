const { Course } = require("../models/courseModel");

const createCourse = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: "all fields required" });
      }
      
    const { id } = req.user;
    const newCourse = new Course({
      title: title,
      description,
      category: category,
      instructor: id,
    });
    await newCourse.save();
    res.status(201).json({
        success: true,
        message: "course created successfully",
        data: newCourse,
      });
  } catch (error) {
    console.error("ERROR!:" + error);
    res
      .status(error.statusCode || 500).json({
        success: false,
        message: error.message || "internal server error",
      });
  }
};


module.exports={createCourse}