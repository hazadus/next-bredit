import { auth } from "@/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
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
                <Icon as={FaRedditSquare} fontSize={26} color="gray.300" mr={1} />
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
                    <Text color="gray.400">1024 karma</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex>
                <ChevronDownIcon />
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="10pt" fontWeight={700} _hover={{ bg: "blue.500", color: "white" }}>
              <Flex align="center">
                <Icon as={CgProfile} fontSize={20} mr={2} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={() => signOut(auth)}
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogout} fontSize={20} mr={2} />
                Log Out
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default UserMenu;
