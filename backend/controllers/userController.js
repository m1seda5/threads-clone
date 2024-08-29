// // original version before roles added (second change made here )
// import User from "../models/userModel.js";
// import Post from "../models/postModel.js";
// import bcrypt from "bcryptjs";
// import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
// import { v2 as cloudinary } from "cloudinary";
// import mongoose from "mongoose";

// const getUserProfile = async (req, res) => {
// 	// We will fetch user profile either with username or userId
// 	// query is either username or userId
// 	const { query } = req.params;

// 	try {
// 		let user;

// 		// query is userId
// 		if (mongoose.Types.ObjectId.isValid(query)) {
// 			user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
// 		} else {
// 			// query is username
// 			user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
// 		}

// 		if (!user) return res.status(404).json({ error: "User not found" });

// 		res.status(200).json(user);
// 	} catch (err) {
// 		res.status(500).json({ error: err.message });
// 		console.log("Error in getUserProfile: ", err.message);
// 	}
// };

// const signupUser = async (req, res) => {
// 	try {
// 		const { name, email, username, password } = req.body;
// 		const user = await User.findOne({ $or: [{ email }, { username }] });

// 		if (user) {
// 			return res.status(400).json({ error: "User already exists" });
// 		}
// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		const newUser = new User({
// 			name,
// 			email,
// 			username,
// 			password: hashedPassword,
// 		});
// 		await newUser.save();

// 		if (newUser) {
// 			generateTokenAndSetCookie(newUser._id, res);

// 			res.status(201).json({
// 				_id: newUser._id,
// 				name: newUser.name,
// 				email: newUser.email,
// 				username: newUser.username,
// 				bio: newUser.bio,
// 				profilePic: newUser.profilePic,
// 			});
// 		} else {
// 			res.status(400).json({ error: "Invalid user data" });
// 		}
// 	} catch (err) {
// 		res.status(500).json({ error: err.message });
// 		console.log("Error in signupUser: ", err.message);
// 	}
// };

// const loginUser = async (req, res) => {
// 	try {
// 		const { username, password } = req.body;
// 		const user = await User.findOne({ username });
// 		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

// 		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

// 		if (user.isFrozen) {
// 			user.isFrozen = false;
// 			await user.save();
// 		}

// 		generateTokenAndSetCookie(user._id, res);

// 		res.status(200).json({
// 			_id: user._id,
// 			name: user.name,
// 			email: user.email,
// 			username: user.username,
// 			bio: user.bio,
// 			profilePic: user.profilePic,
// 		});
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 		console.log("Error in loginUser: ", error.message);
// 	}
// };

// const logoutUser = (req, res) => {
// 	try {
// 		res.cookie("jwt", "", { maxAge: 1 });
// 		res.status(200).json({ message: "User logged out successfully" });
// 	} catch (err) {
// 		res.status(500).json({ error: err.message });
// 		console.log("Error in signupUser: ", err.message);
// 	}
// };

// const followUnFollowUser = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const userToModify = await User.findById(id);
// 		const currentUser = await User.findById(req.user._id);

// 		if (id === req.user._id.toString())
// 			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

// 		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

// 		const isFollowing = currentUser.following.includes(id);

// 		if (isFollowing) {
// 			// Unfollow user
// 			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
// 			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
// 			res.status(200).json({ message: "User unfollowed successfully" });
// 		} else {
// 			// Follow user
// 			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
// 			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
// 			res.status(200).json({ message: "User followed successfully" });
// 		}
// 	} catch (err) {
// 		res.status(500).json({ error: err.message });
// 		console.log("Error in followUnFollowUser: ", err.message);
// 	}
// };

// const updateUser = async (req, res) => {
// 	const { name, email, username, password, bio } = req.body;
// 	let { profilePic } = req.body;

// 	const userId = req.user._id;
// 	try {
// 		let user = await User.findById(userId);
// 		if (!user) return res.status(400).json({ error: "User not found" });

// 		if (req.params.id !== userId.toString())
// 			return res.status(400).json({ error: "You cannot update other user's profile" });

// 		if (password) {
// 			const salt = await bcrypt.genSalt(10);
// 			const hashedPassword = await bcrypt.hash(password, salt);
// 			user.password = hashedPassword;
// 		}

