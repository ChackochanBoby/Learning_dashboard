const { Course } = require("../models/courseModel");
const { User } = require("../models/userModel");
const { Lesson } = require("../models/lesson");

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

    await User.updateOne(
      { _id: id },
      { $push: { courses_managed: newCourse._id } }
    );

    await newCourse.save();
    res.status(201).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "instructor",
      select: "name",
    });
    const courseData = courses.map((course) => {
      return {
        title: course.title,
        id: course._id,
        instructor: course.instructor.name,
        image: course.image,
        isPaid: course.isPaid,
        price: course.price,
        category: course.category,
      };
    });
    res
      .status(200)
      .json({
        success: true,
        message: "successfully fetched courses",
        data: courseData,
      });
  } catch (error) {
    next(error);
  }
};

const editCourse = async (req, res, next) => {
  const { title, description, category, isPaid, price } = req.body;
  const courseId = req.params.courseId; // Extract courseId from the URL params

  try {
    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required fields.",
      });
    }

    // Find the course by ID and update it
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title,
        description,
        category,
        isPaid, // Include isPaid
        price: isPaid ? price : 0, // If paid, set the price; otherwise, set it to 0
      },
      { new: true } // Option to return the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully.",
    });
  } catch (error) {
    next(error)
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const courses = await Course.findById(courseId).populate({
      path: "modules",
      select: "_id title description lessons",
      populate: { path: "lessons", select: "_id title" },
    });
    res
      .status(200)
      .json({ success: true, message: "fetched course by id", data: courses });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "course not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const publishCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    // Find the course by its ID and populate its modules
    const course = await Course.findById(courseId).populate("modules");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the course has at least one module
    if (course.modules.length === 0) {
      return res
        .status(400)
        .json({ message: "Course must contain at least one module" });
    }

    // Check if any module contains at least one lesson in its 'lessons' field
    const hasLessons = course.modules.some(
      (module) => module.lessons && module.lessons.length > 0
    );

    if (!hasLessons) {
      return res
        .status(400)
        .json({ message: "Each module must contain at least one lesson" });
    }

    course.isPublished = true;
    await course.save();

    res.status(200).json({ message: "Course published successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  editCourse,
  getCourseById,
  deleteCourse,
  publishCourse,
};
