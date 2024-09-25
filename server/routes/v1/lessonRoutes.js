const  express  = require("express")
const { userAuth, specificInstructorCourseAuth } = require("../../middlewares/userMiddllewares")
const {createLesson,getLessonById}=require("../../controllers/lessonControllers")

const router = express.Router()

//add module to course
router.post("/course/:courseId/module/:moduleId/addlesson", userAuth, specificInstructorCourseAuth, createLesson)
router.get("/:courseId/:lessonId",userAuth,getLessonById)

module.exports={lessonRouter:router}