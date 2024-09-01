const express = require("express")
const { userSignup, userLogin, userLogout, userProfile }=require("../../controllers/UserControllers")
const { userAuth } = require("../../middlewares/authMiddllewares")
const router = express.Router()

//user signup
router.post( "/signup", userSignup )
//user login
router.post( "/login", userLogin )
//user logout
router.post( "/logout", userLogout )

//user profile
router.get("/profile",userAuth, userProfile)
//user update
router.put("/update")
//user delete
router.delete("/delete")

//user list
router.get("/userList")
//check user
router.get("/checkUser")

module.exports={userRouter:router}