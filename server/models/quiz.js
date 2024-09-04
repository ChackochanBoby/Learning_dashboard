const { mongoose,Schema } = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModule', required: true },
    questions: [{
        questionText: { type: String, required: true },
        questionType:{type:String,enum:["mcq","trueOrFalse"],default:"mcq"},
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true }
    }],
    passMark: {type:Number,default:50}
});
  
const Quiz = mongoose.model("Quiz", quizSchema)

module.exports={Quiz}
  