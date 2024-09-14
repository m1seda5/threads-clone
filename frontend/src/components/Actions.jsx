// this is working version one of the actions 
// import {
// 	Box,
// 	Button,
// 	Flex,
// 	FormControl,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalOverlay,
// 	Text,
// 	useDisclosure,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { useRecoilState, useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import useShowToast from "../hooks/useShowToast";
// import postsAtom from "../atoms/postsAtom";

// const Actions = ({ post }) => {
// 	const user = useRecoilValue(userAtom);
// 	const [liked, setLiked] = useState(post.likes.includes(user?._id));
// 	const [posts, setPosts] = useRecoilState(postsAtom);
// 	const [isLiking, setIsLiking] = useState(false);
// 	const [isReplying, setIsReplying] = useState(false);
// 	const [reply, setReply] = useState("");

// 	const showToast = useShowToast();
// 	const { isOpen, onOpen, onClose } = useDisclosure();

// 	const handleLikeAndUnlike = async () => {
// 		if (!user) return showToast("Error", "You must be logged in to like a post", "error");
// 		if (isLiking) return;
// 		setIsLiking(true);
// 		try {
// 			const res = await fetch("/api/posts/like/" + post._id, {
// 				method: "PUT",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			});
// 			const data = await res.json();
// 			if (data.error) return showToast("Error", data.error, "error");

// 			if (!liked) {
// 				// add the id of the current user to post.likes array
// 				const updatedPosts = posts.map((p) => {
// 					if (p._id === post._id) {
// 						return { ...p, likes: [...p.likes, user._id] };
// 					}
// 					return p;
// 				});
// 				setPosts(updatedPosts);
// 			} else {
// 				// remove the id of the current user from post.likes array
// 				const updatedPosts = posts.map((p) => {
// 					if (p._id === post._id) {
// 						return { ...p, likes: p.likes.filter((id) => id !== user._id) };
// 					}
// 					return p;
// 				});
// 				setPosts(updatedPosts);
// 			}

