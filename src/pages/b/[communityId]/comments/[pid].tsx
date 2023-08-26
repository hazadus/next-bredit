import PageContentLayout from "@/components/Layout/PageContentLayout";
import PostItem from "@/components/Posts/PostItem";
import { auth } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { postsStateValue, setPostsStateValue, onDeletePost, onVote } = usePosts();

  return (
    <PageContentLayout>
      <>
        {/* Show selected post */}
        {postsStateValue.selectedPost && (
          <PostItem
            post={postsStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postsStateValue.postVotes.find((item) => item.postId === postsStateValue.selectedPost!.id)
                ?.voteValue
            }
            userIsCreator={user?.uid === postsStateValue.selectedPost.creatorId}
          />
        )}
        <div>Comments for selected post</div>
      </>
      <>
        <div>About Community</div>
        {/* <AboutCommunity /> */}
      </>
    </PageContentLayout>
  );
};

export default PostPage;
