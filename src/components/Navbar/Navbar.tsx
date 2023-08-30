import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [user, loading, userError] = useAuthState(auth);

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
          <Link href="/">
            <Image src="/images/breditFace-w.png" height="30px" />
          </Link>
          <Image
            src="/images/breditText.png"
            height="46px"
            display={{ base: "none", md: "unset" }}
            cursor="pointer"
            onClick={() => router.push("/")}
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
