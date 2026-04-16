const { Course_model } = require("../Database/Schema/user");

const getCourses = async (req, res) => {
  try {
    const email = req.user.email;

    console.log("EMAIL:", email);

    const courses = await Course_model.find({ email });

    console.log("COURSES:", courses);

    res.status(200).json({
      success: true,
      courses: courses.map(course => ({
        _id: course._id,
        topic: course.topic,
        modules: course.modules,
        createdAt: course.createdAt
      }))
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
    });
  }
};

module.exports = getCourses;