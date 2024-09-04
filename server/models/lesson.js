const { mongoose,Schema } = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML content or URL to video, etc.
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
});
  
const Lesson = mongoose.model("Lesson", lessonSchema)

module.exports= {Lesson}