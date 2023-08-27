import { postsState } from "@/atoms/postsAtom";
import { firestore } from "@/firebase/clientApp";
import { IComment, IPost } from "@/types/types";
import { Box, Flex, SkeletonCircle, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  Timestamp,
  collection,
  collectionGroup,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

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
      //
      // "Client" version of the timestamp - `serverTimestamp()` will create timestamp only when
      // the document gets saved to the Firebase, so for now we need to create it on our own:
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
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

  const getPostComments = async () => {
    setIsFetchLoading(true);
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost.id),
        orderBy("createdAt", "desc"),
      );
      const commentDocuments = await getDocs(commentsQuery);
      const comments = commentDocuments.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(comments as IComment[]);
    } catch (error: any) {
      console.log("getPostComments error:", error);
    } finally {
      setIsFetchLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPost) getPostComments();
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
        <Stack spacing={2} p={2}>
          {isFetchLoading ? (
            <>
              {[0, 1].map((item) => (
                <Box padding={6} bg="white" flexDirection="row" key={`skeleton-id-${item}`}>
                  <SkeletonCircle size="10" />
                  <SkeletonText mt={4} noOfLines={2} spacing={4} />
                </Box>
              ))}
            </>
          ) : (
            <>
              {comments.length ? (
                <>
                  {comments.map((comment) => (
                    <CommentItem
                      comment={comment}
                      onDeleteComment={onDeleteComment}
                      isLoadingDelete={false}
                      userId={user?.uid}
                      key={`comment-id-${comment.id}`}
                    />
                  ))}
                </>
              ) : (
                <>
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    borderTop="1px solid"
                    borderColor="gray.100"
                    p={20}
                  >
                    <Text fontWeight={700} opacity={0.3}>
                      No comments yet
                    </Text>
                  </Flex>
                </>
              )}
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Comments;
