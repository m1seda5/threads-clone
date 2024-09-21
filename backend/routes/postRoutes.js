// this is working 
// import express from "express";
// import {
// 	createPost,
// 	deletePost,
// 	getPost,
// 	likeUnlikePost,
// 	replyToPost,
// 	getFeedPosts,
// 	getUserPosts,
// } from "../controllers/postController.js";
// import protectRoute from "../middlewares/protectRoute.js";

// const router = express.Router();

// router.get("/feed", protectRoute, getFeedPosts);
// router.get("/:id", getPost);
// router.get("/user/:username", getUserPosts);
// router.post("/create", protectRoute, createPost);
// router.delete("/:id", protectRoute, deletePost);
// router.put("/like/:id", protectRoute, likeUnlikePost);
// router.put("/reply/:id", protectRoute, replyToPost);


// export default router;


// adding teacher roles 
import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	likeUnlikePost,
	replyToPost,
	getFeedPosts,
	getUserPosts,
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";
import checkTeacherAccess from "../middlewares/checkTeacherAccess.js"; // Import the teacher access middleware

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", protectRoute, getPost); // Added protectRoute for consistency
router.get("/user/:username", protectRoute, getUserPosts); // Added protectRoute for consistency
router.post("/create", protectRoute, checkTeacherAccess, createPost); // Add the checkTeacherAccess middleware
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);

export default router;
