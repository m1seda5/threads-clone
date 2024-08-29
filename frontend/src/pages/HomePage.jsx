// version 1
// import { Box, Flex, Spinner } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import Post from "../components/Post";
// import { useRecoilState } from "recoil";
// import postsAtom from "../atoms/postsAtom";
// import SuggestedUsers from "../components/SuggestedUsers";

// const HomePage = () => {
// 	const [posts, setPosts] = useRecoilState(postsAtom);
// 	const [loading, setLoading] = useState(true);
// 	const showToast = useShowToast();
// 	useEffect(() => {
// 		const getFeedPosts = async () => {
// 			setLoading(true);
// 			setPosts([]);
// 			try {
// 				const res = await fetch("/api/posts/feed");
// 				const data = await res.json();
// 				if (data.error) {
// 					showToast("Error", data.error, "error");
// 					return;
// 				}
// 				console.log(data);
// 				setPosts(data);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		getFeedPosts();
// 	}, [showToast, setPosts]);

// 	return (
// 		<Flex gap='10' alignItems={"flex-start"}>
// 			<Box flex={70}>
// 				{!loading && posts.length === 0 && <h1>Follow users for the latest Brookhouse news.</h1>}

// 				{loading && (
// 					<Flex justify='center'>
// 						<Spinner size='xl' />
// 					</Flex>
// 				)}

// 				{posts.map((post) => (
// 					<Post key={post._id} post={post} postedBy={post.postedBy} />
// 				))}
// 			</Box>
// 			<Box
// 				flex={30}
// 				display={{
// 					base: "none",
// 					md: "block",
// 				}}
// 			>
// 				<SuggestedUsers />
// 			</Box>
// 		</Flex>
// 	);
// };

// export default HomePage;

// version 2
// import { Box, Flex, Spinner } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import Post from "../components/Post";
// import { useRecoilState } from "recoil";
// import postsAtom from "../atoms/postsAtom";
// import SuggestedUsers from "../components/SuggestedUsers";

// const HomePage = () => {
// 	const [posts, setPosts] = useRecoilState(postsAtom);
// 	const [loading, setLoading] = useState(true);
// 	const showToast = useShowToast();

// 	useEffect(() => {
// 		const getFeedPosts = async () => {
// 			setLoading(true);
// 			setPosts([]);
// 			try {im
// 				const res = await fetch("/api/posts/feed");
// 				const data = await res.json();
// 				if (data.error) {
// 					showToast("Error", data.error, "error");
// 					return;
// 				}
// 				console.log(data);
// 				setPosts(data);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		getFeedPosts();
// 	}, [showToast, setPosts]);

// 	return (
// 		<Flex gap="10" alignItems={"flex-start"}>
// 			<Box flex={70}>
// 				{!loading && posts.length === 0 && (
// 					<h1>Follow users for the latest Brookhouse news.</h1>
// 				)}

// 				{loading && (
// 					<Flex justify="center">
// 						<Spinner size="xl" />
// 					</Flex>
// 				)}

// 				{posts.map((post) => (
// 					<Box
// 						key={post._id}
// 						borderWidth="1px"
// 						borderRadius="lg"
// 						p={4}
// 						mb={6}
// 						boxShadow="sm"
// 						transition="all 0.3s ease-in-out"
// 						_hover={{
// 							transform: "scale(1.05) rotate(1deg)",
// 							boxShadow: "lg",
// 							backgroundColor: "teal.50",
// 						}}
// 					>
// 						{/* Assuming Post component takes care of image and content */}
// 						<Post post={post} postedBy={post.postedBy} />
// 					</Box>
// 				))}
// 			</Box>

// 			<Box
// 				flex={30}
// 				display={{
// 					base: "none",
// 					md: "block",
// 				}}
// 			>
// 				<SuggestedUsers />
// 			</Box>
// 		</Flex>
// 	);
// };

// export default HomePage;

//version 3
import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";

const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const user = useRecoilValue(userAtom);
	const logout = useLogout();
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const { pathname } = useLocation();

	return (
		<Flex justifyContent="center" mt={6} mb="12" gap={10}>
			{user && (
				<Link
					as={RouterLink}
					to="/"
					color={pathname === "/" ? "teal.500" : "inherit"}
					_hover={{ color: "teal.500", transform: "scale(1.1)" }}
					_active={{ color: "teal.500", transform: "scale(1.1)" }}
					transition="all 0.3s ease-in-out"
				>
					<AiFillHome size={24} />
				</Link>
			)}
			{!user && (
				<Link
					as={RouterLink}
					to="/auth"
					onClick={() => setAuthScreen("login")}
					color={pathname === "/auth" ? "teal.500" : "inherit"}
					_hover={{ color: "teal.500", transform: "scale(1.1)" }}
					_active={{ color: "teal.500", transform: "scale(1.1)" }}
					transition="all 0.3s ease-in-out"
				>
					Login
				</Link>
			)}

			<Image
				cursor="pointer"
				alt="logo"
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
				_hover={{ transform: "rotate(20deg) scale(1.1)" }}
				transition="all 0.3s ease-in-out"
			/>

			{user && (
				<Flex alignItems="center" gap={10}>
					<Link
						as={RouterLink}
						to={`/${user.username}`}
						color={pathname === `/${user.username}` ? "teal.500" : "inherit"}
						_hover={{ color: "teal.500", transform: "scale(1.1)" }}
						_active={{ color: "teal.500", transform: "scale(1.1)" }}
						transition="all 0.3s ease-in-out"
					>
						<RxAvatar size={24} />
					</Link>
					<Link
						as={RouterLink}
						to="/chat"
						color={pathname === "/chat" ? "teal.500" : "inherit"}
						_hover={{ color: "teal.500", transform: "scale(1.1)" }}
						_active={{ color: "teal.500", transform: "scale(1.1)" }}
						transition="all 0.3s ease-in-out"
					>
						<BsFillChatQuoteFill size={20} />
					</Link>
					<Link
						as={RouterLink}
						to="/settings"
						color={pathname === "/settings" ? "teal.500" : "inherit"}
						_hover={{ color: "teal.500", transform: "scale(1.1) rotate(20deg)" }}
						_active={{ color: "teal.500", transform: "scale(1.1) rotate(20deg)" }}
						transition="all 0.3s ease-in-out"
					>
						<MdOutlineSettings size={20} />
					</Link>
					<Button
						size="xs"
						onClick={logout}
						_hover={{ bg: "teal.500", color: "white", transform: "scale(1.05)" }}
						transition="all 0.3s ease-in-out"
					>
						<FiLogOut size={20} />
					</Button>
				</Flex>
			)}

			{!user && (
				<Link
					as={RouterLink}
					to="/auth"
					onClick={() => setAuthScreen("signup")}
					color={pathname === "/auth" ? "teal.500" : "inherit"}
					_hover={{ color: "teal.500", transform: "scale(1.1)" }}
					_active={{ color: "teal.500", transform: "scale(1.1)" }}
					transition="all 0.3s ease-in-out"
				>
					Sign up
				</Link>
			)}
		</Flex>
	);
};

export default Header;
