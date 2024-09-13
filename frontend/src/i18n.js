
// versioon one only works for the settigns page 
// // src/i18n.js

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // Define your translations
// const resources = {
//   en: {
//     translation: {
//       "Welcome": "Welcome",
//       "Freeze Your Account": "Freeze Your Account",
//       "You can unfreeze your account anytime by logging in.": "You can unfreeze your account anytime by logging in.",
//       "Freeze": "Freeze"
//       // Add more translations here
//     }
//   },
//   zh: {
//     translation: {
//       "Welcome": "欢迎",
//       "Freeze Your Account": "冻结您的帐户",
//       "You can unfreeze your account anytime by logging in.": "您可以随时通过登录解冻帐户。",
//       "Freeze": "冻结"
//       // Add more translations here
//     }
//   }
// };

// i18n
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: "en", // Default language
//     interpolation: {
//       escapeValue: false
//     }
//   });

// export default i18n;


// version two trail 
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define your translations
const resources = {
  en: {
    translation: {
      // User Header Component
      "Welcome": "Welcome",
      "Freeze Your Account": "Freeze Your Account",
      "You can unfreeze your account anytime by logging in.": "You can unfreeze your account anytime by logging in.",
      "Freeze": "Freeze",
      "Edit Profile": "Edit Profile",
      "Unfollow": "Unfollow",
      "Follow": "Follow",
      "Copy link": "Copy link",
      "Profile link copied.": "Profile link copied.",
      "Feed": "Feed",
      "Pear": "Pear",
      "meet.com": "meet.com",

      // Post Component
      "Delete Post": "Delete Post",  // Confirmation for deleting post
      "Are you sure you want to delete this post?": "Are you sure you want to delete this post?",  // Delete confirmation prompt
      "Post deleted": "Post deleted",  // Toast message for successful deletion
      "Error deleting post": "Error deleting post",  // Error message
      "ago": "ago",  // Used for time formatting
      // UserPost Component Translations
      "replies": "replies",
      "likes": "likes",
      "1d": "1d", // Keep the time format consistent
      "markzuckerberg": "Mark Zuckerberg",
      "Post Title Placeholder": "This is a post title placeholder"
    }
  },
  zh: {
    translation: {
      // User Header Component
      "Welcome": "欢迎",
      "Freeze Your Account": "冻结您的帐户",
      "You can unfreeze your account anytime by logging in.": "您可以随时通过登录解冻帐户。",
      "Freeze": "冻结",
      "Edit Profile": "编辑资料",
      "Unfollow": "取消关注",
      "Follow": "关注",
      "Copy link": "复制链接",
      "Profile link copied.": "资料链接已复制。",
      "Feed": "动态",
      "Pear": "梨",
      "meet.com": "meet.com",

      // Post Component
      "Delete Post": "删除帖子",  // Confirmation for deleting post
      "Are you sure you want to delete this post?": "您确定要删除此帖子吗？",  // Delete confirmation prompt
      "Post deleted": "帖子已删除",  // Toast message for successful deletion
      "Error deleting post": "删除帖子时出错",  // Error message
      "ago": "前",  // Used for time formatting
     // UserPost Component Translations
     "replies": "回复",
     "likes": "点赞",
     "1d": "1天前",
     "markzuckerberg": "马克·扎克伯格",
     "Post Title Placeholder": "这是一个帖子标题占位符"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false
    },
    debug: true // Enable debug mode
  });

export default i18n;
