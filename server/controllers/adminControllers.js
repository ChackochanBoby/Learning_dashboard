const bcrypt = require('bcrypt');
const { Admin } = require("../models/adminModel");
const { generateAdminToken } = require("../utils/token");
const jwt = require("jsonwebtoken");
const { handleImageUpload } = require('../utils/imageUpload');

const adminSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "all fields required" });
    }
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ success: false, message: "admin already exists" });
    }

    //hash password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds)
    
    //creating and instance of userSchema and saving the document
    const admin = new Admin({name:name,email:email,password:hash})
    await admin.save()

    //generate jwt token
    const token = await generateAdminToken(admin._id, admin.name)
    
    res.cookie("AdminToken", token)
    res.status(201).json({success:true,message:"signup successfull"})

  } catch (error) {
    next(error)
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({success:false,message:"all fields are required"})
    }
    const adminExists = await Admin.findOne({ email:email })
    if (!adminExists) {
      return res.status(404).json({success:false,message:"admin does not exist"})
    }
    
    //compare passwords
    const passwordsMatch=await bcrypt.compare(password, adminExists.password)
    if (!passwordsMatch) {
      return res.status(401).json({success:false,message:"unauthorized password"})
    }

    //generate jwt token and set cookies
    const token = await generateAdminToken(adminExists._id, adminExists.name)
    res.cookie("AdminToken", token)
    res.status(200).json({success:true,message:"Admin logged in"})

  } catch (error) {
    next(error)
  }
}

const adminLogout = async (req, res) => {
  try {
    res.clearCookie("AdminToken")
    res.status(200).json({success:true,message:"successfully logged out "})

  } catch (error) {
    next(error)
  }
}

const adminProfile = async (req, res, next) => {
  try {

    const { id } = req.admin
    const profile = await Admin.findById(id).exec()
    res.status(200).json({success:true,message:"fetched admin profile",data:profile})
    
  } catch (error) {
    next(error)
  }
}

const updateAdmin =async (req, res, next) => {
  const { adminId } = req.params;
const { path } = req.file;
let { name, email } = req.body;

try {
  const admin = await Admin.findById(adminId).exec();

  // If no name, email, or image path is provided, return without updating
  if (!path && !name && !email) {
    return res.status(400).json({ success: false, message: "No valid fields to update" });
  }

  let imgUrl;
  if (path) {
    imgUrl = await handleImageUpload(path);
  } else {
    imgUrl = admin.profile_img; // Keep the existing image if no new image is provided
  }

  if (!name) {
    name = admin.name;
  }

  if (email && email !== admin.email) {
    const emailInUse = await Admin.findOne({ email }).exec();
    if (emailInUse) {
      return res.status(401).json({ success: false, message: "Email already in use" });
    }
  } else {
    email = admin.email;
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(
    adminId,
    { name: name, email: email, profile_img: imgUrl },
    { new: true }
  );
  
  res.status(200).json({ success: true, message: "Admin updated", user: updatedAdmin });

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

const deleteAdmin = async (req, res, next) => {
  try {
    
    const { adminId } = req.params

    const adminToDelete = await Admin.findById(adminId);
    if (!adminToDelete) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    
    const deletedAdmin = await Admin.findByIdAndDelete(adminId)

    if (!deletedAdmin) {
      return res.status(404).json({success:false,message:"Admin not found"})
    }
    res.status(204).send()

  } catch (error) {
    next(error)
  }
}

const checkAdmin = async (req, res, next) => {
  try {
    const { AdminToken } = req.cookies
    if (!AdminToken) {
      return res.status(401).json({success:false,message:"unauthorized access"})
    }
    const decoded = jwt.verify(AdminToken, process.env.TOKEN_SECRET_KEY_ADMIN);
    res.status(200).json({success:true,message:"admin details fetched",data:decoded})
  } catch (error) {
    next(error)
  }
  
};



module.exports={ adminSignup,adminLogin,adminLogout,adminProfile,updateAdmin,deleteAdmin,checkAdmin }