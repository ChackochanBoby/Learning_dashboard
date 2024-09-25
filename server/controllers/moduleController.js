const { Course } = require("../models/courseModel");
const { CourseModule } = require("../models/moduleModel");
const {Lesson}=require("../models/lesson")

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
    let { title, description } = req.body;

    // Find the module to edit
    const moduleToEdit = await CourseModule.findById(moduleId).exec();

    // Fallback to the existing title if not provided
    if (!title) {
      title = moduleToEdit.title;
    }

    // Update the module
    const modifiedModule = await CourseModule.findByIdAndUpdate(
      moduleId,
      { title, description },
      { new: true }
    ).exec();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Successfully updated module",
      data: modifiedModule,
    });
  } catch (error) {
    next(error);
  }
};

const deleteModule = async (req, res, next) => {
  try {
    const { moduleId } = req.params;

    // Find the module to delete
    const moduleToDelete = await CourseModule.findById(moduleId).exec();
    
    if (!moduleToDelete) {
      return res.status(404).json({ success: false, message: "Module not found" });
    }

    // Delete the lessons associated with the module
    await Lesson.deleteMany({ module: moduleId });

    // Delete the module itself
    await CourseModule.findByIdAndDelete(moduleId).exec();

    // Remove the moduleId from the Course model
    await Course.updateMany(
      { modules: moduleId }, // Find the course that contains the moduleId
      { $pull: { modules: moduleId } } // Remove the moduleId from the modules array
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Module and its lessons successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};



module.exports = { createModule,editModule,deleteModule };
