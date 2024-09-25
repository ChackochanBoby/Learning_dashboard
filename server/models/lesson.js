const { mongoose,Schema } = require("mongoose");

const lessonSchema = new mongoose.Schema({
    type:{type:String,enum:["video","reading"],default:"video"},
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    videoLink: { type: String },
    refLinks:{type: String},
    content: { type: String},
    module: { type: Schema.Types.ObjectId, ref: "CourseModule", required: true },
    course:{ type: Schema.Types.ObjectId,ref:"Course",required:true}
});
  
const Lesson = mongoose.model("Lesson", lessonSchema)

module.exports= {Lesson}