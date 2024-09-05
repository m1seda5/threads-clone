// // version 1 original 
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


//  version 2 this is the animated posts with green tint (this is before the disabled suggested users)
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

// this is is home page with sugggested users disable version 3 working
// import { Box, Flex, Spinner } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import Post from "../components/Post";
// import { useRecoilState } from "recoil";
// import postsAtom from "../atoms/postsAtom";
// // import SuggestedUsers from "../components/SuggestedUsers"; // Commented out the import

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
// 		<Flex gap="10" alignItems={"flex-start"}>
// 			<Box flex={70}>
// 				{!loading && posts.length === 0 && (
// 					<h1>welcome  to pear you have succesfully created an account login in to see the latest brookhouse news.</h1>
// 				)}

// 				{loading && (
// 					<Flex justifyContent="center">
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

// 			{/* 
// 			<Box
// 				flex={30}
// 				display={{
// 					base: "none",
// 					md: "block",
// 				}}
// 			>
// 				<SuggestedUsers />
// 			</Box>
// 			*/}
// 		</Flex>
// 	);
// };

// export default HomePage;


// adding a  new translation and testing it out on theappliaction
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import { useTranslation } from "react-i18next"; // Import the translation hook

const HomePage = () => {
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	const { t } = useTranslation(); // Hook for translations

	useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast(t("Error"), data.error, "error"); // Translated text
					return;
				}
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast(t("Error"), error.message, "error"); // Translated text
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts, t]);

	return (
		<Flex gap="10" alignItems={"flex-start"}>
			<Box flex={70}>
				{!loading && posts.length === 0 && (
					<h1>{t('Welcome to Pear! You have successfully created an account. Log in to see the latest Brookhouse news.')}</h1>
				)}

				{loading && (
					<Flex justifyContent="center">
						<Spinner size="xl" />
					</Flex>
				)}

				{posts.map((post) => (
					<Box
						key={post._id}
						borderWidth="1px"
						borderRadius="lg"
						p={4}
						mb={6}
						boxShadow="sm"
						transition="all 0.3s ease-in-out"
						_hover={{
							transform: "scale(1.05) rotate(1deg)",
							boxShadow: "lg",
							backgroundColor: "teal.50",
						}}
					>
						<Post post={post} postedBy={post.postedBy} />
					</Box>
				))}
			</Box>
		</Flex>
	);
};

export default HomePage;
