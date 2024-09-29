const express = require("express")
const { userLogin, userLogout, userProfile,deleteUser, updateUser, checkUser,userSignup }=require("../../controllers/UserControllers")
const { userAuth, specificUserAuth } = require("../../middlewares/userMiddllewares")
const {upload}=require("../../middlewares/multer")

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
//user delete
router.delete("/delete/:userId",userAuth,specificUserAuth,deleteUser)

//check user
router.get("/checkuser",checkUser)

module.exports={userRouter:router}