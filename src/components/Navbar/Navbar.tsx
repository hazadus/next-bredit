import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const [user, loading, userError] = useAuthState(auth);

  return (
    <>
      <Flex bg="white" height="44px" padding="6px 12px">
        <Flex align="center">
          <Image src="/images/breditLogo.svg" height="30px" />
          <Image src="/images/breditText.svg" height="46px" display={{ base: "none", md: "unset" }} />
        </Flex>
        <SearchInput />
        <RightContent user={user} />
      </Flex>
    </>
  );
};

export default Navbar;
