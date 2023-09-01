import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";
import { postsState } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { IPost, IPostVote } from "@/types/types";
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import useCommunityData from "./useCommunityData";

/**
 * Handles all posts related stuff: global state, vote, select current post, delete, etc.
 * @returns
 */
const usePosts = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [postsStateValue, setPostsStateValue] = useRecoilState(postsState);
  const setAuthModalState = useSetRecoilState(authModalState);

  // Get `communityStateValue` from hook to activate hook's useEffect()'s
  const { communityStateValue } = useCommunityData();

  /**
   * Handle vote action - update Firestore documents and app global state with authenticated user's vote.
   * @param post post user is voting on
   * @param vote 1 (upvote) ot -1 (downvote)
   * @param communityId community where the `post` is located
   */
  const onVote = async (post: IPost, vote: number, communityId: string) => {
    // If user is not authenticated, show the modal
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    try {
      const { voteStatus } = post; // Current vote status of the post
      const existingVote = postsStateValue.postVotes.find((vote) => vote.postId === post.id);

      // We use batch write because we want create vote / update post vote status only in one transaction!
      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...postsStateValue.posts];
      let updatedPostVotes = [...postsStateValue.postVotes];
      let voteChange = vote; // This will be used to update post document in the Firestore

      // New vote
      if (!existingVote) {
        // Create new postVote document in Firebase
        const newPostVoteDocumentRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`));

        const newVote: IPostVote = {
          id: newPostVoteDocumentRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        };

        // Actually save the new document to the Firestore
        // (will be executed on `batch.commit()` call!).
        batch.set(newPostVoteDocumentRef, newVote);
        updatedPostVotes = [...updatedPostVotes, newVote];

        // Add/substract 1 to/from `post.voteStatus`
        updatedPost.voteStatus = voteStatus + vote;
      } else {
        // Existing vote - user has voted on this post before
        //
        // Get ref to existing postVote document
        const existingPostVoteDocumentRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`,
        );
        //
        // If `vote` matches existing vote value, then user want to remove his vote
        if (existingVote.voteValue === vote) {
          // Remove vote by subtracting it from existing one
          updatedPost.voteStatus = voteStatus - vote;
          // Remove this vote from the votes global state array
          updatedPostVotes = updatedPostVotes.filter((vote) => vote.id !== existingVote.id);
          // Delete this postVote document from Firebase
          batch.delete(existingPostVoteDocumentRef);
          // This will be used to update post document in the Firestore
          voteChange *= -1;
        } else {
          voteChange = 2 * vote;
          // User wants to `flip` his vote - i.e. change it from "up" to "down" or vice versa
          updatedPost.voteStatus = voteStatus + 2 * vote;
          // Update vote value of this vote in global state array
          const voteIndex = postsStateValue.postVotes.findIndex((vote) => vote.id === existingVote.id);
          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          };
          // Update document in the Firestore (only one field - `voteValue`)
          batch.update(existingPostVoteDocumentRef, { voteValue: vote });
        }
      }

      // Update post document in the Firestore
      const postDocumentRef = doc(firestore, "posts", post.id!);
      batch.update(postDocumentRef, { voteStatus: voteStatus + voteChange });
      //
      // Commit changes to the Firestore
      await batch.commit();
      //
      // Update global state with updated stuff
      const postIndex = postsStateValue.posts.findIndex((postItem) => postItem.id === post.id);
      updatedPosts[postIndex] = updatedPost;
      setPostsStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));

      if (postsStateValue.selectedPost && postsStateValue.selectedPost.id === post.id) {
        setPostsStateValue((prev) => ({ ...prev, selectedPost: updatedPost }));
      }
    } catch (error: any) {
      console.log("onVote error:", error);
    }
  };

  /**
   * Set `post` as currently selected in the global app state, and open it's detail view in the browser.
   * @param post post we want to set as currently selected.
   */
  const onSelectPost = (post: IPost) => {
    setPostsStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/b/${post.communityId}/comments/${post.id}`);
  };

  /**
   * Delete post (and the image, if exists) from Firestore database and local global state.
   * @param post Post document to delete
   * @returns `true` on success, `false` otherwise
   */
  const onDeletePost = async (post: IPost): Promise<boolean> => {
    try {
      // Check for image and delete it from storage
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      // Delete post document from Firestore
      const postDocumentRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocumentRef);

      // Update global app state - remove this post from the array
      setPostsStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error: any) {
      console.log("onDeletePost error:", error);
      return false;
    }
  };

  /**
   * Load all authenticated user's votes in the community.
   * @param communityId community we want to load votes for
   */
  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(firestore, "users", `${user?.uid}/postVotes`),
      where("communityId", "==", communityId),
    );

    // Query documents from Firestore
    const postVoteDocuments = await getDocs(postVotesQuery);
    // Convert documents to JS objects with IDs included
    const postVotes = postVoteDocuments.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // Save votes to the global state
    setPostsStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as IPostVote[],
    }));
  };

  // This will reload user's votes when the current community changes
  useEffect(() => {
    if (communityStateValue.currentCommunity && user)
      getCommunityPostVotes(communityStateValue.currentCommunity?.id);
  }, [user, communityStateValue.currentCommunity]);

  // Clear post votes when user is not authenticated
  useEffect(() => {
    if (!user) setPostsStateValue((prev) => ({ ...prev, postVotes: [] }));
  }, [user]);

  return {
    postsStateValue,
    setPostsStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
