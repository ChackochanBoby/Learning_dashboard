const { mongoose, Schema } = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    course:{type:Schema.Types.ObjectId,ref:"Course",required:true},
    learner:{type:Schema.Types.ObjectId,ref:"User",required:true},
})

const Enrollment = mongoose.model("Enrollment", enrollmentSchema)

module.exports={Enrollment}