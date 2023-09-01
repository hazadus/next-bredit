import { aboutAppModalState } from "@/atoms/aboutAppModalAtom";
import { IComment } from "@/types/types";
import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

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
          <Text color="gray.600">{moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}</Text>
          {isLoadingDelete && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt">{comment.body}</Text>
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
