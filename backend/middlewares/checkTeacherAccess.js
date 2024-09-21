import User from "../models/userModel.js";

const checkTeacherAccess = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is a teacher based on their email
    if (!user.email.includes("students")) {
      return next(); // Allow access for teachers
    }

    // If not a teacher, deny access
    return res.status(403).json({ error: "Access denied" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default checkTeacherAccess;
