const { Course } = require("../models/courseModel");
const {User} = require("../models/userModel")

const createCourse = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ success: false, message: "all fields required" });
    }

    const { id } = req.user;
    const newCourse = new Course({
      title: title,
      description,
      category: category,
      instructor: id,
    });

    await User.updateOne({_id:id},{$push:{courses_managed:newCourse._id}})

    await newCourse.save();
    res.status(201).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });

  } catch (error) {
    console.error("ERROR!:" + error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const allCourses = await Course.find({});
    res
      .status(200)
      .json({ success: true, message: "successfully fetched courses",data:allCourses });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};

const getMyCourses = async (req, res, next) => {
  try {
    
    const { id } = req.user
    if (!id) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }

    const myCourses = await Course.find({ instructor: id })
    res.status(200).json({success:true,message:"fetched courses by the instructor",data:myCourses})

  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
}

const getCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.courseId
    const courses = await Course.findById( courseId )
    res.status(200).json({success:true,message:"fetched course by id", data:courses})
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
}

const deleteCourse = async (req, res, next) => {
  try {
    
    const { courseId } = req.params
    
    const deletedCourse = await Course.findByIdAndDelete(courseId)

    if (!deletedCourse) {
      return res.status(404).json({success:false,message:"course not found"})
    }
    res.status(204).send()

  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
}

module.exports = { createCourse, getAllCourses, getMyCourses, getCourseById,deleteCourse };
