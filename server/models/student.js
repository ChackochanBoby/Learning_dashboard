const { mongoose, SchemaType } = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_img: { type: String, default: null },
  enrolled_courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };