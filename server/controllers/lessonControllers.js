const { Lesson } = require("../models/lesson")
const { CourseModule } = require("../models/moduleModel")
const {Course}=require("../models/courseModel")

const createLesson = async (req, res, next) => {
    const {type,title,introduction,refLinks,videoLink,content}=req.body
    const { moduleId,courseId }=req.params
    try {
        const module = await CourseModule.findById(moduleId).exec()
        const course = await Course.findById(courseId).exec()
        if (!module || !course) {
            return res.status(400).json({success:false,message:"Bad Request"})
        }
        const newLesson = new Lesson({ type, title, introduction, refLinks, videoLink, content, module: moduleId, course: courseId })
        await newLesson.save()
        module.lessons.push(newLesson._id)
        await module.save()
        res.status(201).json({success:true,message:"lesson created",data:newLesson})

    } catch (error) {
        next(error)
    }
}

const getLessonById = async(req, res, next) => {
    const { lessonId } = req.params
    try {
        if (!lessonId) {
            return res.status(400).json({success:false,message:"bad request"})
        }
        const lesson = await Lesson.findById(lessonId).exec()
        if (!lesson) {
            return res.status(404).json({ success: false, message:"lesson not found"})
        }
        res.status(200).json({success:true,message:"fetched lesson",data:lesson})

    } catch (error) {
        next(error)
    }
}
module.exports= {createLesson,getLessonById}