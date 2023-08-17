import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Text } from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import AuthButtons from "./AuthButtons";

type RightContentProps = {
  user: User | null | undefined;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/* AuthModal is triggered globally by watching the state */}
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <>
            <Text mr={2}>Logged In as {user.email}</Text>
            <Button
              variant="outline"
              height="28px"
              display={{ base: "none", sm: "flex" }}
              width={{ base: "70px", md: "110px" }}
              mr={2}
              onClick={() => signOut(auth)}
            >
              Logout
            </Button>
          </>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};

export default RightContent;
