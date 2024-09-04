const express = require("express")
const {userAuth, instructorAuth} = require("../../middlewares/authMiddllewares")
const { getManagedCourses } = require("../../controllers/instructorControllers")

const router = express.Router()

router.get("/managedcourses", userAuth, instructorAuth, getManagedCourses)

module.exports={instructorRouter:router}