const express = require('express')
const {studentRouter}=require("./studentRoute")

const router = express.Router()


router.use("/students",studentRouter)

module.exports={v1Router:router}