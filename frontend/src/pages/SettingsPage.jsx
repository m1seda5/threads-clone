// version one without language switcher
// import { Button, Text } from "@chakra-ui/react";
// import useShowToast from "../hooks/useShowToast";
// import useLogout from "../hooks/useLogout";

// export const SettingsPage = () => {
// 	const showToast = useShowToast();
// 	const logout = useLogout();

// 	const freezeAccount = async () => {
// 		if (!window.confirm("Are you sure you want to freeze your account?")) return;

// 		try {
// 			const res = await fetch("/api/users/freeze", {
// 				method: "PUT",
// 				headers: { "Content-Type": "application/json" },
// 			});
// 			const data = await res.json();

// 			if (data.error) {
// 				return showToast("Error", data.error, "error");
// 			}
// 			if (data.success) {
// 				await logout();
// 				showToast("Success", "Your account has been frozen", "success");
// 			}
// 		} catch (error) {
// 			showToast("Error", error.message, "error");
// 		}
// 	};

// 	return (
// 		<>
// 			<Text my={1} fontWeight={"bold"}>
// 				Freeze Your Account
// 			</Text>
// 			<Text my={1}>You can unfreeze your account anytime by logging in.</Text>
// 			<Button size={"sm"} colorScheme='red' onClick={freezeAccount}>
// 				Freeze
// 			</Button>
// 		</>
// 	);
// };


// version 2
import { Button, Text, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

export const SettingsPage = () => {
	const { t, i18n } = useTranslation(); // Initialize useTranslation hook
	const showToast = useShowToast();
	const logout = useLogout();

	const freezeAccount = async () => {
		if (!window.confirm(t("Are you sure you want to freeze your account?"))) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast(t("Error"), data.error, "error");
			}
			if (data.success) {
				await logout();
				showToast(t("Success"), t("Your account has been frozen"), "success");
			}
		} catch (error) {
			showToast(t("Error"), error.message, "error");
		}
	};

	const changeLanguage = (language) => {
		i18n.changeLanguage(language); // Change the language of the app
	};

	return (
		<>
			<Text my={1} fontWeight={"bold"}>
				{t("Freeze Your Account")}
			</Text>
			<Text my={1}>{t("You can unfreeze your account anytime by logging in.")}</Text>
			<Button size={"sm"} colorScheme='red' onClick={freezeAccount}>
				{t("Freeze")}
			</Button>

			{/* Language Change Buttons */}
			<Text mt={4} fontWeight={"bold"}>
				{t("Change Language")}
			</Text>
			<HStack spacing={4} mt={2}>
				<Button colorScheme='blue' onClick={() => changeLanguage('en')}>
					English
				</Button>
				<Button colorScheme='green' onClick={() => changeLanguage('zh')}>
					中文 (Mandarin)
				</Button>
			</HStack>
		</>
	);
};
