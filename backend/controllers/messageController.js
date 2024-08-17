import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecipientSocketId, io } from "../socket/socket.js";
import { v2 as cloudinary } from "cloudinary";


// Start of sendMessage function
async function sendMessage(req, res) {
   try {
       const { recipientId, message } = req.body;
       let { img } = req.body;
       const senderId = req.user._id;


       let conversation = await Conversation.findOne({
           participants: { $all: [senderId, recipientId] },
       });


       if (!conversation) {
           conversation = new Conversation({
               participants: [senderId, recipientId],
               lastMessage: {
                   text: message,
                   sender: senderId,
               },
           });
           await conversation.save();
       }


       if (img) {
           const uploadedResponse = await cloudinary.uploader.upload(img);
           img = uploadedResponse.secure_url;
       }


       const newMessage = new Message({
           conversationId: conversation._id,
           sender: senderId,
           text: message,
           img: img || "",
       });


       await Promise.all([
           newMessage.save(),
           conversation.updateOne({
               lastMessage: {
                   text: message,
                   sender: senderId,
               },
           }),
       ]);


       const recipientSocketId = getRecipientSocketId(recipientId);
       if (recipientSocketId) {
           io.to(recipientSocketId).emit("newMessage", newMessage);
       }


       res.status(201).json(newMessage);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
// End of sendMessage function


// Start of getMessages function
async function getMessages(req, res) {
   const { otherUserId } = req.params;
   const userId = req.user._id;
   try {
       const conversation = await Conversation.findOne({
           participants: { $all: [userId, otherUserId] },
       });


       if (!conversation) {
           return res.status(404).json({ error: "Conversation not found" });
       }


       const messages = await Message.find({
           conversationId: conversation._id,
       }).sort({ createdAt: 1 });


       res.status(200).json(messages);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
// End of getMessages function


// Start of getConversations function
async function getConversations(req, res) {
   const userId = req.user._id;
   try {
       const conversations = await Conversation.find({ participants: userId }).populate({
           path: "participants",
           select: "username profilePic",
       });


       // remove the current user from the participants array
       conversations.forEach((conversation) => {
           conversation.participants = conversation.participants.filter(
               (participant) => participant._id.toString() !== userId.toString()
           );
       });
       res.status(200).json(conversations);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
// End of getConversations function


// Start of deleteMessage function
async function deleteMessage(req, res) {
   try {
       const { messageId } = req.params;
       const userId = req.user._id;


       const message = await Message.findById(messageId);


       // Check if the message exists and if the user is the sender
       if (!message || message.sender.toString() !== userId.toString()) {
           return res.status(403).json({ error: "You can only delete your own messages" });
       }


       // Delete the message
       await message.deleteOne();


       // Optionally, you can update the conversation's last message if the deleted message was the last one
       const conversation = await Conversation.findById(message.conversationId);
       if (conversation && conversation.lastMessage && conversation.lastMessage.text === message.text) {
           const lastMessage = await Message.findOne({ conversationId: message.conversationId }).sort({ createdAt: -1 });
           if (lastMessage) {
               conversation.lastMessage = {
                   text: lastMessage.text,
                   sender: lastMessage.sender,
               };
           } else {
               conversation.lastMessage = { text: "", sender: "" };
           }
           await conversation.save();
       }


       res.status(200).json({ message: "Message deleted successfully" });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}
// End of deleteMessage function


export { sendMessage, getMessages, getConversations, deleteMessage };


