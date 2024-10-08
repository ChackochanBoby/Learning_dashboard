const jwt = require("jsonwebtoken");

const generateToken = async (id,name,role) => {
  try {
    const token = jwt.sign({ id: id, name: name, role: role || ["learner"] }, process.env.TOKEN_SECRET_KEY);
    return token
  } catch (error) {
    console.error("ERROR:" + error)
    throw new Error("failed to generate token");
    
  }
};
const generateAdminToken = async (id,name) => {
  try {
    const token = jwt.sign({ id: id, name: name }, process.env.TOKEN_SECRET_KEY_ADMIN);
    return token
  } catch (error) {
    console.error("ERROR:" + error)
    throw new Error("failed to generate token");
    
  }
};

module.exports={ generateToken,generateAdminToken }