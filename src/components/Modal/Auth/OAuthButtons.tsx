import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const OAuthButtons: React.FC = () => {
  const [signinWithGoogle, user, loadingGoogle, googleSignInError] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2} onClick={() => signinWithGoogle()} isLoading={loadingGoogle}>
        <Image src="/images/googleLogo.png" height="20px" mr={2} />
        Continue with Google
      </Button>
      <Button variant="oauth">
        <Image src="/images/githubLogo.png" height="20px" mr={2} />
        Continue with GitHub
      </Button>
      {googleSignInError && (
        <Text fontSize="10pt" color="red" align="center" mb={2}>
          {googleSignInError.message}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
