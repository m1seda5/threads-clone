// // this is version one working
// import {
//   Avatar,
//   Box,
//   IconButton,
//   Flex,
//   Image,
//   Skeleton,
//   Text,
//  } from "@chakra-ui/react";
//  import { selectedConversationAtom } from "../atoms/messagesAtom";
//  import { useRecoilValue } from "recoil";
//  import userAtom from "../atoms/userAtom";
//  import { BsCheck2All } from "react-icons/bs";
//  import { CloseIcon } from "@chakra-ui/icons"; // Import the close icon
//  import { useState } from "react";
//  // List of restricted words
//  const restrictedWords = [
//   // Offensive language
//   "fuck",
//   "shit",
//   "bitch",
//   "cunt",
//   "motherfucker",
//   "asshole",
//   "dick",
//   "pussy",
//   "cock",
//   "slut",
//   "whore",
//   "faggot",
//   "nigger",
//   "chink",
//   "gook",
//   "spic",
//   "raghead",
//   "wetback",
 
 
//   // Derogatory terms
//   "retard",
//   "cripple",
//   "idiot",
//   "moron",
//   "dumbass",
//   "lame",
//   "loser",
 
 
//   // Hate speech
//   "terrorist",
//   "racist",
//   "bigot",
//   "sexist",
//   "homophobe",
//   "xenophobe",
 
 
//   // Insults and slurs
//   "bastard",
//   "scum",
//   "pig",
//   "skank",
//   "tramp",
//   "hoe",
//   "slut",
//   "bimbo",
 
 
//   // Drugs and alcohol
//   "crack",
//   "heroin",
//   "meth",
//   "cocaine",
//   "weed",
//   "marijuana",
//   "pot",
 
 
//   // Sexual content
//   "porn",
//   "sex",
//   "nude",
//   "orgy",
//   "rape",
//   "molest",
//   "incest",
 
 
//   // Offensive phrases
//   "go to hell",
//   "kill yourself",
//   "die",
//   "you're a loser",
//   "eat shit",
 
 
//   // Additional common bad phrases
//   "suck my dick",
//   "blow job",
//   "fist fuck",
//   "cock sucking",
//   "dickhead",
//  ];
 
 
//  // Function to check if a message contains any restricted words
//  const isMessageRestricted = (text) => {
//   return restrictedWords.some((word) => text.toLowerCase().includes(word));
//  };
//  const Message = ({ ownMessage, message, onDelete }) => {
//   const selectedConversation = useRecoilValue(selectedConversationAtom);
//   const user = useRecoilValue(userAtom);
//   const [imgLoaded, setImgLoaded] = useState(false);
//   // Check if the message contains restricted words
//   if (message.text && isMessageRestricted(message.text)) {
//     return (
//       <Flex justifyContent={"center"} p={2}>
//         <Text color={"red.500"}>
//           Message contains inappropriate content and was not sent.
//         </Text>
//       </Flex>
//     );
//   }
//   return (
//     <>
//       {ownMessage ? (
//         <Flex gap={2} alignSelf={"flex-end"} position="relative">
//           {message.text && (
//             <Flex
//               bg={"green.800"}
//               maxW={"350px"}
//               p={1}
//               borderRadius={"md"}
//               position="relative"
//             >
//               {/* Start of delete button */}
//               <IconButton
//                 icon={<CloseIcon />}
//                 size="xs" // Extra small button
//                 fontSize="10px" // Adjust the icon size to make it smaller
//                 variant="ghost" // No background or border
//                 colorScheme="whiteAlpha" // Transparent background
//                 position="absolute"
//                 top="-4px" // Adjust position to fit better
//                 right="-4px" // Adjust position to fit better
//                 onClick={() => onDelete(message._id)} // Call onDelete with message ID
//                 borderRadius="full"
//                 aria-label="Delete message"
//               />
//               {/* End of delete button */}
//               <Text color={"white"}>{message.text}</Text>
//               <Box
//                 alignSelf={"flex-end"}
//                 ml={1}
//                 color={message.seen ? "blue.400" : ""}
//                 fontWeight={"bold"}
//               >
//                 <BsCheck2All size={16} />
//               </Box>
//             </Flex>
//           )}
//           {message.img && !imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image
//                 src={message.img}
//                 hidden
//                 onLoad={() => setImgLoaded(true)}
//                 alt="Message image"
//                 borderRadius={4}
//               />
//               <Skeleton w={"200px"} h={"200px"} />
//             </Flex>
//           )}
//           {message.img && imgLoaded && (
//             <Flex mt={5} w={"200px"} position="relative">
//               <Image src={message.img} alt="Message image" borderRadius={4} />
//               {/* Start of delete button */}
//               <IconButton
//                 icon={<CloseIcon />}
//                 size="2xs" // Smaller than extra small
//                 fontSize="6px" // Even smaller icon size
//                 variant="ghost" // No background or border
//                 colorScheme="whiteAlpha" // Transparent background
//                 position="absolute"
//                 top="-2px" // Keeps the current position
//                 right="-2px" // Keeps the current position
//                 onClick={() => onDelete(message._id)} // Call onDelete with message ID
//                 borderRadius="full"
//                 aria-label="Delete message"
//               />
//               {/* End of delete button */}
//               <Box
//                 alignSelf={"flex-end"}
//                 ml={1}
//                 color={message.seen ? "blue.400" : ""}
//                 fontWeight={"bold"}
//               >
//                 <BsCheck2All size={16} />
//               </Box>
//             </Flex>
//           )}
//           <Avatar src={user.profilePic} w="7" h={7} />
//         </Flex>
//       ) : (
//         <Flex gap={2} position="relative">
//           <Avatar src={selectedConversation.userProfilePic} w="7" h={7} />
//           {message.text && (
//             <Flex
//               position="relative"
//               maxW={"350px"}
//               bg={"gray.400"}
//               p={1}
//               borderRadius={"md"}
//             >
//               {/* Start of delete button */}
//               <IconButton
//                 icon={<CloseIcon />}
//                 size="2xs" // Smaller than extra small
//                 fontSize="6px" // Even smaller icon size
//                 variant="ghost" // No background or border
//                 colorScheme="whiteAlpha" // Transparent background
//                 position="absolute"
//                 top="-2px" // Keeps the current position
//                 right="-2px" // Keeps the current position
//                 onClick={() => onDelete(message._id)} // Call onDelete with message ID
//                 borderRadius="full"
//                 aria-label="Delete message"
//               />
//               {/* End of delete button */}
//               <Text color={"black"}>{message.text}</Text>
//             </Flex>
//           )}
//           {message.img && !imgLoaded && (
//             <Flex mt={5} w={"200px"}>
//               <Image
//                 src={message.img}
//                 hidden
//                 onLoad={() => setImgLoaded(true)}
//                 alt="Message image"
//                 borderRadius={4}
//               />
//               <Skeleton w={"200px"} h={"200px"} />
//             </Flex>
//           )}
//           {message.img && imgLoaded && (
//             <Flex mt={5} w={"200px"} position="relative">
//               <Image src={message.img} alt="Message image" borderRadius={4} />
//               {/* Start of delete button */}
//               <IconButton
//                 icon={<CloseIcon />}
//                 size="2xs" // Smaller than extra small
//                 fontSize="6px" // Even smaller icon size
//                 variant="ghost" // No background or border
//                 colorScheme="whiteAlpha" // Transparent background
//                 position="absolute"
//                 top="-2px" // Keeps the current position
//                 right="-2px" // Keeps the current position
//                 onClick={() => onDelete(message._id)} // Call onDelete with message ID
//                 borderRadius="full"
//                 aria-label="Delete message"
//               />
//               {/* End of delete button */}
//             </Flex>
//           )}
//         </Flex>
//       )}
//     </>
//   );
//  };
//  export default Message;
 
 
 

