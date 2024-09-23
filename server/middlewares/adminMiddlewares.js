const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
    try {
      
        const { AdminToken } = req.cookies
        if (!AdminToken) {
            return res.status(401).json({ success: false, message: "unauthorized access" })
        }
        const decoded = jwt.verify(AdminToken, process.env.TOKEN_SECRET_KEY_ADMIN);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "unauthorized access" })
        }
        req.admin = decoded
        next()
  
    } catch (error) {
        next(error)
    }
}

const specificAdminAuth = async (req, res, next) => {
    try {
        
        const { id } = req.admin
        const { adminId }=req.params
        if (id !== adminId) {
            return res.status(401).json({success:false,message:"unauthorized access"})
        }
        next()
  
      } catch (error) {
        next(error)
      }
}

module.exports = {
    adminAuth,specificAdminAuth
}