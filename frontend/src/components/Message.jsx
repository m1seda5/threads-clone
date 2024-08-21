import {
  Avatar,
  Box,
  IconButton,
  Flex,
  Image,
  Skeleton,
  Text,
<<<<<<< HEAD
 } from "@chakra-ui/react";
 import { selectedConversationAtom } from "../atoms/messagesAtom";
 import { useRecoilValue } from "recoil";
 import userAtom from "../atoms/userAtom";
 import { BsCheck2All } from "react-icons/bs";
 import { CloseIcon } from "@chakra-ui/icons"; // Import the close icon
 import { useState } from "react";
 // List of restricted words
 const restrictedWords = [
=======
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons"; // Replace CloseIcon with ChevronDownIcon
import { useState } from "react";

const restrictedWords = [
>>>>>>> parent of 1729e5b (fixing bugs)
  // Offensive language
  "fuck",
  "shit",
  "bitch",
  "cunt",
  "motherfucker",
  "asshole",
  "dick",
  "pussy",
  "cock",
  "slut",
  "whore",
  "faggot",
  "nigger",
  "chink",
  "gook",
  "spic",
  "raghead",
  "wetback",
 
 
  // Derogatory terms
  "retard",
  "cripple",
  "idiot",
  "moron",
  "dumbass",
  "lame",
  "loser",
 
 
  // Hate speech
  "terrorist",
  "racist",
  "bigot",
  "sexist",
  "homophobe",
  "xenophobe",
 
 
  // Insults and slurs
  "bastard",
  "scum",
  "pig",
  "skank",
  "tramp",
  "hoe",
  "slut",
  "bimbo",
 
 
  // Drugs and alcohol
  "crack",
  "heroin",
  "meth",
  "cocaine",
  "weed",
  "marijuana",
  "pot",
 
 
  // Sexual content
  "porn",
  "sex",
  "nude",
  "orgy",
  "rape",
  "molest",
  "incest",
 
 
  // Offensive phrases
  "go to hell",
  "kill yourself",
  "die",
  "you're a loser",
  "eat shit",
 
 
  // Additional common bad phrases
  "suck my dick",
  "blow job",
  "fist fuck",
  "cock sucking",
  "dickhead",
 ];
 
 
 // Function to check if a message contains any restricted words
 const isMessageRestricted = (text) => {
  return restrictedWords.some((word) => text.toLowerCase().includes(word));
 };
 const Message = ({ ownMessage, message, onDelete }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  const [imgLoaded, setImgLoaded] = useState(false);
  // Check if the message contains restricted words
  if (message.text && isMessageRestricted(message.text)) {
    return (
      <Flex justifyContent={"center"} p={2}>
        <Text color={"red.500"}>
          Message contains inappropriate content and was not sent.
        </Text>
      </Flex>
    );
  }
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"} position="relative">
          {message.text && (
            <Flex
              bg={"green.800"}
              maxW={"350px"}
              p={1}
              borderRadius={"md"}
              position="relative"
            >
<<<<<<< HEAD
              {/* Start of delete button */}
              <IconButton
                icon={<CloseIcon />}
                size="xs" // Extra small button
                fontSize="10px" // Adjust the icon size to make it smaller
                variant="ghost" // No background or border
                colorScheme="whiteAlpha" // Transparent background
                position="absolute"
                top="-4px" // Adjust position to fit better
                right="-4px" // Adjust position to fit better
                onClick={() => onDelete(message._id)} // Call onDelete with message ID
                borderRadius="full"
                aria-label="Delete message"
              />
              {/* End of delete button */}
=======
>>>>>>> parent of 1729e5b (fixing bugs)
              <Text color={"white"}>{message.text}</Text>
              <Box
                alignSelf={"flex-end"}
                ml={1}
                color={message.seen ? "blue.400" : ""}
                fontWeight={"bold"}
              >
                <BsCheck2All size={16} />
              </Box>
<<<<<<< HEAD
=======

              {/* Popout Menu */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-4px"
                  right="-4px"
                  aria-label="Options"
                />
                <MenuList backdropFilter="blur(8px)">
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuList>
              </Menu>
>>>>>>> parent of 1729e5b (fixing bugs)
            </Flex>
          )}
          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="Message image"
                borderRadius={4}
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}
          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"} position="relative">
              <Image src={message.img} alt="Message image" borderRadius={4} />
<<<<<<< HEAD
              {/* Start of delete button */}
              <IconButton
                icon={<CloseIcon />}
                size="2xs" // Smaller than extra small
                fontSize="6px" // Even smaller icon size
                variant="ghost" // No background or border
                colorScheme="whiteAlpha" // Transparent background
                position="absolute"
                top="-2px" // Keeps the current position
                right="-2px" // Keeps the current position
                onClick={() => onDelete(message._id)} // Call onDelete with message ID
                borderRadius="full"
                aria-label="Delete message"
              />
              {/* End of delete button */}
=======
>>>>>>> parent of 1729e5b (fixing bugs)
              <Box
                alignSelf={"flex-end"}
                ml={1}
                color={message.seen ? "blue.400" : ""}
                fontWeight={"bold"}
              >
                <BsCheck2All size={16} />
              </Box>
<<<<<<< HEAD
=======

              {/* Popout Menu */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  aria-label="Options"
                />
                <MenuList backdropFilter="blur(8px)">
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuList>
              </Menu>
>>>>>>> parent of 1729e5b (fixing bugs)
            </Flex>
          )}
          <Avatar src={user.profilePic} w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2} position="relative">
          <Avatar src={selectedConversation.userProfilePic} w="7" h={7} />
          {message.text && (
            <Flex
              position="relative"
              maxW={"350px"}
              bg={"gray.400"}
              p={1}
              borderRadius={"md"}
            >
<<<<<<< HEAD
              {/* Start of delete button */}
              <IconButton
                icon={<CloseIcon />}
                size="2xs" // Smaller than extra small
                fontSize="6px" // Even smaller icon size
                variant="ghost" // No background or border
                colorScheme="whiteAlpha" // Transparent background
                position="absolute"
                top="-2px" // Keeps the current position
                right="-2px" // Keeps the current position
                onClick={() => onDelete(message._id)} // Call onDelete with message ID
                borderRadius="full"
                aria-label="Delete message"
              />
              {/* End of delete button */}
              <Text color={"black"}>{message.text}</Text>
=======
              <Text color={"black"}>{message.text}</Text>

              {/* Popout Menu */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  aria-label="Options"
                />
                <MenuList backdropFilter="blur(8px)">
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuList>
              </Menu>
>>>>>>> parent of 1729e5b (fixing bugs)
            </Flex>
          )}
          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="Message image"
                borderRadius={4}
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}
          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"} position="relative">
              <Image src={message.img} alt="Message image" borderRadius={4} />
<<<<<<< HEAD
              {/* Start of delete button */}
              <IconButton
                icon={<CloseIcon />}
                size="2xs" // Smaller than extra small
                fontSize="6px" // Even smaller icon size
                variant="ghost" // No background or border
                colorScheme="whiteAlpha" // Transparent background
                position="absolute"
                top="-2px" // Keeps the current position
                right="-2px" // Keeps the current position
                onClick={() => onDelete(message._id)} // Call onDelete with message ID
                borderRadius="full"
                aria-label="Delete message"
              />
              {/* End of delete button */}
=======

              {/* Popout Menu */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="xs"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  aria-label="Options"
                />
                <MenuList backdropFilter="blur(8px)">
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuList>
              </Menu>
>>>>>>> parent of 1729e5b (fixing bugs)
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
 };
 export default Message;
 
 
 