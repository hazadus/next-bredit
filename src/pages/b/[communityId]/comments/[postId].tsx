import PageContentLayout from "@/components/Layout/PageContentLayout";
import PostItem from "@/components/Posts/PostItem";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { IPost } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { postsStateValue, setPostsStateValue, onDeletePost, onVote } = usePosts();

  /**
   * Fetch post document from the Firestore, and set it as `selectedPost` in the global app state.
   * @param postId ID of the post to fetch
   */
  const fetchPost = async (postId: string) => {
    try {
      const postDocumentRef = doc(firestore, "posts", postId);
      const postDocument = await getDoc(postDocumentRef);
      setPostsStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDocument.id, ...postDocument.data() } as IPost,
      }));
    } catch (error: any) {
      console.log("fetchPost error:", error);
    }
  };

  useEffect(() => {
    // If user opens the page, and there's no `selectedPost` (it occurs when user open the page directly from the link)
    // then we need to fetch the post and set it as `selectedPost`.
    const { postId } = router.query;
    if (postId && !postsStateValue.selectedPost) fetchPost(postId as string);
  }, [router.query, postsStateValue.selectedPost]);

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
