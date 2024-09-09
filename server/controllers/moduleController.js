const { Course } = require("../models/courseModel")
const { CourseModule } = require("../models/moduleModel")

const createModule = async (req, res, next) => {
    
    try {
        const {title,description}= req.body
        const { id } = req.user
        const { courseId } = req.params
        if (!id || !courseId) {
            return res.status(400).json({success:false,message:"bad request"})
        }
        if (!title) {
            return res.status(400).json({success:false,message:"title field is required"})
        }
        const newModule = new CourseModule({ title: title, description: description, course: courseId })
        await newModule.save()
        await Course.findByIdAndUpdate(courseId,{ $push: { modules: newModule._id } })
        res.status(201).json({success:true,message:"created new module successfully"})

    } catch (error) {
        next(error)

    }
}

module.exports={createModule}