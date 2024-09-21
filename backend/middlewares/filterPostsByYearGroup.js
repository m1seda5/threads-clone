import User from "../models/userModel.js";

const filterPostsByYearGroup = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
  
      // If the user is a student, filter posts based on their year group
      if (user.email.includes("students") && user.yearGroup) {
        req.yearGroup = user.yearGroup; // Add the user's year group to the request
      } else {
        req.yearGroup = "all"; // Teachers can see posts for all students
      }
  
      next();
    } catch (error) {
      res.status(500).json({ error: "Error filtering posts by year group" });
    }
  };
  
  export default filterPostsByYearGroup;
  