import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type ProfileTabItemProps = {
  title: string;
  isSelected: boolean;
  isDisabled: boolean;
  setSelectedTab: () => void;
};

const ProfileTabItem: React.FC<ProfileTabItemProps> = ({ title, isSelected, isDisabled, setSelectedTab }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p={isSelected ? "10px 0px 7px 0px" : "10px 0px"}
      cursor={isDisabled ? "default" : "pointer"}
      fontWeight={700}
      color={isSelected ? "blue.500" : "black"}
      borderWidth={isSelected ? "0px 0px 2px 0px" : "0px 0px 0px 0px"}
      borderBottomColor={isSelected ? "blue.500" : "white"}
      maxWidth="90px"
      _hover={{ bg: "gray.50" }}
      onClick={() => {
        if (!isDisabled) setSelectedTab();
      }}
    >
      <Text fontSize="10pt">{title.toLocaleUpperCase()}</Text>
    </Flex>
  );
};

export default ProfileTabItem;
