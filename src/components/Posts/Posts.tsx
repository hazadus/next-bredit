import { firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { ICommunity, IPost } from "@/types/types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type PostsProps = {
  communityData: ICommunity;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { postsStateValue, setPostsStateValue } = usePosts();

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

  // Get all posts on initial load
  useEffect(() => {
    getPosts();
  }, []);

  return <div>Posts</div>;
};

export default Posts;
