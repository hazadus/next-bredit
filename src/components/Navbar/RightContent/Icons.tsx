import { aboutAppModalState } from "@/atoms/aboutAppModalAtom";
import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots, BsShield } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const Icons: React.FC = () => {
  const router = useRouter();
  const setAboutAppModalState = useSetRecoilState(aboutAppModalState);

  return (
    <Flex>
      <Flex display={{ base: "none", md: "flex" }} align="center">
        {/* Flex here is for hover effect */}
        <Tooltip hasArrow label="Popular" bg="black" color="white" fontSize="13px" borderRadius="4px">
          <Flex
            ml={1.5}
            mr={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            fontSize={20}
            onClick={() => setAboutAppModalState({ isOpen: true })}
          >
            <Icon as={BsArrowUpRightCircle} />
          </Flex>
        </Tooltip>
        <Tooltip hasArrow label="Moderation" bg="black" color="white" fontSize="13px" borderRadius="4px">
          <Flex
            ml={1.5}
            mr={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            fontSize={22}
            onClick={() => setAboutAppModalState({ isOpen: true })}
          >
            <Icon as={BsShield} />
          </Flex>
        </Tooltip>
      </Flex>
      {/* Rightmost icons, after | */}
      <>
        <Tooltip hasArrow label="Chat" bg="black" color="white" fontSize="13px" borderRadius="4px">
          <Flex
            ml={1.5}
            mr={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            fontSize={20}
            onClick={() => setAboutAppModalState({ isOpen: true })}
          >
            <Icon as={BsChatDots} />
          </Flex>
        </Tooltip>
        <Tooltip hasArrow label="Notifications" bg="black" color="white" fontSize="13px" borderRadius="4px">
          <Flex
            ml={1.5}
            mr={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            fontSize={20}
            onClick={() => setAboutAppModalState({ isOpen: true })}
          >
            <Icon as={IoNotificationsOutline} />
          </Flex>
        </Tooltip>
        <Tooltip hasArrow label="Create Post" bg="black" color="white" fontSize="13px" borderRadius="4px">
          <Flex
            display={{ base: "none", md: "flex" }}
            ml={1.5}
            mr={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            fontSize={20}
            onClick={() => router.push("/b/bredit/submit")}
          >
            <Icon as={GrAdd} />
          </Flex>
        </Tooltip>
      </>
    </Flex>
  );
};

export default Icons;
