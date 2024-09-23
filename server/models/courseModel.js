const { mongoose, Schema } = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    category: { type: String },
    image:{type:String, default:"https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"},
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    modules: [{ type: Schema.Types.ObjectId, ref: "CourseModule" }],
    isPaid: { type: Boolean, default: false },
    price:{type:String,default:"0"},
    isPublished:{type:Boolean, default:false}
})

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };