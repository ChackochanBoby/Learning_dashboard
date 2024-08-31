const bcrypt = require('bcrypt');
const { User } = require("../models/userModel");
const { generateToken } = require("../utils/token")

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "all fields required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "user already exists" });
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds)
    const user = new User({name:name,email:email,password:hash})
    await user.save()
    const token = generateToken(user._id,user.name)
    res.cookie("Token", token)
    res.status(201).json({success:true,message:"signup successfull"})

  } catch (error) {
    console.error("ERROR!:" + error)
    res.status(error.statusCode||500).json({success:false,message:error.message||"internal server error"})
  }
};



module.exports={signUp}