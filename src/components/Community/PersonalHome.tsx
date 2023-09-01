import { Button, Divider, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

const PersonalHome: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      mb={5}
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/personalHome.png)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Icon as={FaReddit} fontSize={50} color="brand.100" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="10pt">
            Your personal Bredit frontpage. Come here to check in with your favorite communities.
          </Text>

          <Divider mt={2} mb={2} />

          <Button height="30px" isDisabled>
            Create Post
          </Button>
          <Button variant="outline" height="30px" isDisabled>
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PersonalHome;
