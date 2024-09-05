const express = require("express")
const { courseRouter } = require("./courseRoutes")
const { userRouter } = require("./userRoutes")
const { learnerRouter } = require("./learnerRoutes")
const { instructorRouter } = require("./instructorRoutes")
const { moduleRouter } = require("./moduleRoutes")

const router = express.Router()

router.use("/user", userRouter)
router.use("/course", courseRouter)
router.use("/learner", learnerRouter)
router.use("/instructor", instructorRouter)
router.use("/module", moduleRouter)

module.exports = { v1Router: router }