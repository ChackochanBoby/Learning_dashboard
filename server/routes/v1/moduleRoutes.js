const  express  = require("express")
const { userAuth, instructorAuth, specificInstructorCourseAuth } = require("../../middlewares/userMiddllewares")
const { createModule, editModule, deleteModule, getModuleById } = require("../../controllers/moduleController")

const router = express.Router()

//add module to course
router.post("/:courseId/addmodule", userAuth, instructorAuth, createModule)
router.put("edit/:moduleId", userAuth, specificInstructorCourseAuth, editModule)
router.get("/:moduleId", userAuth, specificInstructorCourseAuth, getModuleById)
router.delete("/delete/:moduleId",userAuth,specificInstructorCourseAuth,deleteModule)

module.exports={moduleRouter:router}