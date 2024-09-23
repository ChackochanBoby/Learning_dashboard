const { mongoose,Schema } = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML content or URL to video, etc.
    module: { type: Schema.Types.ObjectId, ref: "CourseModule",required:true },
});
  
const Lesson = mongoose.model("Lesson", lessonSchema)

module.exports= {Lesson}