import User from "../models/userModel.js";

import User from "../models/userModel.js";

const checkTeacherAccess = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Allow access for teachers (i.e., those whose email does not contain 'students')
    if (user.email.includes("students")) {
      return res.status(403).json({ error: "Access denied" });
    }

    // If the user is a teacher, proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default checkTeacherAccess;
