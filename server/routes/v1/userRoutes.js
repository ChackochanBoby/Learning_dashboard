const express = require("express")
const { userSignup, userLogin, userLogout, userProfile, getAllUsers,deleteUser }=require("../../controllers/userControllers")
const { userAuth, adminAuth, userAndAdminAuth } = require("../../middlewares/authMiddllewares")
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
router.put("/update",userAuth,)
//user delete
router.delete("/delete/:userId",userAuth,userAndAdminAuth,deleteUser)

//user list
router.get("/userlist", userAuth, adminAuth, getAllUsers)
//check user
router.get("/checkUser")

module.exports={userRouter:router}