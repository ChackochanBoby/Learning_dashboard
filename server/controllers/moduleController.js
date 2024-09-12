const { Course } = require("../models/courseModel");
const { CourseModule } = require("../models/moduleModel");

const createModule = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.user;
    const { courseId } = req.params;
    if (!id || !courseId) {
      return res.status(400).json({ success: false, message: "bad request" });
    }
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "title field is required" });
    }
    const newModule = new CourseModule({
      title: title,
      description: description,
      instructor:id,
      course: courseId,
    });
    await newModule.save();
    await Course.findByIdAndUpdate(courseId, {
      $push: { modules: newModule._id },
    });
    res.status(201).json({ success: true, message: "created new module successfully",data:newModule });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const editModule = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
      const { id } = req.user;
      let {title,description} = req.body
    const moduleToEdit = await CourseModule.findById({ moduleId }).exec();
    if (moduleToEdit.instructor != id) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized access" });
      }
      if (!title) {
          title = moduleToEdit.title
      }
      const modifiedModule = await CourseModule.findByIdAndUpdate(moduleId, { title, description},{new:true}).exec()
      res.status(200).json({success:true,message:"successfully updated module",data:modifiedModule})
  } catch (error) {
    next(error)
  }
};

module.exports = { createModule };
