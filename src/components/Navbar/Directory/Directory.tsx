import useDirectory from "@/hooks/useDirectory";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Image, Menu, MenuButton, MenuList, Text, useOutsideClick } from "@chakra-ui/react";
import React from "react";
import Communities from "./Communities";

const Directory: React.FC = () => {
  const { directoryState, toggleDirectoryMenuOpen } = useDirectory();
  const menuRef = React.useRef(null);

  // Close menu when user clicks outside
  useOutsideClick({
    ref: menuRef,
    handler: () => {
      if (directoryState.isOpen) toggleDirectoryMenuOpen();
    },
  });

  return (
    <>
      <Menu isOpen={directoryState.isOpen}>
        <MenuButton
          cursor="pointer"
          padding="0 6px"
          ml={{ base: 0, md: 2 }}
          mr={2}
          borderRadius={4}
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
          onClick={toggleDirectoryMenuOpen}
        >
          <Flex align="center" justify="space-between" width={{ base: "auto", lg: "200px" }}>
            <Flex align="center">
              {directoryState.selectedMenuItem.imageURL ? (
                <Image
                  src={directoryState.selectedMenuItem.imageURL}
                  borderRadius="full"
                  boxSize="24px"
                  mr={2}
                />
              ) : (
                <Icon
                  as={directoryState.selectedMenuItem.icon}
                  color={directoryState.selectedMenuItem.iconColor}
                  fontSize={24}
                  mr={{ base: 1, md: 2 }}
                />
              )}

              <Flex display={{ base: "none", lg: "flex" }}>
                <Text fontSize="10pt" fontWeight={600}>
                  {directoryState.selectedMenuItem.displayText}
                </Text>
              </Flex>
            </Flex>
            <Flex>
              <ChevronDownIcon />
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList ref={menuRef}>
          <Communities />
        </MenuList>
      </Menu>
    </>
  );
};

export default Directory;
