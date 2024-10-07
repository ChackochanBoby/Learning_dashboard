const express = require("express")
const { createCourse, getAllCourses, getCourseById, deleteCourse, publishCourse, editCourse, totalCourses, getAllCoursesForAdmin, unpublishCourse  }=require("../../controllers/courseControllers")
const { userAuth,instructorAuth, specificInstructorCourseAuth, } = require("../../middlewares/userMiddllewares")
const router = express.Router()
const {upload}=require("../../middlewares/multer")
const { adminAuth } = require("../../middlewares/adminMiddlewares")

//create a course
router.post("/addcourse",userAuth,instructorAuth,createCourse)
//update a course
router.put("/edit/:courseId",userAuth,specificInstructorCourseAuth,upload.single("image"),editCourse)
router.put("/publish/:courseId",userAuth,specificInstructorCourseAuth,publishCourse)
router.put("/unpublish/:courseId",adminAuth,unpublishCourse)
//delete a course
router.delete("/delete/:courseId",userAuth,specificInstructorCourseAuth,deleteCourse)
//delete a course as admin
router.delete("/delete/:courseId/admin",adminAuth,deleteCourse)

//get total number of published courses
router.get("/total",adminAuth,totalCourses)
//get all courses
router.get("/course-list",userAuth,getAllCourses)
router.get("/admin/course-list",adminAuth,getAllCoursesForAdmin)
//get course by id
router.get("/:courseId",userAuth,getCourseById)


module.exports={courseRouter:router}