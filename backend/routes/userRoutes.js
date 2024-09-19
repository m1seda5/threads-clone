// working version
// import express from "express";
// import {
// 	followUnFollowUser,
// 	getUserProfile,
// 	loginUser,
// 	logoutUser,
// 	signupUser,
// 	updateUser,
// 	getSuggestedUsers,
// 	freezeAccount,
// } from "../controllers/userController.js";
// import protectRoute from "../middlewares/protectRoute.js";

// const router = express.Router();

// router.get("/profile/:query", getUserProfile);
// router.get("/suggested", protectRoute, getSuggestedUsers);
// router.post("/signup", signupUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);
// router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
// router.put("/update/:id", protectRoute, updateUser);
// router.put("/freeze", protectRoute, freezeAccount);

// export default router;

// verification update
import {
    followUnFollowUser,
    getUserProfile,
    loginUser,
    logoutUser,
    signupUser,
    updateUser,
    getSuggestedUsers,
    freezeAccount,
    awardVerification
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"; // Import admin middleware

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);

// New route for awarding verification with admin validation
router.post("/verify-user", protectRoute, adminMiddleware, awardVerification);

export default router;
