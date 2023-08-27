import { postsState } from "@/atoms/postsAtom";
import { firestore } from "@/firebase/clientApp";
import { IComment, IPost } from "@/types/types";
import { Box, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Timestamp, collection, doc, increment, serverTimestamp, writeBatch } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import CommentInput from "./CommentInput";

type CommentsProps = {
  user?: User;
  selectedPost: IPost;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const setPostState = useSetRecoilState(postsState);

  const onCreateComment = async () => {
    if (!user) return;
    setIsCreateLoading(true);

    try {
      // Create comment document in the Firebase
      const batch = writeBatch(firestore);
      const commentDocumentRef = doc(collection(firestore, "comments"));
      const newComment: IComment = {
        id: commentDocumentRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectedPost.id!,
        postTitle: selectedPost.title,
        body: commentBody,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocumentRef, newComment);

      // Update post's number of documents
      const postDocumentRef = doc(firestore, "posts", selectedPost.id!);
      batch.update(postDocumentRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // Update global app state
      setCommentBody("");
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as IPost,
      }));
    } catch (error: any) {
      console.log("onCreateComment error:", error);
    } finally {
      setIsCreateLoading(false);
    }
  };

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
