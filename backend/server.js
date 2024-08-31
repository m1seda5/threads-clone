// this is the  server before the websocket integration
// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/connectDB.js";
// import cookieParser from "cookie-parser";
// import userRoutes from "./routes/userRoutes.js";
// import postRoutes from "./routes/postRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import { v2 as cloudinary } from "cloudinary";
// import { app, server } from "./socket/socket.js";
// import job from "./cron/cron.js";

// dotenv.config();

// connectDB();
// job.start();

// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Middlewares
// app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
// app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
// app.use(cookieParser());

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/messages", messageRoutes);

// // http://localhost:5000 => backend,frontend

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	// react app
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));


// this is the uodated server.js with websocket added 
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import http from "http"; // Import HTTP module for WebSocket server
import WebSocket from "ws"; // Correct import for WebSocket
import job from "./cron/cron.js";

dotenv.config();

connectDB();
job.start();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = http.createServer(app); // Create an HTTP server for WebSocket

const wss = new WebSocket.Server({ server }); // Initialize WebSocket server

// WebSocket connection setup
wss.on("connection", (ws) => {
	console.log("Client connected");

	// Comment out or remove the message handling part
	// ws.on("message", (message) => {
	// 	console.log("Received message:", message);
	// });

	// Optionally, you can send a welcome message to the client
	// ws.send("Welcome to the WebSocket server");
});

// Middlewares
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files and handle client-side routing
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
