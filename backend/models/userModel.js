// original version without roles (first change made here)
// import mongoose from "mongoose";

// const userSchema = mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: true,
// 		},
// 		username: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// 		email: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// 		password: {
// 			type: String,
// 			minLength: 6,
// 			required: true,
// 		},
// 		profilePic: {
// 			type: String,
// 			default: "",
// 		},
// 		followers: {
// 			type: [String],
// 			default: [],
// 		},
// 		following: {
// 			type: [String],
// 			default: [],
// 		},
// 		bio: {
// 			type: String,
// 			default: "",
// 		},
// 		isFrozen: {
// 			type: Boolean,
// 			default: false,
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// const User = mongoose.model("User", userSchema);

// export default User;

// version for verification  working
// import mongoose from "mongoose";

// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       minLength: 6,
//       required: true,
//     },
//     profilePic: {
//       type: String,
//       default: "",
//     },
//     followers: {
//       type: [String],
//       default: [],
//     },
//     following: {
//       type: [String],
//       default: [],
//     },
//     bio: {
//       type: String,
//       default: "",
//     },
//     isFrozen: {
//       type: Boolean,
//       default: false,
//     },
//     verification: {
//       type: String,
//       enum: ["none", "blue", "golden"], // Available verification options
//       default: "none", // Default to no verification
//     },
//   },
//   {
//     timestamps: true, // This will automatically add `createdAt` and `updatedAt` fields
//   }
// );

// const User = mongoose.model("User", userSchema);

// export default User;



// this is trying to add more roles  
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
    verification: {
      type: String,
      enum: ["none", "blue", "golden"], // Available verification options
      default: "none", // Default to no verification
    },
    isStudent: {
      type: Boolean,
      default: false, // This field determines if the user is a student or not
    },
    yearGroup: {
      type: String, // Store the selected year group
      required: function () {
        return this.isStudent; // yearGroup is only required if the user is a student
      },
    },
    role: {
      type: String,
      enum: ["user", "teacher"], // Include 'teacher' in the allowed roles
      required: function () {
        return this.isStudent || this.role === "teacher"; // Role is required for students and teachers
      },
      default: "user", // Default to 'user' if not provided
    },    
  },
  {
    timestamps: true, // This will automatically add `createdAt` and `updatedAt` fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;
