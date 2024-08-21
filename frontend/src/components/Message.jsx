import {
  Avatar,
  Box,
  IconButton,
  Flex,
  Image,
  Skeleton,
  Text,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All, BsChevronDown } from "react-icons/bs"; // Import the down icon
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

// List of restricted words
const restrictedWords = [
  // Offensive language and other restricted words
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
  
  // Chakra UI state for the popout menu
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              {/* Start of menu button */}
              <Menu isOpen={isOpen} onClose={onClose}>
                <MenuButton
                  as={IconButton}
                  icon={<BsChevronDown />}
                  size="xs"
                  fontSize="10px"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-4px"
                  right="-4px"
                  onClick={onOpen}
                  borderRadius="full"
                  aria-label="More options"
                />
                <MenuItems
                  bg="rgba(255, 255, 255, 0.8)" // Subtle blur effect
                  borderRadius="md"
                  boxShadow="md"
                  p={2}
                >
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuItems>
              </Menu>
              {/* End of menu button */}
              <Text color={"white"}>{message.text}</Text>
              <Box
                alignSelf={"flex-end"}
                ml={1}
                color={message.seen ? "blue.400" : ""}
                fontWeight={"bold"}
              >
                <BsCheck2All size={16} />
              </Box>
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
              {/* Start of menu button */}
              <Menu isOpen={isOpen} onClose={onClose}>
                <MenuButton
                  as={IconButton}
                  icon={<BsChevronDown />}
                  size="2xs"
                  fontSize="6px"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  onClick={onOpen}
                  borderRadius="full"
                  aria-label="More options"
                />
                <MenuItems
                  bg="rgba(255, 255, 255, 0.8)" // Subtle blur effect
                  borderRadius="md"
                  boxShadow="md"
                  p={2}
                >
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuItems>
              </Menu>
              {/* End of menu button */}
              <Box
                alignSelf={"flex-end"}
                ml={1}
                color={message.seen ? "blue.400" : ""}
                fontWeight={"bold"}
              >
                <BsCheck2All size={16} />
              </Box>
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
              {/* Start of menu button */}
              <Menu isOpen={isOpen} onClose={onClose}>
                <MenuButton
                  as={IconButton}
                  icon={<BsChevronDown />}
                  size="2xs"
                  fontSize="6px"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  onClick={onOpen}
                  borderRadius="full"
                  aria-label="More options"
                />
                <MenuItems
                  bg="rgba(255, 255, 255, 0.8)" // Subtle blur effect
                  borderRadius="md"
                  boxShadow="md"
                  p={2}
                >
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuItems>
              </Menu>
              {/* End of menu button */}
              <Text color={"black"}>{message.text}</Text>
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
              {/* Start of menu button */}
              <Menu isOpen={isOpen} onClose={onClose}>
                <MenuButton
                  as={IconButton}
                  icon={<BsChevronDown />}
                  size="2xs"
                  fontSize="6px"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  onClick={onOpen}
                  borderRadius="full"
                  aria-label="More options"
                />
                <MenuItems
                  bg="rgba(255, 255, 255, 0.8)" // Subtle blur effect
                  borderRadius="md"
                  boxShadow="md"
                  p={2}
                >
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuItems>
              </Menu>
              {/* End of menu button */}
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Message;
