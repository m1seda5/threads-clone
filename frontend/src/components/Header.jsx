// import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import userAtom from "../atoms/userAtom";
// import { AiFillHome } from "react-icons/ai";
// import { RxAvatar } from "react-icons/rx";
// import { Link as RouterLink } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
// import useLogout from "../hooks/useLogout";
// import authScreenAtom from "../atoms/authAtom";
// import { BsFillChatQuoteFill } from "react-icons/bs";
// import { MdOutlineSettings } from "react-icons/md";

// const Header = () => {
// 	const { colorMode, toggleColorMode } = useColorMode();
// 	const user = useRecoilValue(userAtom);
// 	const logout = useLogout();
// 	const setAuthScreen = useSetRecoilState(authScreenAtom);

// 	return (
// 		<Flex justifyContent={"center"} mt={6} mb='12' gap={21}>
// 			{user && (
// 				<Link as={RouterLink} to='/'>
// 					<AiFillHome size={24} />
// 				</Link>
// 			)}
// 			{!user && (
// 				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")}>
// 					Login
// 				</Link>
// 			)}

// 			<Image
// 				cursor={"pointer"}
// 				alt='logo'
// 				w={6}
// 				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
// 				onClick={toggleColorMode}
// 			/>

// 			{user && (
// 				<Flex alignItems={"center"} gap={21}>
// 					<Link as={RouterLink} to={`/${user.username}`}>
// 						<RxAvatar size={24} />
// 					</Link>
// 					<Link as={RouterLink} to={`/chat`}>
// 						<BsFillChatQuoteFill size={20} />
// 					</Link>
// 					<Link as={RouterLink} to={`/settings`}>
// 						<MdOutlineSettings size={20} />
// 					</Link>
// 					<Button size={"xs"} onClick={logout}>
// 						<FiLogOut size={20} />
// 					</Button>
// 				</Flex>
// 			)}

// 			{!user && (
// 				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
// 					Sign up
// 				</Link>
// 			)}
// 		</Flex>
// 	);
// };

// export default Header;

import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
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

	return (
		<Flex justifyContent="center" mt={6} mb="12" gap={10}>
			{user && (
				<Link
					as={RouterLink}
					to="/"
					_hover={{ color: "teal.500", transform: "scale(1.1)" }}
					transition="all 0.2s ease-in-out"
				>
					<AiFillHome size={24} />
				</Link>
			)}
			{!user && (
				<Link
					as={RouterLink}
					to="/auth"
					onClick={() => setAuthScreen("login")}
					_hover={{ color: "teal.500", transform: "scale(1.1)" }}
					transition="all 0.2s ease-in-out"
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
						_hover={{ color: "teal.500", transform: "scale(1.1)" }}
						transition="all 0.2s ease-in-out"
					>
						<RxAvatar size={24} />
					</Link>
					<Link
						as={RouterLink}
						to="/chat"
						_hover={{ color: "teal.500", transform: "scale(1.1)" }}
						transition="all 0.2s ease-in-out"
					>
						<BsFillChatQuoteFill size={20} />
					</Link>
					<Link
						as={RouterLink}
						to="/settings"
						_hover={{ color: "teal.500", transform: "scale(1.1)" }}
						transition="all 0.2s ease-in-out"
					>
						<MdOutlineSettings size={20} />
					</Link>
					<Button
						size="xs"
						onClick={logout}
						_hover={{ bg: "teal.500", color: "white", transform: "scale(1.05)" }}
						transition="all 0.2s ease-in-out"
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
					_hover={{ color: "teal.500", transform: "scale(1.1)" }}
					transition="all 0.2s ease-in-out"
				>
					Sign up
				</Link>
			)}
		</Flex>
	);
};

export default Header;
