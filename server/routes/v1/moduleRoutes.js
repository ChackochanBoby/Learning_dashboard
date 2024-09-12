const  express  = require("express")
const { userAuth, instructorAuth } = require("../../middlewares/authMiddllewares")
const { createModule } = require("../../controllers/moduleController")

const router = express.Router()

//add module to course
router.post("/:courseId/addmodule", userAuth, instructorAuth, createModule)
router.post("/:moduleId",userAuth,instructorAuth,)

module.exports={moduleRouter:router}