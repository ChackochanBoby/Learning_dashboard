const  express  = require("express")
const { userAuth, instructorAuth, specificInstructorCourseAuth } = require("../../middlewares/userMiddllewares")
const { createModule, editModule, deleteModule } = require("../../controllers/moduleController")

const router = express.Router()

//add module to course
router.post("/:courseId/addmodule", userAuth, instructorAuth, createModule)
router.put("/:moduleId", userAuth, specificInstructorCourseAuth, editModule)
router.delete("/delete/:moduleId",userAuth,specificInstructorCourseAuth,deleteModule)

module.exports={moduleRouter:router}