//  version 2 with the redesign
import {
  Avatar,
  Box,
  IconButton,
  Flex,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

// List of restricted words
const restrictedWords = [
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
  // Other restricted words...
];

// Function to check if a message contains any restricted words
const isMessageRestricted = (text) => {
  return restrictedWords.some((word) => text.toLowerCase().includes(word));
};

const Message = ({ ownMessage, message, onDelete }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  const [imgLoaded, setImgLoaded] = useState(false);

  // If the message contains restricted words, don't display it
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
              bg={"teal.500"}
              maxW={"350px"}
              p={2}
              borderRadius={"lg"}
              position="relative"
              boxShadow="lg"
              _hover={{ transform: "scale(1.02)" }} // Figma-inspired hover effect
              transition="all 0.2s ease"
            >
              <IconButton
                icon={<CloseIcon />}
                size="xs"
                fontSize="10px"
                variant="ghost"
                colorScheme="whiteAlpha"
                position="absolute"
                top="-4px"
                right="-4px"
                onClick={() => onDelete(message._id)}
                borderRadius="full"
                aria-label="Delete message"
                _hover={{ bg: "red.400", color: "white" }} // Delete button hover effect
              />
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
                borderRadius={8} // Smooth border radius
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}
          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"} position="relative">
              <Image src={message.img} alt="Message image" borderRadius={8} />
              <IconButton
                icon={<CloseIcon />}
                size="2xs"
                fontSize="6px"
                variant="ghost"
                colorScheme="whiteAlpha"
                position="absolute"
                top="-2px"
                right="-2px"
                onClick={() => onDelete(message._id)}
                borderRadius="full"
                aria-label="Delete message"
              />
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
              bg={"gray.100"}
              maxW={"350px"}
              p={2}
              borderRadius={"lg"}
              position="relative"
              boxShadow="md"
              _hover={{ transform: "scale(1.02)" }} // Figma-inspired hover effect
              transition="all 0.2s ease"
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
                borderRadius={8} // Smooth border radius
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}
          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image src={message.img} alt="Message image" borderRadius={8} />
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Message;
