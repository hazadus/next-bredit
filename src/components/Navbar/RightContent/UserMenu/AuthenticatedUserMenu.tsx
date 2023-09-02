import { aboutAppModalState } from "@/atoms/aboutAppModalAtom";
import { auth } from "@/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import { BiHelpCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useSetRecoilState } from "recoil";

type AuthenticatedUserMenuProps = {
  user?: User | null;
};

const AuthenticatedUserMenu: React.FC<AuthenticatedUserMenuProps> = ({ user }) => {
  const setAboutAppModalState = useSetRecoilState(aboutAppModalState);

  const onClickLogout = async () => {
    await signOut(auth);
    // Check useCommunityData - useEffect stuff to see what happens there on login/logout!
  };

  return (
    <>
      {user && (
        <Menu>
          <MenuButton
            cursor="pointer"
            padding="0 6px"
            borderRadius={4}
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
          >
            <Flex align="center">
              <Flex align="center">
                {/* Show user's photo if there's one */}
                {user.photoURL ? (
                  <Image src={user.photoURL} width={26} height={26} minWidth={26} mr={1} />
                ) : (
                  <Icon as={FaRedditSquare} fontSize={26} color="gray.300" mr={1} />
                )}

                {/* Show username and karma on larger screens */}
                <Flex
                  display={{ base: "none", lg: "flex" }}
                  direction="column"
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>{user.displayName || user.email?.split("@")[0]}</Text>
                  <Flex>
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">0 karma</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex>
                <ChevronDownIcon />
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList width="254px">
            <MenuItem
              height="40px"
              fontSize="10pt"
              fontWeight={700}
              color="gray.500"
              _hover={{ bg: "white" }}
              isDisabled
            >
              <Flex align="center">
                <Icon as={CgProfile} fontSize={20} mx="10px" />
                My Stuff
              </Flex>
            </MenuItem>{" "}
            <MenuItem
              height="40px"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center" ml="40px">
                Profile
              </Flex>
            </MenuItem>
            <MenuItem
              height="40px"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center" ml="40px">
                User Settings
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              height="40px"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center" ml="40px">
                Create a Community
              </Flex>
            </MenuItem>
            <MenuItem
              height="40px"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => setAboutAppModalState({ isOpen: true })}
            >
              <Flex align="center">
                <Icon as={BiHelpCircle} fontSize={20} mx="10px" />
                About Bredit
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              height="40px"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={onClickLogout}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogout} fontSize={20} mx="10px" />
                Log Out
              </Flex>
            </MenuItem>
            <MenuItem fontSize="9pt" color="gray.500" _hover={{ bg: "white" }} isDisabled>
              <Flex align="center" ml="10px" mt="8px" mb="8px">
                Hazadus.ru &copy; 2023. All rights preserved.
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default AuthenticatedUserMenu;