// 			setLiked(!liked);
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		} finally {
// 			setIsLiking(false);
// 		}
// 	};

// 	const handleReply = async () => {
// 		if (!user) return showToast("Error", "You must be logged in to reply to a post", "error");
// 		if (isReplying) return;
// 		setIsReplying(true);
// 		try {
// 			const res = await fetch("/api/posts/reply/" + post._id, {
// 				method: "PUT",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ text: reply }),
// 			});
// 			const data = await res.json();
// 			if (data.error) return showToast("Error", data.error, "error");

// 			const updatedPosts = posts.map((p) => {
// 				if (p._id === post._id) {
// 					return { ...p, replies: [...p.replies, data] };
// 				}
// 				return p;
// 			});
// 			setPosts(updatedPosts);
// 			showToast("Success", "Reply posted successfully", "success");
// 			onClose();
// 			setReply("");
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		} finally {
// 			setIsReplying(false);
// 		}
// 	};

// 	return (
// 		<Flex flexDirection='column'>
// 			<Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
// 				<svg
// 					aria-label='Like'
// 					color={liked ? "rgb(237, 73, 86)" : ""}
// 					fill={liked ? "rgb(237, 73, 86)" : "transparent"}
// 					height='19'
// 					role='img'
// 					viewBox='0 0 24 22'
// 					width='20'
// 					onClick={handleLikeAndUnlike}
// 				>
// 					<path
// 						d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
// 						stroke='currentColor'
// 						strokeWidth='2'
// 					></path>
// 				</svg>

// 				<svg
// 					aria-label='Comment'
// 					color=''
// 					fill=''
// 					height='20'
// 					role='img'
// 					viewBox='0 0 24 24'
// 					width='20'
// 					onClick={onOpen}
// 				>
// 					<title>Comment</title>
// 					<path
// 						d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
// 						fill='none'
// 						stroke='currentColor'
// 						strokeLinejoin='round'
// 						strokeWidth='2'
// 					></path>
// 				</svg>

// 				<RepostSVG />
// 				<ShareSVG />
// 			</Flex>

// 			<Flex gap={2} alignItems={"center"}>
// 				<Text color={"gray.light"} fontSize='sm'>
// 					{post.replies.length} replies
// 				</Text>
// 				<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
// 				<Text color={"gray.light"} fontSize='sm'>
// 					{post.likes.length} likes
// 				</Text>
// 			</Flex>

// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />
// 				<ModalContent>
// 					<ModalHeader></ModalHeader>
// 					<ModalCloseButton />
// 					<ModalBody pb={6}>
// 						<FormControl>
// 							<Input
// 								placeholder='Reply goes here..'
// 								value={reply}
// 								onChange={(e) => setReply(e.target.value)}
// 							/>
// 						</FormControl>
// 					</ModalBody>

// 					<ModalFooter>
// 						<Button colorScheme='blue' size={"sm"} mr={3} isLoading={isReplying} onClick={handleReply}>
// 							Reply
// 						</Button>
// 					</ModalFooter>
// 				</ModalContent>
// 			</Modal>
// 		</Flex>
// 	);
// };

// export default Actions;

// const RepostSVG = () => {
// 	return (
// 		<svg
// 			aria-label='Repost'
// 			color='currentColor'
// 			fill='currentColor'
// 			height='20'
// 			role='img'
// 			viewBox='0 0 24 24'
// 			width='20'
// 		>
// 			<title>Repost</title>
// 			<path
// 				fill=''
// 				d='M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z'
// 			></path>
// 		</svg>
// 	);
// };

// const ShareSVG = () => {
// 	return (
// 		<svg
// 			aria-label='Share'
// 			color=''
// 			fill='rgb(243, 245, 247)'
// 			height='20'
// 			role='img'
// 			viewBox='0 0 24 24'
// 			width='20'
// 		>
// 			<title>Share</title>
// 			<line
// 				fill='none'
// 				stroke='currentColor'
// 				strokeLinejoin='round'
// 				strokeWidth='2'
// 				x1='22'
// 				x2='9.218'
// 				y1='3'
// 				y2='10.083'
// 			></line>
// 			<polygon
// 				fill='none'
// 				points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
// 				stroke='currentColor'
// 				strokeLinejoin='round'
// 				strokeWidth='2'
// 			></polygon>
// 		</svg>
// 	);
// };


// this is the version 2 of actions with optimistic ui changes   debouncing   working 
// import {
//     Box,
//     Button,
//     Flex,
//     FormControl,
//     Input,
//     Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent,
//     ModalFooter,
//     ModalHeader,
//     ModalOverlay,
//     Text,
//     useDisclosure,
// } from "@chakra-ui/react";
// import { useState, useCallback } from "react";
// import { useRecoilState, useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import useShowToast from "../hooks/useShowToast";
// import postsAtom from "../atoms/postsAtom";
// import { debounce } from "lodash";

// const Actions = ({ post }) => {
//     const user = useRecoilValue(userAtom);
//     const [liked, setLiked] = useState(post.likes.includes(user?._id));
//     const [posts, setPosts] = useRecoilState(postsAtom);
//     const [isLiking, setIsLiking] = useState(false);
//     const [isReplying, setIsReplying] = useState(false);
//     const [reply, setReply] = useState("");

//     const showToast = useShowToast();
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     const handleLikeAndUnlike = useCallback(
//         debounce(async () => {
//             if (!user) return showToast("Error", "You must be logged in to like a post", "error");
//             if (isLiking) return;

//             const originalLiked = liked;
//             const originalPosts = [...posts];

//             // Optimistically update the UI
//             setLiked(!liked);
//             setPosts(posts.map(p => p._id === post._id ? {
//                 ...p,
//                 likes: !liked ? [...p.likes, user._id] : p.likes.filter(id => id !== user._id),
//             } : p));

//             setIsLiking(true);
//             try {
//                 const res = await fetch(`/api/posts/like/${post._id}`, {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                 });
//                 const data = await res.json();

//                 if (data.error) {
//                     throw new Error(data.error);
//                 }
//             } catch (error) {
//                 // Revert the state if API call fails
//                 setLiked(originalLiked);
//                 setPosts(originalPosts);
//                 showToast("Error", error.message, "error");
//             } finally {
//                 setIsLiking(false);
//             }
//         }, 300),
//         [liked, isLiking, post._id, posts, setPosts, showToast, user?._id]
//     );

//     const handleReply = async () => {
//         if (!user) return showToast("Error", "You must be logged in to reply to a post", "error");
//         if (isReplying) return;

//         setIsReplying(true);
//         try {
//             const res = await fetch(`/api/posts/reply/${post._id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ text: reply }),
//             });
//             const data = await res.json();

//             if (data.error) {
//                 showToast("Error", data.error, "error");
//                 return;
//             }

//             setPosts(posts.map(p => p._id === post._id ? { ...p, replies: [...p.replies, data] } : p));
//             showToast("Success", "Reply posted successfully", "success");
//             onClose();
//             setReply("");
//         } catch (error) {
//             showToast("Error", error.message, "error");
//         } finally {
//             setIsReplying(false);
//         }
//     };

//     return (
//         <Flex flexDirection="column">
//             <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
//                 <svg
//                     aria-label="Like"
//                     color={liked ? "rgb(237, 73, 86)" : ""}
//                     fill={liked ? "rgb(237, 73, 86)" : "transparent"}
//                     height="19"
//                     role="img"
//                     viewBox="0 0 24 22"
//                     width="20"
//                     onClick={handleLikeAndUnlike}
//                 >
//                     <path
//                         d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                     ></path>
//                 </svg>

//                 <svg
//                     aria-label="Comment"
//                     color=""
//                     fill=""
//                     height="20"
//                     role="img"
//                     viewBox="0 0 24 24"
//                     width="20"
//                     onClick={onOpen}
//                 >
//                     <title>Comment</title>
//                     <path
//                         d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                     ></path>
//                 </svg>

//                 <RepostSVG />
//                 <ShareSVG />
//             </Flex>

//             <Flex gap={2} alignItems="center">
//                 <Text color="gray.light" fontSize="sm">
//                     {post.replies.length} replies
//                 </Text>
//                 <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light"></Box>
//                 <Text color="gray.light" fontSize="sm">
//                     {post.likes.length} likes
//                 </Text>
//             </Flex>

//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader></ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody pb={6}>
//                         <FormControl>
//                             <Input
//                                 placeholder="Reply goes here.."
//                                 value={reply}
//                                 onChange={(e) => setReply(e.target.value)}
//                             />
//                         </FormControl>
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme="blue" size="sm" mr={3} isLoading={isReplying} onClick={handleReply}>
//                             Reply
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </Flex>
//     );
// };

// export default Actions;

// const RepostSVG = () => {
//     return (
//         <svg
//             aria-label="Repost"
//             color="currentColor"
//             fill="currentColor"
//             height="20"
//             role="img"
//             viewBox="0 0 24 24"
//             width="20"
//         >
//             <title>Repost</title>
//             <path
//                 d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"
//             ></path>
//         </svg>
//     );
// };

// const ShareSVG = () => {
//     return (
//         <svg
//             aria-label="Share"
//             color=""
//             fill="rgb(243, 245, 247)"
//             height="20"
//             role="img"
//             viewBox="0 0 24 24"
//             width="20"
//         >
//             <title>Share</title>
//             <line
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 x1="22"
//                 x2="9.218"
//                 y1="3"
//                 y2="10.083"
//             ></line>
//             <polygon
//                 fill="none"
//                 points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
//                 stroke="currentColor"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//             ></polygon>
//         </svg>
//     );
// };


// this is the version with transaltions 
// import {
//     Box,
//     Button,
//     Flex,
//     FormControl,
//     Input,
//     Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent,
//     ModalFooter,
//     ModalHeader,
//     ModalOverlay,
//     Text,
//     useDisclosure,
// } from "@chakra-ui/react";
// import { useState, useCallback, useEffect } from "react";
// import { useRecoilState, useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import useShowToast from "../hooks/useShowToast";
// import postsAtom from "../atoms/postsAtom";
// import { debounce } from "lodash";
// import { useTranslation } from 'react-i18next';  // Import useTranslation

// const Actions = ({ post }) => {
//     const user = useRecoilValue(userAtom);
//     const [liked, setLiked] = useState(post.likes.includes(user?._id));
//     const [posts, setPosts] = useRecoilState(postsAtom);
//     const [isLiking, setIsLiking] = useState(false);
//     const [isReplying, setIsReplying] = useState(false);
//     const [reply, setReply] = useState("");
//     const showToast = useShowToast();
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     const { t, i18n } = useTranslation();  // Initialize the translation hook
//     const [language, setLanguage] = useState(i18n.language);  // Add a state for language

//     useEffect(() => {
//         const handleLanguageChange = (lng) => {
//             setLanguage(lng);
//         };

//         i18n.on('languageChanged', handleLanguageChange);  // Listen for language change

//         return () => {
//             i18n.off('languageChanged', handleLanguageChange);  // Cleanup on component unmount
//         };
//     }, [i18n]);

//     const handleLikeAndUnlike = useCallback(
//         debounce(async () => {
//             if (!user) return showToast(t("Error"), t("You must be logged in to like a post"), "error");
//             if (isLiking) return;

//             const originalLiked = liked;
//             const originalPosts = [...posts];

//             // Optimistically update the UI
//             setLiked(!liked);
//             setPosts(posts.map(p => p._id === post._id ? {
//                 ...p,
//                 likes: !liked ? [...p.likes, user._id] : p.likes.filter(id => id !== user._id),
//             } : p));

//             setIsLiking(true);
//             try {
//                 const res = await fetch(`/api/posts/like/${post._id}`, {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                 });
//                 const data = await res.json();

//                 if (data.error) {
//                     throw new Error(data.error);
//                 }
//             } catch (error) {
//                 // Revert the state if API call fails
//                 setLiked(originalLiked);
//                 setPosts(originalPosts);
//                 showToast(t("Error"), error.message, "error");
//             } finally {
//                 setIsLiking(false);
//             }
//         }, 300),
//         [liked, isLiking, post._id, posts, setPosts, showToast, user?._id, t]
//     );

//     const handleReply = async () => {
//         if (!user) return showToast(t("Error"), t("You must be logged in to reply to a post"), "error");
//         if (isReplying) return;

//         setIsReplying(true);
//         try {
//             const res = await fetch(`/api/posts/reply/${post._id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ text: reply }),
//             });
//             const data = await res.json();

//             if (data.error) {
//                 showToast(t("Error"), data.error, "error");
//                 return;
//             }

//             setPosts(posts.map(p => p._id === post._id ? { ...p, replies: [...p.replies, data] } : p));
//             showToast(t("Success"), t("Reply posted successfully"), "success");
//             onClose();
//             setReply("");
//         } catch (error) {
//             showToast(t("Error"), error.message, "error");
//         } finally {
//             setIsReplying(false);
//         }
//     };

//     return (
//         <Flex flexDirection="column">
//             <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
//                 <svg
//                     aria-label={t("Like")}
//                     color={liked ? "rgb(237, 73, 86)" : ""}
//                     fill={liked ? "rgb(237, 73, 86)" : "transparent"}
//                     height="19"
//                     role="img"
//                     viewBox="0 0 24 22"
//                     width="20"
//                     onClick={handleLikeAndUnlike}
//                 >
//                     <path
//                         d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                     ></path>
//                 </svg>

//                 <svg
//                     aria-label={t("Comment")}
//                     color=""
//                     fill=""
//                     height="20"
//                     role="img"
//                     viewBox="0 0 24 24"
//                     width="20"
//                     onClick={onOpen}
//                 >
//                     <title>{t("Comment")}</title>
//                     <path
//                         d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                     ></path>
//                 </svg>

//                 <RepostSVG />
//                 {/* Removed ShareSVG */}
//             </Flex>

//             <Flex gap={2} alignItems="center">
//                 <Text color="gray.light" fontSize="sm">
//                     {post.replies.length} {t("replies")}
//                 </Text>
//                 <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light"></Box>
//                 <Text color="gray.light" fontSize="sm">
//                     {post.likes.length} {t("likes")}
//                 </Text>
//             </Flex>

//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>{t("Add Reply")}</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody pb={6}>
//                         <FormControl>
//                             <Input
//                                 placeholder={t("Reply goes here...")}
//                                 value={reply}
//                                 onChange={(e) => setReply(e.target.value)}
//                             />
//                         </FormControl>
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme="blue" size="sm" mr={3} isLoading={isReplying} onClick={handleReply}>
//                             {t("Reply")}
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </Flex>
//     );
// };

// export default Actions;

// const RepostSVG = () => {
//     const { t } = useTranslation();  // Initialize the translation hook

//     return (
//         <svg
//             aria-label={t("Repost")}
//             color="currentColor"
//             fill="currentColor"
//             height="20"
//             role="img"
//             viewBox="0 0 24 24"
//             width="20"
//         >
//             <title>{t("Repost")}</title> {/* Add translation for the title */}
//             <path
//                 d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"
//             ></path>
//         </svg>
//     );
// };


// this is repost function 
import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import { debounce } from "lodash";
import { useTranslation } from 'react-i18next';  // Import useTranslation

const Actions = ({ post }) => {
    const user = useRecoilValue(userAtom);
    const [liked, setLiked] = useState(post.likes.includes(user?._id));
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [isLiking, setIsLiking] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isReposting, setIsReposting] = useState(false);  // Added state for reposting
    const [reply, setReply] = useState("");
    const showToast = useShowToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { t, i18n } = useTranslation();  // Initialize the translation hook
    const [language, setLanguage] = useState(i18n.language);  // Add a state for language

    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChange);  // Listen for language change

        return () => {
            i18n.off('languageChanged', handleLanguageChange);  // Cleanup on component unmount
        };
    }, [i18n]);

    const handleLikeAndUnlike = useCallback(
        debounce(async () => {
            if (!user) return showToast(t("Error"), t("You must be logged in to like a post"), "error");
            if (isLiking) return;

            const originalLiked = liked;
            const originalPosts = [...posts];

            // Optimistically update the UI
            setLiked(!liked);
            setPosts(posts.map(p => p._id === post._id ? {
                ...p,
                likes: !liked ? [...p.likes, user._id] : p.likes.filter(id => id !== user._id),
            } : p));

            setIsLiking(true);
            try {
                const res = await fetch(`/api/posts/like/${post._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }
            } catch (error) {
                // Revert the state if API call fails
                setLiked(originalLiked);
                setPosts(originalPosts);
                showToast(t("Error"), error.message, "error");
            } finally {
                setIsLiking(false);
            }
        }, 300),
        [liked, isLiking, post._id, posts, setPosts, showToast, user?._id, t]
    );

    const handleReply = async () => {
        if (!user) return showToast(t("Error"), t("You must be logged in to reply to a post"), "error");
        if (isReplying) return;

        setIsReplying(true);
        try {
            const res = await fetch(`/api/posts/reply/${post._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: reply }),
            });
            const data = await res.json();

            if (data.error) {
                showToast(t("Error"), data.error, "error");
                return;
            }

            setPosts(posts.map(p => p._id === post._id ? { ...p, replies: [...p.replies, data] } : p));
            showToast(t("Success"), t("Reply posted successfully"), "success");
            onClose();
            setReply("");
        } catch (error) {
            showToast(t("Error"), error.message, "error");
        } finally {
            setIsReplying(false);
        }
    };

    const handleRepost = async () => {
        if (!user) return showToast(t("Error"), t("You must be logged in to repost"), "error");
        if (isReposting) return;

        setIsReposting(true);
        try {
            const res = await fetch(`/api/posts/repost/${post._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const text = await res.text();  // Read response as text
                throw new Error(`Unexpected response: ${text}`);
            }

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setPosts(posts.map(p => p._id === post._id ? { ...p, reposts: [...p.reposts, user._id] } : p));
            showToast(t("Success"), t("Post reposted successfully"), "success");
        } catch (error) {
            showToast(t("Error"), error.message, "error");
        } finally {
            setIsReposting(false);
        }
    };

    return (
        <Flex flexDirection="column">
            <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
                <svg
                    aria-label={t("Like")}
                    color={liked ? "rgb(237, 73, 86)" : ""}
                    fill={liked ? "rgb(237, 73, 86)" : "transparent"}
                    height="19"
                    role="img"
                    viewBox="0 0 24 22"
                    width="20"
                    onClick={handleLikeAndUnlike}
                >
                    <path
                        d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    ></path>
                </svg>

                <svg
                    aria-label={t("Comment")}
                    color=""
                    fill=""
                    height="20"
                    role="img"
                    viewBox="0 0 24 24"
                    width="20"
                    onClick={onOpen}
                >
                    <title>{t("Comment")}</title>
                    <path
                        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    ></path>
                </svg>

                <RepostSVG onClick={handleRepost} /> {/* Added onClick */}
                {/* Remove ShareSVG if not needed */}
            </Flex>

            <Flex gap={2} alignItems="center">
                <Text color="gray.light" fontSize="sm">
                    {post.replies.length} {t("replies")}
                </Text>
                <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light"></Box>
                <Text color="gray.light" fontSize="sm">
                    {post.likes.length} {t("likes")}
                </Text>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("Add Reply")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                placeholder={t("Reply goes here...")}
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" size="sm" mr={3} isLoading={isReplying} onClick={handleReply}>
                            {t("Reply")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default Actions;

const RepostSVG = ({ onClick }) => {
    return (
        <svg
            aria-label="Repost"
            color="currentColor"
            fill="currentColor"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
            onClick={onClick}  // Added onClick prop
        >
            <title>Repost</title>
            <path
                fill=""
                d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"
            ></path>
        </svg>
    );
};

// const ShareSVG = () => {
//     return (
//         <svg
//             aria-label="Share"
//             color=""
//             fill="rgb(243, 245, 247)"
//             height="20"
//             role="img"
//             viewBox="0 0 24 24"
//             width="20"
//         >
//             <title>Share</title>
//             <line
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 x1="22"
//                 x2="9.218"
//                 y1="3"
//                 y2="10.083"
//             ></line>
//             <polygon
//                 fill="none"
//                 points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
//                 stroke="currentColor"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//             ></polygon>
//         </svg>
//     );
// };
