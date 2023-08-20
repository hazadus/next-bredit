import { postsState } from "@/atoms/postsAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { IPost } from "@/types/types";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postsStateValue, setPostsStateValue] = useRecoilState(postsState);

  const onVote = async () => {};

  const onSelectPost = () => {};

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

  return {
    postsStateValue,
    setPostsStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
