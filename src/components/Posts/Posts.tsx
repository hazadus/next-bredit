import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { ICommunity, IPost } from "@/types/types";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";

type PostsProps = {
  communityData: ICommunity;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const { postsStateValue, setPostsStateValue, onVote, onSelectPost, onDeletePost } = usePosts();

  const getPosts = async () => {
    setIsLoading(true);

    try {
      // Get posts for the community from Firebase
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc"),
      );
      const postDocuments = await getDocs(postsQuery);

      // Store posts in global state
      const posts = postDocuments.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostsStateValue((prev) => ({
        ...prev,
        posts: posts as IPost[],
      }));
    } catch (error: any) {
      console.log("getPosts error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get all posts on initial load and when the community changes
  // (user opens another community page)
  useEffect(() => {
    getPosts();
  }, [communityData]);

  return (
    <>
      <Stack>
        {isLoading && <PostSkeleton />}
        {postsStateValue.posts.map((post) => (
          <PostItem
            key={`post-item-id-${post.id}`}
            post={post}
            userIsCreator={user ? user.uid === post.creatorId : false}
            userVoteValue={postsStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue}
            onVote={onVote}
            onSelectPost={onSelectPost}
            onDeletePost={onDeletePost}
            isOnHomePage={false}
          />
        ))}
      </Stack>
    </>
  );
};

export default Posts;
