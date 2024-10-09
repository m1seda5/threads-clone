//version 1 working
// import { Avatar } from "@chakra-ui/avatar";
// import { Image } from "@chakra-ui/image";
// import { Box, Flex, Text } from "@chakra-ui/layout";
// import { Link, useNavigate } from "react-router-dom";
// import Actions from "./Actions";
// import { useEffect, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import { formatDistanceToNow } from "date-fns";
// import { DeleteIcon } from "@chakra-ui/icons";
// import { useRecoilState, useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import postsAtom from "../atoms/postsAtom";

// const Post = ({ post, postedBy }) => {
// 	const [user, setUser] = useState(null);
// 	const showToast = useShowToast();
// 	const currentUser = useRecoilValue(userAtom);
// 	const [posts, setPosts] = useRecoilState(postsAtom);
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const getUser = async () => {
// 			try {
// 				const res = await fetch("/api/users/profile/" + postedBy);
// 				const data = await res.json();
// 				if (data.error) {
// 					showToast("Error", data.error, "error");
// 					return;
// 				}
// 				setUser(data);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 				setUser(null);
// 			}
// 		};

// 		getUser();
// 	}, [postedBy, showToast]);

// 	const handleDeletePost = async (e) => {
// 		try {
// 			e.preventDefault();
// 			if (!window.confirm("Are you sure you want to delete this post?")) return;

// 			const res = await fetch(`/api/posts/${post._id}`, {
// 				method: "DELETE",
// 			});
// 			const data = await res.json();
// 			if (data.error) {
// 				showToast("Error", data.error, "error");
// 				return;
// 			}
// 			showToast("Success", "Post deleted", "success");
// 			setPosts(posts.filter((p) => p._id !== post._id));
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		}
// 	};

// 	if (!user) return null;
// 	return (
// 		<Link to={`/${user.username}/post/${post._id}`}>
// 			<Flex gap={3} mb={4} py={5}>
// 				<Flex flexDirection={"column"} alignItems={"center"}>
// 					<Avatar
// 						size='md'
// 						name={user.name}
// 						src={user?.profilePic}
// 						onClick={(e) => {
// 							e.preventDefault();
// 							navigate(`/${user.username}`);
// 						}}
// 					/>
// 					<Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
// 					<Box position={"relative"} w={"full"}>
// 						{post.replies.length === 0 && <Text textAlign={"center"}>🍐</Text>}
// 						{post.replies[0] && (
// 							<Avatar
// 								size='xs'
// 								name='John doe'
// 								src={post.replies[0].userProfilePic}
// 								position={"absolute"}
// 								top={"0px"}
// 								left='15px'
// 								padding={"2px"}
// 							/>
// 						)}

// 						{post.replies[1] && (
// 							<Avatar
// 								size='xs'
// 								name='John doe'
// 								src={post.replies[1].userProfilePic}
// 								position={"absolute"}
// 								bottom={"0px"}
// 								right='-5px'
// 								padding={"2px"}
// 							/>
// 						)}

// 						{post.replies[2] && (
// 							<Avatar
// 								size='xs'
// 								name='John doe'
// 								src={post.replies[2].userProfilePic}
// 								position={"absolute"}
// 								bottom={"0px"}
// 								left='4px'
// 								padding={"2px"}
// 							/>
// 						)}
// 					</Box>
// 				</Flex>
// 				<Flex flex={1} flexDirection={"column"} gap={2}>
// 					<Flex justifyContent={"space-between"} w={"full"}>
// 						<Flex w={"full"} alignItems={"center"}>
// 							<Text
// 								fontSize={"sm"}
// 								fontWeight={"bold"}
// 								onClick={(e) => {
// 									e.preventDefault();
// 									navigate(`/${user.username}`);
// 								}}
// 							>
// 								{user?.username}
// 							</Text>
// 							<Image src='/verified.png' w={4} h={4} ml={1} />
// 						</Flex>
// 						<Flex gap={4} alignItems={"center"}>
// 							<Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
// 								{formatDistanceToNow(new Date(post.createdAt))} ago
// 							</Text>

// 							{currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
// 						</Flex>
// 					</Flex>

// 					<Text fontSize={"sm"}>{post.text}</Text>
// 					{post.img && (
// 						<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
// 							<Image src={post.img} w={"full"} />
// 						</Box>
// 					)}

// 					<Flex gap={3} my={1}>
// 						<Actions post={post} />
// 					</Flex>
// 				</Flex>
// 			</Flex>
// 		</Link>
// 	);
// };

// export default Post;


