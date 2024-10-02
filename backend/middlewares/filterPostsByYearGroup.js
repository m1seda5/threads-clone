// import User from "../models/userModel.js";

// const filterPostsByYearGroup = async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user._id);
  
//       // If the user is a student, filter posts based on their year group
//       if (user.email.includes("students") && user.yearGroup) {
//         req.yearGroup = user.yearGroup; // Add the user's year group to the request
//       } else {
//         req.yearGroup = "all"; // Teachers can see posts for all students
//       }
  
//       next();
//     } catch (error) {
//       res.status(500).json({ error: "Error filtering posts by year group" });
//     }
//   };
  
//   export default filterPostsByYearGroup;
  

// this is debugging adding requser
import User from "../models/userModel.js";

const filterPostsByYearGroup = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email.includes("students") && user.yearGroup) {
      req.yearGroup = user.yearGroup;
    } else {
      req.yearGroup = "all";
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Error filtering posts by year group" });
  }
};

export default filterPostsByYearGroup;
