const bcrypt = require('bcrypt');
const { User } = require("../models/userModel");
const { generateToken } = require("../utils/token")

const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "all fields required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "user already exists" });
    }

    //hash password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds)
    
    //creating and instance of userSchema and saving the document
    const user = new User({name:name,email:email,password:hash})
    await user.save()

    //generate jwt token
    const token = await generateToken(user._id, user.name)
    
    res.cookie("Token", token)
    res.status(201).json({success:true,message:"signup successfull"})

  } catch (error) {
    console.error("ERROR!:" + error)
    res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({success:false,message:"all fields are required"})
    }
    const userExists =await User.findOne({ email:email })
    if (!userExists) {
      return res.status(404).json({success:false,message:"user does not exist"})
    }
    
    //compare passwords
    const passwordsMatch=await bcrypt.compare(password, userExists.password)
    if (!passwordsMatch) {
      return res.status(401).json({success:false,message:"unauthorized password"})
    }

    //generate jwt token and set cookies
    const token = await generateToken(userExists._id, userExists.name, userExists.roles)
    res.cookie("Token", token)
    res.status(200).json({success:true,message:"user logged in"})

  } catch (error) {
    console.error("ERROR!:" + error)
    res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
  }
}

const userLogout = async (req, res) => {
  try {
    res.clearCookie("Token")
    res.status(200).json({success:true,message:"successfully logged out "})

  } catch (error) {
    console.error("ERROR!:" + error)
    res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
  }
}

const userProfile = async (req, res, next) => {
  try {

    const { id } = req.user
    const profile = await User.findById(id).exec()
    res.status(200).json({success:true,message:"fetched user profile",data:profile})
    
  } catch (error) {
    console.error("ERROR!:" + error)
    return res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
  }
}

const updateUser = (req, res, next) => {
  const { id } = req.user
  
}

const getAllUsers = async (req, res, next) => {
  try {
    
    const allUsers = await User.find({}).exec()
    const data = allUsers.map((user) => {
      return {name:user.name,email:user.email,id:user._id,roles:user.roles}
    })
    res.status(200).json({ success: true, message: "fetched all usets", data:data })
    
  } catch (error) {
    console.error("ERROR!:" + error)
    return res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
  }
}

const deleteUser = async (req, res, next) => {
  try {
    
    const { userId } = req.params
    
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({success:false,message:"user not found"})
    }
    res.status(204).send()

  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
}



module.exports={ userSignup, userLogin, userLogout, userProfile, getAllUsers,deleteUser }