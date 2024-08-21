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



