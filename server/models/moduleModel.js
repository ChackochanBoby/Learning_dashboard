const { mongoose,Schema } = require("mongoose");

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    instructor:{type: Schema.Types.ObjectId,ref:"User",required:true},
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: true }, 
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' }, 
});
  
const CourseModule = mongoose.model("CourseModule", moduleSchema)

module.exports = {CourseModule}