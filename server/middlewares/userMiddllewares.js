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
    const { courseId, moduleId } = req.params;
    const { role, id } = req.user;

    if (!role.includes("instructor")) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    let entity;
    if (courseId) {
      entity = await Course.findById(courseId);
    } else if (moduleId) {
      entity = await CourseModule.findById(moduleId);
    }
    if (!entity || entity.instructor.toString() !== id) {
      return res.status(403).json({ success: false, message: "Access denied. You are not the instructor of this entity." });
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
