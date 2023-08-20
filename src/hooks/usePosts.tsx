import { postsState } from "@/atoms/postsAtom";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postsStateValue, setPostsStateValue] = useRecoilState(postsState);

  const onVote = async () => {};

  const onSelectPost = () => {};

  const onDeletePost = () => {};

  return {
    postsStateValue,
    setPostsStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
