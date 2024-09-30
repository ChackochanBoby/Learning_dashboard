const express = require("express")
const { courseRouter } = require("./courseRoutes")
const { userRouter } = require("./userRoutes")
const { learnerRouter } = require("./learnerRoutes")
const { instructorRouter } = require("./instructorRoutes")
const { moduleRouter } = require("./moduleRoutes")
const { adminRouter } = require("./adminRoutes")
const { lessonRouter } = require("./lessonRoutes")
const { paymentRouter } = require("./paymentRoutes")

const router = express.Router()

router.use("/user", userRouter)
router.use("/course", courseRouter)
router.use("/learner", learnerRouter)
router.use("/instructor", instructorRouter)
router.use("/module", moduleRouter)
router.use("/admin", adminRouter)
router.use("/lesson", lessonRouter)
router.use("/payment", paymentRouter )

module.exports = { v1Router: router }