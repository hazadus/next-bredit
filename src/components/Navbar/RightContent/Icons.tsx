import { aboutAppModalState } from "@/atoms/aboutAppModalAtom";
import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const Icons: React.FC = () => {
  const setAboutAppModalState = useSetRecoilState(aboutAppModalState);

  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        {/* Flex here is for hover effect */}
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
          <Icon as={IoFilterCircleOutline} />
        </Flex>
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
          <Icon as={IoVideocamOutline} />
        </Flex>
      </Flex>
      {/* Rightmost icons, after | */}
      <>
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
        <Flex
          display={{ base: "none", md: "flex" }}
          ml={1.5}
          mr={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize={20}
          onClick={() => setAboutAppModalState({ isOpen: true })}
        >
          <Icon as={GrAdd} />
        </Flex>
      </>
    </Flex>
  );
};

export default Icons;
