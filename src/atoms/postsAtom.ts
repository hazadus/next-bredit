import { IPostState } from "@/types/types";
import { atom } from "recoil";

export const postsState = atom<IPostState>({
  key: "postsState",
  default: {
    selectedPost: null,
    posts: [],
    postVotes: [],
  },
});
