import { IPost } from "@/types/types";
import { Flex, Icon, Image, Text, Tooltip, Link } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowsAngleContract, BsArrowsAngleExpand, BsChat, BsDot } from "react-icons/bs";
import { IoArrowRedoOutline, IoBookmarkOutline } from "react-icons/io5";
import NextLink from "next/link";

type ProfilePostItemProps = {
  post: IPost;
};

const ProfilePostItem: React.FC<ProfilePostItemProps> = ({ post }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Flex
      direction="row"
      bg="white"
      borderRadius="4px"
      border="1px solid"
      borderColor="gray.300"
      cursor="pointer"
      _hover={{ borderColor: "gray.500" }}
      onClick={() => router.push(`/b/${post.communityId}/comments/${post.id}`)}
    >
      {/* Votes column */}
      <Flex
        width="40px"
        bg="gray.100"
        align="start"
        justify="center"
        borderTopLeftRadius="4px"
        borderBottomLeftRadius="4px"
        shrink="0"
      >
        <Flex height="96px" align="center" fontSize="12px" fontWeight={700}>
          {post.voteStatus}
        </Flex>
      </Flex>

      {/* Right block - post info & content */}
      <Flex direction="column">
        {/* Post info column */}
        <Flex align="center" height="96px" p={1}>
          <Image src={post.imageURL} width="96px" height="72px" mr={2} borderRadius="4px" />
          <Flex direction="column" height="100%">
            {/* Post title */}
            <Flex fontSize="14px" fontWeight={700}>
              <Text maxWidth="475px" isTruncated>
                {post.title}
              </Text>
            </Flex>
            {/* Community / Author */}
            <Flex align="center" fontSize="13px" fontWeight={700}>
              <Link as={NextLink} href={`/b/${post.communityId}`}>
                b/{post.communityId}
              </Link>
              <Icon as={BsDot} color="gray.500" fontSize={8} />
              <Text color="gray.500" fontWeight={300}>
                Posted by u/{post.creatorDisplayName}{" "}
                <Tooltip
                  hasArrow
                  label={moment(new Date(post.createdAt.seconds * 1000)).format("MMMM Do YYYY, HH:mm")}
                  bg="gray.300"
                  color="black"
                >
                  {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
                </Tooltip>
              </Text>
            </Flex>
            {/* Buttons */}
            <Flex flexGrow={1} align="end" fontWeight={700} color="gray.500">
              {/* Collapse / expand button */}
              <Flex
                align="center"
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  setIsCollapsed(!isCollapsed);
                }}
              >
                <Icon as={isCollapsed ? BsArrowsAngleExpand : BsArrowsAngleContract} mx={1} />
              </Flex>

              <Flex
                align="center"
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  router.push(`/b/${post.communityId}/comments/${post.id}#comments`);
                }}
              >
                <Icon as={BsChat} mr={2} />
                <Text fontSize="9pt">{post.numberOfComments} Comments</Text>
              </Flex>

              <Flex
                align="center"
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                }}
              >
                <Icon as={IoArrowRedoOutline} mr={2} />
                <Text fontSize="9pt">Share</Text>
              </Flex>

              <Flex
                align="center"
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                }}
              >
                <Icon as={IoBookmarkOutline} mr={2} />
                <Text fontSize="9pt">Save</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Post content */}
        {!isCollapsed && <Flex p={1}>{post.body}</Flex>}
      </Flex>
    </Flex>
  );
};

export default ProfilePostItem;
