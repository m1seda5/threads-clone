// middleware/checkChatAccess.js version 1 this is the basic model wihtout time restictions for studentss
// import User from "../models/userModel.js";

// const checkChatAccess = async (req, res, next) => {
//   try {
//     const userId = req.user._id; // Assuming user ID is available from the request
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if email contains "students"
//     if (!user.email.includes("students")) {
//       // If email does not contain "students", restrict access
//       return res.status(403).json({ error: "Access to chat is restricted for your account." });
//     }

//     // Allow access if email contains "students"
//     next();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export default checkChatAccess;

// this is the new version with time restriction
// middleware/checkChatAccess.js
import User from "../models/userModel.js";

const checkChatAccess = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming user ID is available from the request
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
    const currentTime = currentDate.getHours() * 100 + currentDate.getMinutes(); // Convert to HHMM format

    // School hours in HHMM format
    const schoolStart = 810;
    const lunchStart = 1250;
    const lunchEnd = 1340;
    const schoolEnd = 1535;

    // Check if it's a weekday (Monday to Friday)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Check if the user is a student
      if (user.email.includes("students")) {
        // Check if current time is within allowed chatting periods
        if (
          currentTime < schoolStart ||
          (currentTime >= lunchStart && currentTime <= lunchEnd) ||
          currentTime > schoolEnd
        ) {
          // Allow access
          return next();
        } else {
          // Restrict access during school hours except lunchtime
          return res.status(403).json({ error: "Chatting is restricted during school hours." });
        }
      } else {
        // Restrict access for teachers
        return res.status(403).json({ error: "Access to chat is restricted for your account." });
      }
    } else {
      // Allow access on weekends
      return next();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default checkChatAccess;

