import { aboutAppModalState } from "@/atoms/aboutAppModalAtom";
import { IPost } from "@/types/types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { useSetRecoilState } from "recoil";
import remarkGfm from "remark-gfm";

type PostItemProps = {
  post: IPost;
  userIsCreator: boolean;
  userVoteValue?: number; // +1 or -1
  onVote: (post: IPost, vote: number, communityId: string) => void;
  onDeletePost: (post: IPost) => Promise<boolean>;
  onSelectPost?: (post: IPost) => void;
  isOnHomePage: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  isOnHomePage,
}) => {
  const router = useRouter();
  // We assume that if no `onSelectPost` was passed, we are on single post page
  const singlePostView = !onSelectPost;
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState("");
  const setAboutAppModalState = useSetRecoilState(aboutAppModalState);

  const handleDelete = async () => {
    setError("");
    setLoadingDelete(true);

    try {
      const success = await onDeletePost(post);
      if (!success) throw new Error("Failed to delete post.");
      if (singlePostView) router.push(`/b/${post.communityId}`);
    } catch (error: any) {
      console.log("handleDelete error:", error);
      setError(error.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostView ? "white" : "gray.300"}
      borderRadius={singlePostView ? "4px 4px 0px 0px" : 4}
      cursor={singlePostView ? "unset" : "pointer"}
      _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
      onClick={() => {
        if (onSelectPost) onSelectPost(post);
      }}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostView ? "none" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostView ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            onVote(post, 1, post.communityId);
          }}
        />
        <Text fontSize="9pt" fontWeight={600}>
          {post.voteStatus}
        </Text>
        <Icon
          as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
          color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            onVote(post, -1, post.communityId);
          }}
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px 10px">
          {post.createdAt && (
            <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
              {isOnHomePage && (
                <>
                  {post.communityImageURL ? (
                    <Image borderRadius="full" boxSize="18px" src={post.communityImageURL} mr={2} />
                  ) : (
                    <Icon as={FaReddit} fontSize={18} mr={1} color="blue.500" />
                  )}
                  <Link href={`b/${post.communityId}`}>
                    <Text
                      fontWeight={700}
                      _hover={{ textDecoration: "underline" }}
                      onClick={(event) => event.stopPropagation()}
                    >{`b/${post.communityId}`}</Text>
                  </Link>
                  <Icon as={BsDot} color="gray.500" fontSize={8} />
                </>
              )}
              <Text color="gray.500">
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
            </Stack>
          )}
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>

          <Flex
            direction="column"
            className="markdown-content"
            maxHeight={singlePostView ? undefined : 400}
            maxWidth={{ base: "345px", md: "580px" }}
            fontSize={{ base: "12px", md: "14px" }}
            overflowY="clip"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </Flex>

          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && <Skeleton height="200px" width="100%" borderRadius={4} />}
              <Image
                maxHeight="460px"
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => {
                  setLoadingImage(false);
                }}
                alt="Post Image"
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          {/* Comments button */}
          <Flex align="center" p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer">
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          {/* Share button */}
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              setAboutAppModalState({ isOpen: true });
            }}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          {/* Save button */}
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              setAboutAppModalState({ isOpen: true });
            }}
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {/* Delete button */}
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                handleDelete();
              }}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export default PostItem;
