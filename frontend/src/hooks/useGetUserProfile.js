// this is the previoous original version working
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useShowToast from "./useShowToast";

// const useGetUserProfile = () => {
// 	const [user, setUser] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const { username } = useParams();
// 	const showToast = useShowToast();

// 	useEffect(() => {
// 		const getUser = async () => {
// 			try {
// 				const res = await fetch(`/api/users/profile/${username}`);
// 				const data = await res.json();
// 				if (data.error) {
// 					showToast("Error", data.error, "error");
// 					return;
// 				}
// 				if (data.isFrozen) {
// 					setUser(null);
// 					return;
// 				}
// 				setUser(data);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		getUser();
// 	}, [username, showToast]);

// 	return { loading, user };
// };

// export default useGetUserProfile;


// this is the new version with the updated feature for feathcing posts upon account creation 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUserProfile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { username } = useParams();
	const showToast = useShowToast();

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`/api/users/profile/${username}`);
				const data = await res.json();

				// Start of integrated code
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}

				if (data.isFrozen) {
					showToast("Info", "This account is restricted", "info");
					setUser(null);
					return;
				}
				// End of integrated code

				setUser(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};

		getUser();
	}, [username, showToast]);

	return { loading, user };
};

export default useGetUserProfile;
