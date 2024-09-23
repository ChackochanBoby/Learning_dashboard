const { User } = require("../models/userModel");
const { Enrollment } = require("../models/enrollmentModel")
const {Course} = require ("../models/courseModel")

const getEnrolledCourses = async (req, res, next) => {
  try {
    const { id } = req.user
    const enrolledCourses = await Enrollment.find({ learner: id }).populate({ path: "course", select: "_id title image instructor", populate: { path: "instructor", select: "name" } })
    const courseDetails = enrolledCourses.map((courses) => {
      return {title:courses.course.title,instructor:courses.course.instructor.name,id:courses.course._id,image:courses.course.image}
    })
    res.status(200).json({success:true,message:"fetched enrolled courses",data:courseDetails})
  } catch (error) {
    next(error)
  }
};

const enroll = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const { id } = req.user
    const course = await Course.findById(courseId).exec()
    if (id == course.instructor) {
      return res.status(400).json({success:false,message:"instructor cant enroll in the course"})
    }
    if (!courseId) {
     return res.status(400).json({success:false,message:"course id missing"})
    }
    const alreadyEnrolled = await Enrollment.findOne({ learner: id, course: courseId })
    if (alreadyEnrolled) {
      return res.status(400).json({success:true,message:"already enrolled"})
    }
    const newEnrollment = new Enrollment({
      course:courseId,learner:id
    })
    await newEnrollment.save()
    res.status(201).json({success:true,message:"user enrolled"})
  } catch (error) {
    next(error)
  }
};

const checkEnrollment = async (req, res,next) => {
try {
  const { id } = req.user
  const { courseId } = req.params
  const enrollment = await Enrollment.findOne({ learner: id, course: courseId }).exec()
  if (enrollment) {
    return res.json({success:true,isEnrolled:true})
  }
  else {
    return res.json({success:true,isEnrolled:false})
  }
} catch (error) {
  next(error)
}
}

module.exports={ getEnrolledCourses,enroll,checkEnrollment }