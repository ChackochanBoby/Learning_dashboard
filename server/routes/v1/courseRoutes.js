const express = require("express")
const { createCourse  }=require("../../controllers/courseControllers")
const { userAuth,adminAuth,instructorAuth } = require("../../middlewares/authMiddllewares")
const router = express.Router()

//create a course
router.post("/addcourse",userAuth,instructorAuth,createCourse)
//update a course
router.put("/edit/:courseId")
//delete a course
router.delete("/delete/:courseId")

//get all courses
router.get("/course-list")
//get course by id
router.get("/:courseId")

module.exports={courseRouter:router}