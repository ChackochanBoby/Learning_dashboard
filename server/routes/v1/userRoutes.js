const express = require("express")
const { userLogin, userLogout, userProfile,deleteUser, updateUser, checkUser,userSignup, totalUsers, getUsersByRole, addInstructorRole }=require("../../controllers/UserControllers")
const { userAuth, specificUserAuth } = require("../../middlewares/userMiddllewares")
const {upload}=require("../../middlewares/multer")
const { adminAuth } = require("../../middlewares/adminMiddlewares")

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
router.put("/update/:userId",userAuth,specificUserAuth,upload.single("profilePic"),updateUser)
router.put("/update/:userId/addrole",userAuth,specificUserAuth,addInstructorRole)
//user delete
router.delete("/delete/:userId", userAuth, specificUserAuth, deleteUser)

//get all users
router.get("/allusers",adminAuth,getUsersByRole)
//get user total
router.get("/total",adminAuth,totalUsers)

//check user
router.get("/checkuser",checkUser)

module.exports={userRouter:router}