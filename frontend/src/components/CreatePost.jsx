// this is a working version
// import { AddIcon } from "@chakra-ui/icons";
// import {
// 	Button,
// 	CloseButton,
// 	Flex,
// 	FormControl,
// 	Image,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalOverlay,
// 	Text,
// 	Textarea,
// 	useColorModeValue,
// 	useDisclosure,
// } from "@chakra-ui/react";
// import { useRef, useState } from "react";
// import usePreviewImg from "../hooks/usePreviewImg";
// import { BsFillImageFill } from "react-icons/bs";
// import { useRecoilState, useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import useShowToast from "../hooks/useShowToast";
// import postsAtom from "../atoms/postsAtom";
// import { useParams } from "react-router-dom";

// const MAX_CHAR = 500;

// const CreatePost = () => {
// 	const { isOpen, onOpen, onClose } = useDisclosure();
// 	const [postText, setPostText] = useState("");
// 	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
// 	const imageRef = useRef(null);
// 	const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
// 	const user = useRecoilValue(userAtom);
// 	const showToast = useShowToast();
// 	const [loading, setLoading] = useState(false);
// 	const [posts, setPosts] = useRecoilState(postsAtom);
// 	const { username } = useParams();

// 	const handleTextChange = (e) => {
// 		const inputText = e.target.value;

// 		if (inputText.length > MAX_CHAR) {
// 			const truncatedText = inputText.slice(0, MAX_CHAR);
// 			setPostText(truncatedText);
// 			setRemainingChar(0);
// 		} else {
// 			setPostText(inputText);
// 			setRemainingChar(MAX_CHAR - inputText.length);
// 		}
// 	};

// 	const handleCreatePost = async () => {
// 		setLoading(true);
// 		try {
// 			const res = await fetch("/api/posts/create", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
// 			});

// 			const data = await res.json();
// 			if (data.error) {
// 				showToast("Error", data.error, "error");
// 				return;
// 			}
// 			showToast("Success", "Post created successfully", "success");
// 			if (username === user.username) {
// 				setPosts([data, ...posts]);
// 			}
// 			onClose();
// 			setPostText("");
// 			setImgUrl("");
// 		} catch (error) {
// 			showToast("Error", error, "error");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<>
// 			<Button
// 				position={"fixed"}
// 				bottom={10}
// 				right={5}
// 				bg={useColorModeValue("gray.300", "gray.dark")}
// 				onClick={onOpen}
// 				size={{ base: "sm", sm: "md" }}
// 			>
// 				<AddIcon />
// 			</Button>

// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />

// 				<ModalContent>
// 					<ModalHeader>Create Post</ModalHeader>
// 					<ModalCloseButton />
// 					<ModalBody pb={6}>
// 						<FormControl>
// 							<Textarea
// 								placeholder='Post content goes here..'
// 								onChange={handleTextChange}
// 								value={postText}
// 							/>
// 							<Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.800"}>
// 								{remainingChar}/{MAX_CHAR}
// 							</Text>

// 							<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

// 							<BsFillImageFill
// 								style={{ marginLeft: "5px", cursor: "pointer" }}
// 								size={16}
// 								onClick={() => imageRef.current.click()}
// 							/>
// 						</FormControl>

// 						{imgUrl && (
// 							<Flex mt={5} w={"full"} position={"relative"}>
// 								<Image src={imgUrl} alt='Selected img' />
// 								<CloseButton
// 									onClick={() => {
// 										setImgUrl("");
// 									}}
// 									bg={"gray.800"}
// 									position={"absolute"}
// 									top={2}
// 									right={2}
// 								/>
// 							</Flex>
// 						)}
// 					</ModalBody>

// 					<ModalFooter>
// 						<Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
// 							Post
// 						</Button>
// 					</ModalFooter>
// 				</ModalContent>
// 			</Modal>
// 		</>
// 	);
// };

// export default CreatePost;


// // this has transaltions working 
// import { AddIcon } from "@chakra-ui/icons";
// import {
// 	Button,
// 	CloseButton,
// 	Flex,
// 	FormControl,
// 	Image,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalOverlay,
// 	Text,
// 	Textarea,
// 	useColorModeValue,
// 	useDisclosure,
// } from "@chakra-ui/react";
// import { useRef, useState, useEffect } from "react";
// import usePreviewImg from "../hooks/usePreviewImg";
// import { BsFillImageFill } from "react-icons/bs";
// import { useRecoilState, useRecoilValue } from "recoil";
// import userAtom from "../atoms/userAtom";
// import useShowToast from "../hooks/useShowToast";
// import postsAtom from "../atoms/postsAtom";
// import { useParams } from "react-router-dom";
// import { useTranslation } from 'react-i18next';  // Import useTranslation

// const MAX_CHAR = 500;

// const CreatePost = () => {
// 	const { isOpen, onOpen, onClose } = useDisclosure();
// 	const [postText, setPostText] = useState("");
// 	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
// 	const imageRef = useRef(null);
// 	const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
// 	const user = useRecoilValue(userAtom);
// 	const showToast = useShowToast();
// 	const [loading, setLoading] = useState(false);
// 	const [posts, setPosts] = useRecoilState(postsAtom);
// 	const { username } = useParams();
// 	const { t, i18n } = useTranslation();  // Initialize the translation hook

// 	useEffect(() => {
// 		const handleLanguageChange = (lng) => {
// 			// Do nothing; the translations are handled by react-i18next
// 		};

// 		i18n.on('languageChanged', handleLanguageChange);  // Listen for language change

// 		return () => {
// 			i18n.off('languageChanged', handleLanguageChange);  // Cleanup on component unmount
// 		};
// 	}, [i18n]);

// 	const handleTextChange = (e) => {
// 		const inputText = e.target.value;

