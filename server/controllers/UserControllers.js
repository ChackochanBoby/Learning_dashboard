const bcrypt = require('bcrypt');
const { User } = require("../models/userModel");
const { generateToken } = require("../utils/token");
const jwt = require("jsonwebtoken");
const { handleImageUpload } = require('../utils/imageUpload');

const userSignup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if name is valid (at least 3 characters)
    if (name.length < 3) {
      return res.status(400).json({ success: false, message: "Name should be at least 3 characters long" });
    }


    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    

    // Check if password is valid (at least 8 characters, at least one letter and one number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and include at least one letter and one number",
      });
    }
    console.log("hi")

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    //hash password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    
    //creating an instance of userSchema and saving the document
    const user = new User({ name, email, password: hash });
    await user.save();
    console.log(user)
    //generate jwt token
    const token = await generateToken(user._id, user.name,user.roles);

    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });

    res.status(201).json({ success: true, message: "Signup successful" });

  } catch (error) {
    next(error);
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

const userLogout = async (req, res,next) => {
  try {
    res.clearCookie("Token",{
      httpOnly: true,  
      secure: true,
      sameSite: 'None',
    })
    res.status(200).json({success:true,message:"successfully logged out "})

  } catch (error) {
    next(error)
  }
}

const userProfile = async (req, res, next) => {
  try {

    const { id } = req.user
    const profile = await User.findById(id).exec()
    const {name,email,roles,profile_img}=profile
    res.status(200).json({ success: true, message: "fetched user profile", data:{name,email,roles,profile_img}})
    
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  
  const { userId } = req.params;
  let path=null
  if (req.file) {
    path=req.file.path
  }
let { name } = req.body;

try {
  const user = await User.findById(userId).exec();

  if (!path && !name) {
    return res.status(400).json({ success: false, message: "No valid fields to update" });
  }

  let imgUrl;
  if (path) {
    imgUrl = await handleImageUpload(path);
  } else {
    imgUrl = user.profile_img;
  }

  if (!name) {
    name = user.name;
  }


  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name: name, profile_img: imgUrl },
    { new: true }
  );
  
  res.status(200).json({ success: true, message: "User updated", user: updatedUser });

} catch (error) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'Profile picture too large. Max size is 5MB.' });
    }
}
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