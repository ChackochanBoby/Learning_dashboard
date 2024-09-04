const express = require("express")
const { learnerAuth, userAuth } = require("../../middlewares/authMiddllewares")
const { getEnrolledCourses, enroll } = require("../../controllers/learnerControllers")

const router = express.Router()

//get enrolled courses
router.get("/enrolled", userAuth, learnerAuth, getEnrolledCourses)

//enroll
router.post("/enroll/:courseId",userAuth,learnerAuth,enroll)

module.exports={learnerRouter:router}