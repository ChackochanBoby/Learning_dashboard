const express = require("express")
const router = express.Router()
const { adminSignup, adminLogin, adminLogout,adminProfile, updateAdmin, deleteAdmin, checkAdmin} = require("../../controllers/adminControllers")
const { specificAdminAuth, adminAuth } = require("../../middlewares/adminMiddlewares")
const {upload}=require("../../middlewares/multer")

//admin signup
router.post( "/signup", adminSignup )
//admin login
router.post( "/login", adminLogin )
//admin logout
router.post( "/logout", adminLogout )

//admin profile
router.get("/profile",adminAuth, adminProfile)
//admin update
router.put("/update/:adminId",adminAuth,specificAdminAuth,upload.single("profile_img"),updateAdmin)
//admin delete
router.delete("/delete/:adminId",adminAuth,specificAdminAuth,deleteAdmin)

//check admin
router.get("/checkadmin",checkAdmin)

module.exports={adminRouter:router}