// 		if (profilePic) {
// 			if (user.profilePic) {
// 				await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
// 			}

// 			const uploadedResponse = await cloudinary.uploader.upload(profilePic);
// 			profilePic = uploadedResponse.secure_url;
// 		}

// 		user.name = name || user.name;
// 		user.email = email || user.email;
// 		user.username = username || user.username;
// 		user.profilePic = profilePic || user.profilePic;
// 		user.bio = bio || user.bio;

// 		user = await user.save();

// 		// Find all posts that this user replied and update username and userProfilePic fields
// 		await Post.updateMany(
// 			{ "replies.userId": userId },
// 			{
// 				$set: {
// 					"replies.$[reply].username": user.username,
// 					"replies.$[reply].userProfilePic": user.profilePic,
// 				},
// 			},
// 			{ arrayFilters: [{ "reply.userId": userId }] }
// 		);

// 		// password should be null in response
// 		user.password = null;

// 		res.status(200).json(user);
// 	} catch (err) {
// 		res.status(500).json({ error: err.message });
// 		console.log("Error in updateUser: ", err.message);
// 	}
// };

// const getSuggestedUsers = async (req, res) => {
// 	try {
// 		// exclude the current user from suggested users array and exclude users that current user is already following
// 		const userId = req.user._id;

// 		const usersFollowedByYou = await User.findById(userId).select("following");

// 		const users = await User.aggregate([
// 			{
// 				$match: {
// 					_id: { $ne: userId },
// 				},
// 			},
// 			{
// 				$sample: { size: 10 },
// 			},
// 		]);
// 		const filteredUsers = users.filter((user) => !usersFollowedByYou.following.includes(user._id));
// 		const suggestedUsers = filteredUsers.slice(0, 4);

// 		suggestedUsers.forEach((user) => (user.password = null));

// 		res.status(200).json(suggestedUsers);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

// const freezeAccount = async (req, res) => {
// 	try {
// 		const user = await User.findById(req.user._id);
// 		if (!user) {
// 			return res.status(400).json({ error: "User not found" });
// 		}

// 		user.isFrozen = true;
// 		await user.save();

// 		res.status(200).json({ success: true });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

// export {
// 	signupUser,
// 	loginUser,
// 	logoutUser,
// 	followUnFollowUser,
// 	updateUser,
// 	getUserProfile,
// 	getSuggestedUsers,
// 	freezeAccount,
// };


// version 2
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Message from "../models/messageModel.js"; // Ensure you have a Message model
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const getUserProfile = async (req, res) => {
  // We will fetch user profile either with username or userId
  // query is either username or userId
  const { query } = req.params;

  try {
    let user;

    // query is userId
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      // query is username
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};

// SIGNUP USER FUNCTION WITH ROLE ASSIGNMENT
const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Determine role based on email
    const role = email.includes("students") ? "student" : "teacher";

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      role, // Assign role to new user
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
        role: newUser.role, // Include role in response
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};
// END OF SIGNUP USER FUNCTION

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" });

    if (user.isFrozen) {
      user.isFrozen = false;
      await user.save();
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
      role: user.role, // Include role in response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser: ", error.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in logoutUser: ", err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnFollowUser: ", err.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;

  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    // Find all posts that this user replied and update username and userProfilePic fields
    await Post.updateMany(
      { "replies.userId": userId },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] }
    );

    // password should be null in response
    user.password = null;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUser: ", err.message);
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    // exclude the current user from suggested users array and exclude users that current user is already following
    const userId = req.user._id;

    const usersFollowedByYou = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const freezeAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.isFrozen = true;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New function to handle sending messages with role-based restrictions
const sendMessage = async (req, res) => {
  try {
    const { message, recipientId } = req.body;
    const senderId = req.user._id;

    // Fetch sender and recipient details
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) return res.status(400).json({ error: "User not found" });

    // Check for role-based messaging restrictions
    if (
      (sender.role === "teacher" && recipient.role === "student") ||
      (sender.role === "student" && recipient.role === "teacher")
    ) {
      return res.status(403).json({ error: "Messaging restriction: teachers cannot message students and vice versa." });
    }

    const newMessage = new Message({
      sender: senderId,
      recipient: recipientId,
      content: message,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getUserProfile,
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getSuggestedUsers,
  freezeAccount,
  sendMessage,
};
