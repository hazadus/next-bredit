import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const OAuthButtons: React.FC = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2}>
        <Image src="/images/googleLogo.png" height="20px" mr={2} />
        Continue with Google
      </Button>
      <Button variant="oauth">
        <Image src="/images/githubLogo.png" height="20px" mr={2} />
        Continue with GitHub
      </Button>
    </Flex>
  );
};

export default OAuthButtons;
