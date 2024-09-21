// working 
// import mongoose from "mongoose";

// const postSchema = mongoose.Schema(
// 	{
// 		postedBy: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// 		text: {
// 			type: String,
// 			maxLength: 500,
// 		},
// 		img: {
// 			type: String,
// 		},
// 		likes: {
// 			// array of user ids
// 			type: [mongoose.Schema.Types.ObjectId],
// 			ref: "User",
// 			default: [],
// 		},
// 		replies: [
// 			{
// 				userId: {
// 					type: mongoose.Schema.Types.ObjectId,
// 					ref: "User",
// 					required: true,
// 				},
// 				text: {
// 					type: String,
// 					required: true,
// 				},
// 				userProfilePic: {
// 					type: String,
// 				},
// 				username: {
// 					type: String,
// 				},
// 			},
// 		],
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// const Post = mongoose.model("Post", postSchema);

// export default Post;


// this is with the targeted posting 
import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
	  postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	  },
	  text: {
		type: String,
		maxLength: 500,
	  },
	  img: {
		type: String,
	  },
	  likes: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
		default: [],
	  },
	  replies: [
		{
		  userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		  },
		  text: {
			type: String,
			required: true,
		  },
		  userProfilePic: {
			type: String,
		  },
		  username: {
			type: String,
		  },
		},
	  ],
	  targetAudience: {
		type: String, // Add this line to define the target audience
		enum: ["all", "Year 12", "Year 13"], // Adjust as needed based on your roles
	  },
	},
	{
	  timestamps: true,
	}
  );
  

const Post = mongoose.model("Post", postSchema);

export default Post;
