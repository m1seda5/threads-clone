// import User from "../models/userModel.js";
// import jwt from "jsonwebtoken";

// const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.cookies.jwt;

// 		if (!token) return res.status(401).json({ message: "Unauthorized" });

// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		const user = await User.findById(decoded.userId).select("-password");

// 		req.user = user;

// 		next();
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 		console.log("Error in signupUser: ", err.message);
// 	}
// };

// export default protectRoute;


// adding debugging additional requser
// import User from "../models/userModel.js";
// import jwt from "jsonwebtoken";

// const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;

//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) return res.status(404).json({ error: "User not found" });

//     req.user = user;

//     next();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export default protectRoute;

// actuall debugging wiht the console and the back end 
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded userId:", decoded.userId);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("User not found in the database");
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Error in protectRoute middleware:", err);
    res.status(500).json({ message: err.message });
  }
};

export default protectRoute;