// version 2 with translations working
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import { useTranslation } from 'react-i18next';  // Import useTranslation

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();  // Initialize the translation hook
  const [language, setLanguage] = useState(i18n.language);  // Add a state for language

  useEffect(() => {
    // Update the language state whenever the i18n language changes
    const handleLanguageChange = (lng) => {
      setLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);  // Listen for language change

    return () => {
      i18n.off('languageChanged', handleLanguageChange);  // Cleanup on component unmount
    };
  }, [i18n]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if (data.error) {
          showToast(t("Error"), data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast(t("Error"), error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast, t]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm(t("Are you sure you want to delete this post?"))) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast(t("Error deleting post"), data.error, "error");
        return;
      }
      showToast(t("Success"), t("Post deleted"), "success");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast(t("Error"), error.message, "error");
    }
  };

  if (!user) return null;

  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size='md'
            name={user.name}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🍐</Text>}
            {post.replies[0] && (
              <Avatar
                size='xs'
                name='John doe'
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left='15px'
                padding={"2px"}
              />
            )}

            {post.replies[1] && (
              <Avatar
                size='xs'
                name='John doe'
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right='-5px'
                padding={"2px"}
              />
            )}

            {post.replies[2] && (
              <Avatar
                size='xs'
                name='John doe'
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left='4px'
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image src='/verified.png' w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                {formatDistanceToNow(new Date(post.createdAt))} {t("ago")}
              </Text>

              {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;





// this is the new version with the thing where it has fixed the usr not found issue (this is for debuggin)
// import { Avatar } from "@chakra-ui/avatar";
// import { Image } from "@chakra-ui/image";
// import { Box, Flex, Text } from "@chakra-ui/layout";
// import { Link, useNavigate } from "react-router-dom";
// import Actions from "./Actions";
// import { useEffect, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import { formatDistanceToNow } from "date-fns";
// import { DeleteIcon } from "@chakra-ui/icons";
// import { useRecoilState, useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import postsAtom from "../atoms/postsAtom";
// import { useTranslation } from 'react-i18next';  // Import useTranslation

// const Post = ({ post, postedBy }) => {
//   const [user, setUser] = useState(null);
//   const showToast = useShowToast();
//   const currentUser = useRecoilValue(userAtom);
//   const [posts, setPosts] = useRecoilState(postsAtom);
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();  // Initialize the translation hook
//   const [language, setLanguage] = useState(i18n.language);  // Add a state for language

//   useEffect(() => {
//     // Update the language state whenever the i18n language changes
//     const handleLanguageChange = (lng) => {
//       setLanguage(lng);
//     };

//     i18n.on('languageChanged', handleLanguageChange);  // Listen for language change

//     return () => {
//       i18n.off('languageChanged', handleLanguageChange);  // Cleanup on component unmount
//     };
//   }, [i18n]);

//   useEffect(() => {
//     // Debugging `postedBy` to check its value
//     console.log("postedBy value:", postedBy);

//     const getUser = async () => {
//       try {
//         const res = await fetch("/api/users/profile/" + postedBy);
//         console.log("Fetching user for:", postedBy);  // Log before fetch
//         const data = await res.json();
//         if (data.error) {
//           showToast(t("Error"), data.error, "error");
//           return;
//         }
//         setUser(data);
//       } catch (error) {
//         showToast(t("Error"), error.message, "error");
//         setUser(null);
//       }
//     };

//     getUser();
//   }, [postedBy, showToast, t]);

//   const handleDeletePost = async (e) => {
//     try {
//       e.preventDefault();
//       if (!window.confirm(t("Are you sure you want to delete this post?"))) return;

//       const res = await fetch(`/api/posts/${post._id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.error) {
//         showToast(t("Error deleting post"), data.error, "error");
//         return;
//       }
//       showToast(t("Success"), t("Post deleted"), "success");
//       setPosts(posts.filter((p) => p._id !== post._id));
//     } catch (error) {
//       showToast(t("Error"), error.message, "error");
//     }
//   };

//   if (!user) return null;

//   return (
//     <Link to={`/${user.username}/post/${post._id}`}>
//       <Flex gap={3} mb={4} py={5}>
//         <Flex flexDirection={"column"} alignItems={"center"}>
//           <Avatar
//             size='md'
//             name={user.name}
//             src={user?.profilePic}
//             onClick={(e) => {
//               e.preventDefault();
//               navigate(`/${user.username}`);
//             }}
//           />
//           <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
//           <Box position={"relative"} w={"full"}>
//             {post.replies.length === 0 && <Text textAlign={"center"}>🍐</Text>}
//             {post.replies[0] && (
//               <Avatar
//                 size='xs'
//                 name='John doe'
//                 src={post.replies[0].userProfilePic}
//                 position={"absolute"}
//                 top={"0px"}
//                 left='15px'
//                 padding={"2px"}
//               />
//             )}

//             {post.replies[1] && (
//               <Avatar
//                 size='xs'
//                 name='John doe'
//                 src={post.replies[1].userProfilePic}
//                 position={"absolute"}
//                 bottom={"0px"}
//                 right='-5px'
//                 padding={"2px"}
//               />
//             )}

//             {post.replies[2] && (
//               <Avatar
//                 size='xs'
//                 name='John doe'
//                 src={post.replies[2].userProfilePic}
//                 position={"absolute"}
//                 bottom={"0px"}
//                 left='4px'
//                 padding={"2px"}
//               />
//             )}
//           </Box>
//         </Flex>
//         <Flex flex={1} flexDirection={"column"} gap={2}>
//           <Flex justifyContent={"space-between"} w={"full"}>
//             <Flex w={"full"} alignItems={"center"}>
//               <Text
//                 fontSize={"sm"}
//                 fontWeight={"bold"}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   navigate(`/${user.username}`);
//                 }}
//               >
//                 {user?.username}
//               </Text>
//               <Image src='/verified.png' w={4} h={4} ml={1} />
//             </Flex>
//             <Flex gap={4} alignItems={"center"}>
//               <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
//                 {formatDistanceToNow(new Date(post.createdAt))} {t("ago")}
//               </Text>

//               {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
//             </Flex>
//           </Flex>

//           <Text fontSize={"sm"}>{post.text}</Text>
//           {post.img && (
//             <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
//               <Image src={post.img} w={"full"} />
//             </Box>
//           )}

//           <Flex gap={3} my={1}>
//             <Actions post={post} />
//           </Flex>
//         </Flex>
//       </Flex>
//     </Link>
//   );
// };

// export default Post;
