import { useState, useEffect } from "react";
import useShowToast from "./useShowToast";

const useFetchPosts = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch("/api/posts"); // Adjust the endpoint if needed
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

		fetchPosts();
	}, [showToast]);

	return { posts, loading };
};

export default useFetchPosts;
