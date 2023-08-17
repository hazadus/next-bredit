import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";

type RightContentProps = {
  // This is equal to `user: User | null | undefined`, but more concise.
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      {/* AuthModal is triggered globally by watching the state */}
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
      </Flex>
    </>
  );
};

export default RightContent;
