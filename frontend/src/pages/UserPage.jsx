//  this is a working version 1 
// import { useEffect, useState } from "react";
// import UserHeader from "../components/UserHeader";
// import { useParams } from "react-router-dom";
// import useShowToast from "../hooks/useShowToast";
// import { Flex, Spinner } from "@chakra-ui/react";
// import Post from "../components/Post";
// import useGetUserProfile from "../hooks/useGetUserProfile";
// import { useRecoilState } from "recoil";
// import postsAtom from "../atoms/postsAtom";

// const UserPage = () => {
// 	const { user, loading } = useGetUserProfile();
// 	const { username } = useParams();
// 	const showToast = useShowToast();
// 	const [posts, setPosts] = useRecoilState(postsAtom);
// 	const [fetchingPosts, setFetchingPosts] = useState(true);

// 	useEffect(() => {
// 		const getPosts = async () => {
// 			if (!user) return;
// 			setFetchingPosts(true);
// 			try {
// 				const res = await fetch(`/api/posts/user/${username}`);
// 				const data = await res.json();
// 				console.log(data);
// 				setPosts(data);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 				setPosts([]);
// 			} finally {
// 				setFetchingPosts(false);
// 			}
// 		};

// 		getPosts();
// 	}, [username, showToast, setPosts, user]);

// 	if (!user && loading) {
// 		return (
// 			<Flex justifyContent={"center"}>
// 				<Spinner size={"xl"} />
// 			</Flex>
// 		);
// 	}

// 	if (!user && !loading) return <h1>User not found</h1>;

// 	return (
// 		<>
// 			<UserHeader user={user} />

// 			{!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
// 			{fetchingPosts && (
// 				<Flex justifyContent={"center"} my={12}>
// 					<Spinner size={"xl"} />
// 				</Flex>
// 			)}

// 			{posts.map((post) => (
// 				<Post key={post._id} post={post} postedBy={post.postedBy} />
// 			))}
// 		</>
// 	);
// };

// export default UserPage;


// version with verification
import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
    const { user, loading } = useGetUserProfile(); // Logged-in user's profile
    const { username } = useParams(); // Target user (the profile you are visiting)
    const showToast = useShowToast();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [fetchingPosts, setFetchingPosts] = useState(true);

    const handleDoubleClick = async () => {
        if (user.isAdmin) {
            try {
                // Fetch the verification PNG (example URL)
                const verificationImageUrl = "/path/to/verification.png"; // Replace with actual URL

                // Make request to award verification with the URL
                const res = await fetch(`/api/users/award-verification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`, // Add authorization header
                    },
                    body: JSON.stringify({
                        userId: user._id, // Target user ID (the user being visited)
                        verificationImageUrl, // Include the verification image URL
                    }),
                });

                const data = await res.json();
                if (res.ok) {
                    showToast("Success", "Verification awarded!", "success");
                } else {
                    showToast("Error", data.error || "Failed to award verification", "error");
                }
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        }
    };

    useEffect(() => {
        const getPosts = async () => {
            if (!user) return;
            setFetchingPosts(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setPosts([]);
            } finally {
                setFetchingPosts(false);
            }
        };

        getPosts();
    }, [username, showToast, setPosts, user]);

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;

    return (
        <>
            {/* Admin can double-click on UserHeader to award verification */}
            <div onDoubleClick={handleDoubleClick}>
                <UserHeader user={user} />
            </div>

            {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
            {fetchingPosts && (
                <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                </Flex>
            )}

            {posts.map((post) => (
                <Post key={post._id} post={post} postedBy={post.postedBy} />
            ))}
        </>
    );
};

export default UserPage;
