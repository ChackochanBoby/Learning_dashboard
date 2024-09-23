const { mongoose,Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_img: { type: String, default: null },
  roles:{type:[String],enum:["learner","instructor"],default:"learner"},
  courses_managed:[{type:Schema.Types.ObjectId,ref:"Course"}]
});
userSchema.index({ roles: 1 });
const User = mongoose.model("User", userSchema);

module.exports = { User };