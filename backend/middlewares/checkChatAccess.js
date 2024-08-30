// // middleware/checkChatAccess.js
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
