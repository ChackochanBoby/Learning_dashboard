const { mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_img: { type: String, default: null },
  roles:{type:[String],enum:["learner","instructor","admin"],default:"learner"},
  enrolled_courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  courses_managed:[{type:Schema.Types.ObjectId,ref:"Course"}]
});

const User = mongoose.model("User", userSchema);

module.exports = { User };