// 		if (inputText.length > MAX_CHAR) {
// 			const truncatedText = inputText.slice(0, MAX_CHAR);
// 			setPostText(truncatedText);
// 			setRemainingChar(0);
// 		} else {
// 			setPostText(inputText);
// 			setRemainingChar(MAX_CHAR - inputText.length);
// 		}
// 	};

// 	const handleCreatePost = async () => {
// 		setLoading(true);
// 		try {
// 			const res = await fetch("/api/posts/create", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
// 			});

// 			const data = await res.json();
// 			if (data.error) {
// 				showToast(t("Error"), data.error, "error");
// 				return;
// 			}
// 			showToast(t("Success"), t("Post created successfully"), "success");
// 			if (username === user.username) {
// 				setPosts([data, ...posts]);
// 			}
// 			onClose();
// 			setPostText("");
// 			setImgUrl("");
// 		} catch (error) {
// 			showToast(t("Error"), error.message, "error");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<>
// 			<Button
// 				position={"fixed"}
// 				bottom={10}
// 				right={5}
// 				bg={useColorModeValue("gray.300", "gray.dark")}
// 				onClick={onOpen}
// 				size={{ base: "sm", sm: "md" }}
// 				aria-label={t("Create Post")}
// 			>
// 				<AddIcon />
// 			</Button>

// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />
// 				<ModalContent>
// 					<ModalHeader>{t("Create Post")}</ModalHeader>
// 					<ModalCloseButton />
// 					<ModalBody pb={6}>
// 						<FormControl>
// 							<Textarea
// 								placeholder={t('Post content goes here..')}
// 								onChange={handleTextChange}
// 								value={postText}
// 							/>
// 							<Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.800"}>
// 								{remainingChar}/{MAX_CHAR}
// 							</Text>

// 							<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

// 							<BsFillImageFill
// 								style={{ marginLeft: "5px", cursor: "pointer" }}
// 								size={16}
// 								onClick={() => imageRef.current.click()}
// 								aria-label={t("Add Image")}
// 							/>
// 						</FormControl>

// 						{imgUrl && (
// 							<Flex mt={5} w={"full"} position={"relative"}>
// 								<Image src={imgUrl} alt={t('Selected img')} />
// 								<CloseButton
// 									onClick={() => {
// 										setImgUrl("");
// 									}}
// 									bg={"gray.800"}
// 									position={"absolute"}
// 									top={2}
// 									right={2}
// 								/>
// 							</Flex>
// 						)}
// 					</ModalBody>

// 					<ModalFooter>
// 						<Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
// 							{t("Post")}
// 						</Button>
// 					</ModalFooter>
// 				</ModalContent>
// 			</Modal>
// 		</>
// 	);
// };

// export default CreatePost;


// updated creat post with the roles based stuff 
import { AddIcon } from "@chakra-ui/icons";
import {
    Button,
    CloseButton,
    Flex,
    FormControl,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    Select,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const MAX_CHAR = 500;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postText, setPostText] = useState("");
    const [targetAudience, setTargetAudience] = useState("all"); // Default to 'all'
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const imageRef = useRef(null);
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const user = useRecoilValue(userAtom);
    const showToast = useShowToast();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useRecoilState(postsAtom);
    const { username } = useParams();
    const { t } = useTranslation();

    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0);
        } else {
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length);
        }
    };

    const handleCreatePost = async () => {
        setLoading(true);
        try {
            // Create the payload for the post
            const payload = {
                postedBy: user._id,
                text: postText,
                img: imgUrl,
            };
    
            // Only include targetAudience for teachers, set it to null for students
            if (user.role === "teacher") {
                payload.targetAudience = targetAudience;
            } else {
                payload.targetAudience = null; // Set to null for students
            }
    
            // Send the post request to the server
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            const data = await res.json();
            if (data.error) {
                showToast(t("Error"), data.error, "error");
                return;
            }
            showToast(t("Success"), t("Post created successfully"), "success");
    
            // Add the new post to the state if it should be visible to the user
            if (
                data.targetAudience === "all" || 
                data.targetAudience === user.yearGroup || 
                user.role === "student"
            ) {
                if (username === user.username) {
                    setPosts([data, ...posts]);
                }
            }
    
            // Reset form states after posting
            onClose();
            setPostText("");
            setImgUrl("");
            setTargetAudience(user.role === "teacher" ? "all" : ""); // Reset based on role
    
        } catch (error) {
            showToast(t("Error"), error.message, "error");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={5}
                bg={useColorModeValue("gray.300", "gray.dark")}
                onClick={onOpen}
                size={{ base: "sm", sm: "md" }}
                aria-label={t("Create Post")}
            >
                <AddIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("Create Post")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea
                                placeholder={t('Post content goes here..')}
                                onChange={handleTextChange}
                                value={postText}
                            />
                            <Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.800"}>
                                {remainingChar}/{MAX_CHAR}
                            </Text>

                            <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />
                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => imageRef.current.click()}
                                aria-label={t("Add Image")}
                            />

                            {/* Dropdown for Target Audience */}
                            {user.role === "teacher" && (
                                <Select
                                    mt={4}
                                    value={targetAudience}
                                    onChange={(e) => setTargetAudience(e.target.value)}
                                >
                                    <option value="all">{t("All Students")}</option>
                                    <option value="Year 12">{t("Year 12")}</option>
                                    <option value="Year 13">{t("Year 13")}</option>
                                </Select>
                            )}
                        </FormControl>

                        {imgUrl && (
                            <Flex mt={5} w={"full"} position={"relative"}>
                                <Image src={imgUrl} alt={t('Selected img')} />
                                <CloseButton
                                    onClick={() => setImgUrl("")}
                                    bg={"gray.800"}
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                />
                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                            {t("Post")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePost;
