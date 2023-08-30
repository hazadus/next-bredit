import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const [user, loading, userError] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <>
      <Flex
        bg="white"
        height="44px"
        width="100%"
        padding="6px 12px"
        justify={{ md: "space-between" }}
        position="fixed"
        borderBottom="1px"
        borderColor="gray.200"
        zIndex={200}
      >
        <Flex align="center" width={{ base: "40px", md: "auto" }} mr={{ base: 0, md: 2 }}>
          <Image
            src="/images/breditFace-w.png"
            height="30px"
            cursor="pointer"
            onClick={() => onSelectMenuItem(defaultMenuItem)}
          />
          <Image
            src="/images/breditText.png"
            height="46px"
            display={{ base: "none", md: "unset" }}
            cursor="pointer"
            onClick={() => onSelectMenuItem(defaultMenuItem)}
          />
        </Flex>
        {user && <Directory />}
        <SearchInput user={user} />
        <RightContent user={user} />
      </Flex>
    </>
  );
};

export default Navbar;
