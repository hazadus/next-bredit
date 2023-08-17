import { authModalState } from "@/atoms/authModalAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useSetRecoilState } from "recoil";

const UnknownUserMenu: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Menu>
        <MenuButton
          cursor="pointer"
          padding="0 6px"
          borderRadius={4}
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        >
          <Flex align="center">
            <Flex align="center">
              <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
            </Flex>
            <Flex>
              <ChevronDownIcon />
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={() => setAuthModalState({ open: true, view: "login" })}
          >
            <Flex alignItems="center">
              <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
              Log In / Sign Up
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UnknownUserMenu;
