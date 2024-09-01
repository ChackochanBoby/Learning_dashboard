const express = require("express")
const { courseRouter } = require("./courseRoutes")
const { userRouter } = require("./userRoutes")

const router = express.Router()

router.use("/user", userRouter)
router.use("/course", courseRouter)

module.exports = { v1Router: router }