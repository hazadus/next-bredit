import { communityState } from "@/atoms/communitiesAtom";
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import DirectoryMenuItem from "./DirectoryMenuItem";
import { FaReddit } from "react-icons/fa";

type Props = {};

const Communities: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const communitySnippets = useRecoilValue(communityState).snippets;

  return (
    <>
      <CreateCommunityModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />

      <Box mt={3} mb={2}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MODERATING
        </Text>
      </Box>
      {communitySnippets
        .filter((item) => item.isModerator)
        .map((snippet) => (
          <DirectoryMenuItem
            displayText={`b/${snippet.communityId}`}
            icon={FaReddit}
            link={`/b/${snippet.communityId}`}
            iconColor="brand.100"
            imageURL={snippet.imageURL}
            key={`dir-menu-item-${snippet.communityId}`}
          />
        ))}
      <Box mt={3} mb={2}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>
      </Box>
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Flex align="center">
          <Icon as={GrAdd} fontSize={20} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
      {communitySnippets.map((snippet) => (
        <DirectoryMenuItem
          displayText={`b/${snippet.communityId}`}
          icon={FaReddit}
          link={`/b/${snippet.communityId}`}
          iconColor="blue.500"
          imageURL={snippet.imageURL}
          key={`dir-menu-item-${snippet.communityId}`}
        />
      ))}
    </>
  );
};

export default Communities;
