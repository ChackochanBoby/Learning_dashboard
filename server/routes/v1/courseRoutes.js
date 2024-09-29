const express = require("express")
const { createCourse, getAllCourses, getCourseById, deleteCourse, publishCourse, editCourse  }=require("../../controllers/courseControllers")
const { userAuth,instructorAuth, specificInstructorCourseAuth, } = require("../../middlewares/userMiddllewares")
const router = express.Router()
const {upload}=require("../../middlewares/multer")

//create a course
router.post("/addcourse",userAuth,instructorAuth,createCourse)
//update a course
router.put("/edit/:courseId",userAuth,specificInstructorCourseAuth,upload.single("image"),editCourse)
router.put("/publish/:courseId",userAuth,specificInstructorCourseAuth,publishCourse)
//delete a course
router.delete("/delete/:courseId",userAuth,specificInstructorCourseAuth,deleteCourse)

//get all courses
router.get("/course-list",userAuth,getAllCourses)
//get course by id
router.get("/:courseId",userAuth,getCourseById)


module.exports={courseRouter:router}