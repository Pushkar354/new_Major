const { Course_model } = require("../Database/Schema/user");

const getCourseById = async (req, res) => {
  try {
    const email = req.user.email;
    const course = await Course_model.findOne({
      _id: req.params.id,
      email: email,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = getCourseById;