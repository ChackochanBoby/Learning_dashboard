const bcrypt = require('bcrypt');
const { User } = require("../models/userModel");
const { generateToken } = require("../utils/token");
const jwt = require("jsonwebtoken");
const { handleImageUpload } = require('../utils/imageUpload');

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
    
    res.cookie("Token", token,{
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'None' // Allows cross-site cookie sending
    })
    res.status(201).json({success:true,message:"signup successfull"})

  } catch (error) {
    next(error)
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
    res.cookie("Token", token,{
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'None' // Allows cross-site cookie sending
    })
    res.status(200).json({success:true,message:"user logged in"})

  } catch (error) {
    next(error)
  }
}

const userLogout = async (req, res) => {
  try {
    res.clearCookie("Token")
    res.status(200).json({success:true,message:"successfully logged out "})

  } catch (error) {
    next(error)
  }
}

const userProfile = async (req, res, next) => {
  try {

    const { id } = req.user
    const profile = await User.findById(id).exec()
    res.status(200).json({success:true,message:"fetched user profile",data:profile})
    
  } catch (error) {
    next(error)
  }
}

const updateUser =async (req, res, next) => {
  const { userId } = req.params;
const { path } = req.file;
let { name, email } = req.body;

try {
  const user = await User.findById(userId).exec();

  // If no name, email, or image path is provided, return without updating
  if (!path && !name && !email) {
    return res.status(400).json({ success: false, message: "No valid fields to update" });
  }

  let imgUrl;
  if (path) {
    imgUrl = await handleImageUpload(path);
  } else {
    imgUrl = user.profile_img; // Keep the existing image if no new image is provided
  }

  if (!name) {
    name = user.name;
  }

  if (email && email !== user.email) {
    const emailInUse = await User.findOne({ email }).exec();
    if (emailInUse) {
      return res.status(401).json({ success: false, message: "Email already in use" });
    }
  } else {
    email = user.email;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name: name, email: email, profile_img: imgUrl },
    { new: true }
  );
  
  res.status(200).json({ success: true, message: "User updated", user: updatedUser });

} catch (error) {
  next(error);
}

}

const getAllUsers = async (req, res, next) => {
  try {
    
    const allUsers = await User.find({}).exec()
    const data = allUsers.map((user) => {
      return {name:user.name,email:user.email,id:user._id,roles:user.roles}
    })
    res.status(200).json({ success: true, message: "fetched all usets", data:data })
    
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    
    const { userId } = req.params

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the user being deleted is an admin
    if (userToDelete.role.includes("admin")) {
      return res.status(403).json({ success: false, message: "Admins cannot delete other admins" });
    }
    
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({success:false,message:"user not found"})
    }
    res.status(204).send()

  } catch (error) {
    next(error)
  }
}
const checkUser = async (req, res, next) => {
  try {
    const { Token } = req.cookies
    if (!Token) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    const decoded = jwt.verify(Token, process.env.TOKEN_SECRET_KEY);
    res.status(200).json({success:true,message:"user details fetched",data:decoded})
  } catch (error) {
    next(error)
  }
  
};



module.exports={ userSignup, userLogin, userLogout, userProfile, getAllUsers,deleteUser,updateUser,checkUser }