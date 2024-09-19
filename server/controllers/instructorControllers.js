const { User } = require("../models/userModel");

const getManagedCourses = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized access" });
    }
    const user = await User.findById(id)
      .populate({
        path: "courses_managed",
        select: "title _id instructor image",
        populate: { path: "instructor", select: "name" },
      })
          .exec();
      const managedCourses = user.courses_managed.map((course) => {
          return {title:course.title,instructor:course.instructor.name,id:course._id,image:course.image}
      })
      res.status(200).json({success:true,message:"fetched managed courses",data:managedCourses})
  } catch (error) {
    next(error)
  }
};

module.exports={ getManagedCourses }