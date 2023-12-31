import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Image, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onClick = () => {
    // Open the modal if user is not authenticated
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    // Grab `communityId` from the route so we do not need to pass it as a prop
    const { communityId } = router.query;
    if (communityId) {
      router.push(`/b/${communityId}/submit`);
      return;
    }
  };

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      {/* Show user's photo if there's one */}
      {user?.photoURL ? (
        <Image src={user.photoURL} width="36px" height="36px" borderRadius="full" mr={4} />
      ) : (
        <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
      )}

      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon as={IoImageOutline} fontSize={24} mr={4} color="gray.400" cursor="pointer" onClick={onClick} />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" onClick={onClick} />
    </Flex>
  );
};

export default CreatePostLink;
