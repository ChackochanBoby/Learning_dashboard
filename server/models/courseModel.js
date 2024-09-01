const { mongoose, Schema } = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    category:{type:String},
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    modules: [{ type: Schema.Types.ObjectId, ref: "Module"}],
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isPublished:{type:Boolean, default:false}
})

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };