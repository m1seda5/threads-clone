// original version before roles update
import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getMessages, sendMessage, getConversations, deleteMessage } from "../controllers/messageController.js";


const router = express.Router();


router.get("/conversations", protectRoute, getConversations);
router.get("/:otherUserId", protectRoute, getMessages);
router.post("/", protectRoute, sendMessage);


// Added delete message route
router.delete("/:messageId", protectRoute, deleteMessage);


export default router;


// version 2
// import express from "express";
// import protectRoute from "../middlewares/protectRoute.js";
// import checkChatAccess from "../middlewares/checkChatAccess.js"; // Import the new middleware
// import { getMessages, sendMessage, getConversations, deleteMessage } from "../controllers/messageController.js";

// const router = express.Router();

// // Apply both protectRoute and checkChatAccess middleware
// router.get("/conversations", protectRoute, checkChatAccess, getConversations);
// router.get("/:otherUserId", protectRoute, checkChatAccess, getMessages);
// router.post("/", protectRoute, checkChatAccess, sendMessage);

// // Added delete message route
// router.delete("/:messageId", protectRoute, checkChatAccess, deleteMessage);

// export default router;

