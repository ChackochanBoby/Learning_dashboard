const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const {Course} = require("../models/courseModel")

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
    const { courseId } = req.params;  // Assuming courseId is passed in the URL
    const { role, id } = req.user;  // `id` is the user ID from the token payload

    if (!role.includes("instructor")) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // Find the course and check if the instructor ID matches the user ID
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== id) {
      return res.status(403).json({ success: false, message: "Access denied. You are not the instructor of this course." });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userAuth,
  instructorAuth,
  learnerAuth,
  specificInstructorCourseAuth,
  specificUserAuth
};
