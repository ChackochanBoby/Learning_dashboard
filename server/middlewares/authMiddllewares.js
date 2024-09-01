const jwt = require("jsonwebtoken")

const userAuth = async (req, res, next) => {
  try {
    
    const { Token } = req.cookies
    if (!Token) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    const decoded = jwt.verify(Token, process.env.TOKEN_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    req.user=decoded
    next()

  } catch (error) {
    console.error("ERROR!:" + error)
    return res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
  }
  
};

const instructorAuth = async (req, res, next) => {
  try {
      
      const { role } = req.user  
      const isInstructor = role.includes("instructor")
      if (!isInstructor) {
        return res.status(401).json({success:false,message:"unauthorized access"})
      }
      next()

    } catch (error) {
      console.error("ERROR!:" + error)
      return res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
    }
}

const adminAuth = async (req, res, next) => {
  try {
      
      const { role } = req.user  
      const isAdmin = role.includes("admin")
      if (!isAdmin) {
        return res.status(401).json({success:false,message:"unauthorized access"})
      }
      next()

    } catch (error) {
      console.error("ERROR!:" + error)
      return res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
    }
}

module.exports = {
  userAuth,
  instructorAuth,
  adminAuth
};
