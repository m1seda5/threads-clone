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
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons"; // Import the down icon
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

// List of restricted words
const restrictedWords = [
  // Offensive language, derogatory terms, hate speech, etc.
  // (List remains unchanged)
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
        <Flex
          gap={2}
          alignSelf={"flex-end"}
          position="relative"
          maxW="100%" // Adjust to avoid horizontal scroll
          flexWrap="wrap" // Ensure content wraps within the container
        >
          {message.text && (
            <Flex
              bg={"gray.100"} // Default background color
              p={1}
              borderRadius={"md"}
              position="relative"
            >
              {/* Start of popout menu with delete option */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="xs"
                  fontSize="10px"
                  variant="ghost"
                  position="absolute"
                  top="-4px"
                  right="-4px"
                  borderRadius="full"
                  aria-label="Options"
                />
                <MenuList backdropFilter="blur(10px)">
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuList>
              </Menu>
              {/* End of popout menu */}
              <Text>{message.text}</Text>
              <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"}>
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
              {/* Start of popout menu with delete option */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="2xs"
                  fontSize="6px"
                  variant="ghost"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  borderRadius="full"
                  aria-label="Options"
                />
                <MenuList backdropFilter="blur(10px)">
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuList>
              </Menu>
              {/* End of popout menu */}
              <Box alignSelf={"flex-end"} ml={1} fontWeight={"bold"}>
                <BsCheck2All size={16} />
              </Box>
            </Flex>
          )}
          <Avatar src={user.profilePic} w="7" h={7} />
        </Flex>
      ) : (
        <Flex
          gap={2}
          position="relative"
          maxW="100%" // Adjust to avoid horizontal scroll
          flexWrap="wrap" // Ensure content wraps within the container
        >
          <Avatar src={selectedConversation.userProfilePic} w="7" h={7} />
          {message.text && (
            <Flex
              position="relative"
              bg={"gray.100"} // Default background color
              p={1}
              borderRadius={"md"}
            >
              <Text>{message.text}</Text>
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
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Message;
