const express = require("express")
const { createCourse, getAllCourses, getMyCourses, getCourseById, deleteCourse  }=require("../../controllers/courseControllers")
const { userAuth,adminAuth,instructorAuth, specificInstructorCourseAuth, } = require("../../middlewares/userMiddllewares")
const router = express.Router()

//create a course
router.post("/addcourse",userAuth,instructorAuth,createCourse)
//update a course
router.put("/edit/:courseId",userAuth,specificInstructorCourseAuth)
//delete a course
router.delete("/delete/:courseId",userAuth,specificInstructorCourseAuth,deleteCourse)

//get all courses
router.get("/course-list",userAuth,getAllCourses)
//get course by id
router.get("/:courseId",userAuth,getCourseById)


module.exports={courseRouter:router}