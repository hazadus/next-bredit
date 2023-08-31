import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { ICommunity } from "@/types/types";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";

const TopCommunities: React.FC = () => {
  const [topCommunities, setTopCommunities] = useState<ICommunity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { communityStateValue, joinOrLeaveCommunity } = useCommunityData();

  const getTopCommunities = async () => {
    setIsLoading(true);

    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5),
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopCommunities(communities as ICommunity[]);
    } catch (error: any) {
      console.log("getTopCommunities error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopCommunities();
  }, []);

  return (
    <Box position="sticky" top="58px" width="100%">
      <Flex
        direction="column"
        bg="white"
        borderRadius={4}
        cursor="pointer"
        border="1px solid"
        borderColor="gray.300"
      >
        <Flex
          align="flex-end"
          color="white"
          p="6px 10px"
          bg="blue.500"
          height="70px"
          borderRadius="4px 4px 0px 0px"
          fontWeight={600}
          bgImage="url(/images/recCommsArt.png)"
          backgroundSize="cover"
          bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
      url('images/recCommsArt.png')"
        >
          Top Communities
        </Flex>
        <Flex direction="column">
          {isLoading ? (
            <Stack mt={2} p={3}>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70%" />
              </Flex>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70%" />
              </Flex>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70%" />
              </Flex>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70%" />
              </Flex>
              <Flex justify="space-between" align="center">
                <SkeletonCircle size="10" />
                <Skeleton height="10px" width="70%" />
              </Flex>
            </Stack>
          ) : (
            <>
              {topCommunities.map((item, index) => {
                const isJoined = !!communityStateValue.snippets.find(
                  (snippet) => snippet.communityId === item.id,
                );
                return (
                  <Link key={item.id} href={`/b/${item.id}`}>
                    <Flex
                      position="relative"
                      align="center"
                      fontSize="10pt"
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      p="10px 12px"
                      fontWeight={600}
                    >
                      <Flex width="80%" align="center">
                        <Flex width="15%">
                          <Text mr={2}>{index + 1}</Text>
                        </Flex>
                        <Flex align="center" width="80%">
                          {item.imageURL ? (
                            <Image borderRadius="full" boxSize="28px" src={item.imageURL} mr={2} />
                          ) : (
                            <Icon as={FaReddit} fontSize={30} color="brand.100" mr={2} />
                          )}
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >{`b/${item.id}`}</span>
                        </Flex>
                      </Flex>
                      <Box position="absolute" right="10px">
                        <Button
                          height="22px"
                          fontSize="8pt"
                          onClick={(event) => {
                            event.stopPropagation();
                            joinOrLeaveCommunity(item, isJoined);
                          }}
                          variant={isJoined ? "outline" : "solid"}
                        >
                          {isJoined ? "Joined" : "Join"}
                        </Button>
                      </Box>
                    </Flex>
                  </Link>
                );
              })}
              <Box p="10px 20px">
                <Button height="30px" width="100%">
                  View All
                </Button>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopCommunities;
