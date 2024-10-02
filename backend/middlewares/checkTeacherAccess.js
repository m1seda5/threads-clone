// import User from "../models/userModel.js";

// const checkTeacherAccess = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Allow all users to create posts
//     // But check if the user is trying to access targeted posting
//     if (req.body.targetAudience && user.role !== "teacher") {
//       return res.status(403).json({ error: "Access denied for targeted posting" });
//     }

//     // If the user is allowed, proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export default checkTeacherAccess;

// debugging adding req user
import User from "../models/userModel.js";

const checkTeacherAccess = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.targetAudience && user.role !== "teacher") {
      return res.status(403).json({ error: "Access denied for targeted posting" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default checkTeacherAccess;

