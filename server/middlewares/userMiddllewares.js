const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const {Course} = require("../models/courseModel");
const { CourseModule } = require("../models/moduleModel");

const userAuth = async (req, res, next) => {
  try {
    
    const { Token } = req.cookies
    if (!Token) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    const decoded = jwt.verify(Token, process.env.TOKEN_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    req.user=decoded
    next()

  } catch (error) {
    next(error)
  }
  
};

const instructorAuth = async (req, res, next) => {
  try {
      
      const { role } = req.user  
      const isInstructor = role.includes("instructor")
      if (!isInstructor) {
        return res.status(401).json({success:false,message:"unauthorized access"})
      }
      next()

    } catch (error) {
      next(error)
    }
}


const learnerAuth = async (req, res, next) => {
  try {
      const { role } = req.user  
      const isLearner = role.includes("learner")
      if (!isLearner) {
        return res.status(401).json({success:false,message:"unauthorized access"})
      }
      next()

    } catch (error) {
      next(error)
    }
}


const specificUserAuth = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { id } = req.user
    if (userId !== id) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    next()
  } catch (error) {
    next(error)
  }
}

const specificInstructorCourseAuth = async (req, res, next) => {
  try {
    const { courseId, moduleId } = req.params; // Extract courseId and moduleId from request parameters
    const { role, id } = req.user; // Extract role and user id from request user object

    // Check if user role includes "instructor"
    if (!role.includes("instructor")) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // If neither courseId nor moduleId is provided, return an error
    if (!courseId && !moduleId) {
      return res.status(400).json({ success: false, message: "Course ID or Module ID is required." });
    }

    let entity;

    // First, check if the courseId is provided and validate against the Course model
    if (courseId) {
      entity = await Course.findById(courseId);
      if (!entity) {
        return res.status(404).json({ success: false, message: "Course not found." });
      }
      if (entity.instructor.toString() !== id) {
        return res.status(403).json({ success: false, message: "Access denied. You are not the instructor of this course." });
      }
    }

    // If courseId was not provided, check moduleId against the CourseModule model
    if (moduleId) {
      entity = await CourseModule.findById(moduleId);
      if (!entity) {
        return res.status(404).json({ success: false, message: "Module not found." });
      }
      // Check if the module belongs to a course and if the user is the instructor of that course
      const course = await Course.findById(entity.course); // Assuming CourseModule has a reference to Course
      if (!course || course.instructor.toString() !== id) {
        return res.status(403).json({ success: false, message: "Access denied. You are not the instructor of this module." });
      }
    }

    // If the user is authorized, proceed to the next middleware or controller
    next();
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
};




module.exports = {
  userAuth,
  instructorAuth,
  learnerAuth,
  specificInstructorCourseAuth,
  specificUserAuth
};
