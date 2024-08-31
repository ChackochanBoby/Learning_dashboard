const express = require("express")
const {signUp}=require("../../controllers/UserControllers")
const router = express.Router()

//user signup
router.post("/signup",signUp)
//user login
router.post("/login")
//user logout
router.post("/logout")

//user profile
router.get("/profile")
//user update
router.put("/update")
//user delete
router.delete("/delete")

//user list
router.get("/userList")
//check user
router.get("/checkUser")

module.exports={userRouter:router}