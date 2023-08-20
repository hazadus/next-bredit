import { TabItem } from "@/types/types";
import { Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";

type Props = {
  item: TabItem;
  isSelected: boolean;
  isDisabled: boolean;
  setSelectedTab: () => void;
};

const TabItem: React.FC<Props> = ({ item, isSelected, isDisabled, setSelectedTab }) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor={isDisabled ? "default" : "pointer"}
      fontWeight={700}
      color={isSelected ? "blue.500" : "gray.500"}
      borderWidth={isSelected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={isSelected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      _hover={{ bg: "gray.50" }}
      onClick={() => {
        if (!isDisabled) setSelectedTab();
      }}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon height="100%" as={item.icon} fontSize={18} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};

export default TabItem;
