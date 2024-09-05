const { mongoose,Schema } = require("mongoose");

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, 
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }, 
});
  
const CourseModule = mongoose.model("CourseModule", moduleSchema)

module.exports = {CourseModule}