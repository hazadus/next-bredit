import { aboutAppModalState } from "@/atoms/aboutAppModalAtom";
import { IComment } from "@/types/types";
import { Box, Flex, Icon, Spinner, Stack, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { useSetRecoilState } from "recoil";
import remarkGfm from "remark-gfm";

type CommentItemProps = {
  comment: IComment;
  onDeleteComment: (comment: IComment) => void;
  isLoadingDelete: boolean;
  userId?: string;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDeleteComment, isLoadingDelete, userId }) => {
  const setAboutAppModalState = useSetRecoilState(aboutAppModalState);

  return (
    <Flex mt={5}>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
      </Box>
      <Stack>
        <Stack direction="row" spacing={0.6} align="center" fontSize="8pt">
          <Text fontWeight={700}>{comment.creatorDisplayText}</Text>
          <Icon as={BsDot} color="gray.500" fontSize={8} />
          <Tooltip
            hasArrow
            label={moment(new Date(comment.createdAt.seconds * 1000)).format("MMMM Do YYYY, HH:mm")}
            bg="gray.300"
            color="black"
          >
            <Text color="gray.600">{moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}</Text>
          </Tooltip>
          {isLoadingDelete && <Spinner size="sm" />}
        </Stack>

        <Flex
          direction="column"
          className="markdown-content"
          maxWidth={{ base: "300px", md: "530px" }}
          fontSize={{ base: "11px", md: "12px" }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.body}</ReactMarkdown>
        </Flex>

        <Stack direction="row" align="center" color="gray.500" cursor="pointer">
          <Icon
            as={IoArrowUpCircleOutline}
            onClick={() => {
              setAboutAppModalState({ isOpen: true });
            }}
          />
          <Icon
            as={IoArrowDownCircleOutline}
            onClick={() => {
              setAboutAppModalState({ isOpen: true });
            }}
          />
          {userId === comment.creatorId && (
            <>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => {
                  setAboutAppModalState({ isOpen: true });
                }}
              >
                Edit
              </Text>
              <Text fontSize="9pt" _hover={{ color: "blue.500" }} onClick={() => onDeleteComment(comment)}>
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CommentItem;
