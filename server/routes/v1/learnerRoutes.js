const express = require("express")
const { learnerAuth, userAuth } = require("../../middlewares/userMiddllewares")
const { getEnrolledCourses, enroll, checkEnrollment } = require("../../controllers/learnerControllers")

const router = express.Router()

//get enrolled courses
router.get("/enrolled", userAuth, learnerAuth, getEnrolledCourses)

//enroll
router.post("/enroll/:courseId", userAuth, learnerAuth, enroll)

//check enrollment
router.get("/check-enrollment/:courseId",userAuth,learnerAuth,checkEnrollment)

module.exports={learnerRouter:router}