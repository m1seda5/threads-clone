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

// version 3
import { Box, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();

	// Colors for light and dark modes
	const bgHover = useColorModeValue("teal.100", "teal.500");
	const postBg = useColorModeValue("white", "gray.800");
	const textColor = useColorModeValue("gray.800", "white");

	useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts]);

	return (
		<Flex gap="10" alignItems={"flex-start"}>
			<Box flex={70}>
				{!loading && posts.length === 0 && (
					<h1 style={{ color: textColor }}>Follow users for the latest Brookhouse news.</h1>
				)}

				{loading && (
					<Flex justify="center">
						<Spinner size="xl" />
					</Flex>
				)}

				{posts.map((post) => (
					<Box
						key={post._id}
						bg={postBg}
						borderWidth="1px"
						borderRadius="lg"
						p={4}
						mb={6}
						boxShadow="sm"
						transition="transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease"
						_hover={{
							transform: "scale(1.03) rotate(0.5deg)",
							boxShadow: "lg",
							backgroundColor: bgHover,
						}}
					>
						{/* Assuming Post component takes care of image and content */}
						<Post post={post} postedBy={post.postedBy} />
					</Box>
				))}
			</Box>

			<Box
				flex={30}
				display={{
					base: "none",
					md: "block",
				}}
			>
				<SuggestedUsers />
			</Box>
		</Flex>
	);
};

export default HomePage;
