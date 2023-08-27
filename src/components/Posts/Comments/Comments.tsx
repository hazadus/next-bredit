import { IPost } from "@/types/types";
import { Box, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";

type CommentsProps = {
  user?: User;
  selectedPost: IPost;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState("");
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const onCreateComment = async (commentBody: string) => {};
  const onDeleteComment = async (comment: any) => {};
  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px" p={2}>
      <Flex direction="column" pl={10} pr={4} mb={6} fontSize="10pt" width="100%">
        <CommentInput
          commentBody={commentBody}
          setCommentBody={setCommentBody}
          user={user}
          isLoading={isCreateLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
    </Box>
  );
};

export default Comments;
