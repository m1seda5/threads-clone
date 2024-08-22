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
import { ChevronDownIcon } from "@chakra-ui/icons";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

const restrictedWords = [
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
  // (Rest of the restricted words remain unchanged)
];

const isMessageRestricted = (text) => {
  return restrictedWords.some((word) => text.toLowerCase().includes(word));
};

const Message = ({ ownMessage, message, onDelete }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  const [imgLoaded, setImgLoaded] = useState(false);

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
          overflowX="hidden" // Prevent horizontal scrolling
        >
          {message.text && (
            <Flex
              bg={"green.800"}
              maxW={"350px"}
              p={1}
              borderRadius={"md"}
              position="relative"
              overflowX="hidden"
            >
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="xs"
                  fontSize="10px"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-4px"
                  right="-4px"
                  borderRadius="full"
                  aria-label="Options"
                />
                <MenuList bg={"green.800"} backdropFilter="blur(10px)">
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuList>
              </Menu>
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
            <Flex mt={5} w={"200px"} position="relative" overflowX="hidden">
              <Image src={message.img} alt="Message image" borderRadius={4} />
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                  size="2xs"
                  fontSize="6px"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  borderRadius="full"
                  aria-label="Options"
                />
                <MenuList bg={"green.800"} backdropFilter="blur(10px)">
                  <MenuItem onClick={() => onDelete(message._id)}>
                    Delete message
                  </MenuItem>
                </MenuList>
              </Menu>
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
        <Flex gap={2} position="relative" overflowX="hidden">
          <Avatar src={selectedConversation.userProfilePic} w="7" h={7} />
          {message.text && (
            <Flex
              position="relative"
              maxW={"350px"}
              bg={"gray.400"}
              p={1}
              borderRadius={"md"}
              overflowX="hidden"
            >
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
            <Flex mt={5} w={"200px"} position="relative" overflowX="hidden">
              <Image src={message.img} alt="Message image" borderRadius={4} />
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Message;
