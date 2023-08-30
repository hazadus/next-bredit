import useDirectory from "@/hooks/useDirectory";
import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

type DirectoryMenuItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const DirectoryMenuItem: React.FC<DirectoryMenuItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() => {
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL });
      }}
    >
      <Flex align="center">
        {imageURL ? (
          <Image src={imageURL} borderRadius="full" boxSize="18px" mr={2} />
        ) : (
          <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default DirectoryMenuItem;
