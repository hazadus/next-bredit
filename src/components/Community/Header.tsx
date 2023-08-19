import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { ICommunity } from "@/types/types";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: ICommunity;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const { communityStateValue, isLoading, joinOrLeaveCommunity } = useCommunityData();
  // `isJoined` state will be auto updated on user login/logout/change, thanks to `useEffect`
  // hook inside `useCommunityData()`. `!!` below is to convert to boolean
  const isJoined = !!communityStateValue.snippets.find((item) => item.communityId === communityData.id);

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {communityData.imageURL ? (
            <Image />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={73}
              position="relative"
              top={-3}
              color="blue.500"
              bg="white"
              border="4px solid white"
              borderRadius="50px"
            />
          )}

          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontSize="16pt" fontWeight={800}>
                {communityData.id}
              </Text>
              <Text fontSize="10pt" fontWeight={600} color="gray.400">
                b/{communityData.id}
              </Text>
            </Flex>
            {/* Hide "Join/Leave" button when user is not authenticated */}
            {user && (
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="36px"
                px={6}
                onClick={() => {
                  joinOrLeaveCommunity(communityData, isJoined);
                }}
                isLoading={isLoading}
              >
                {isJoined ? "Leave" : "Join"}
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
