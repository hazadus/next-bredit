import { ICommunityState } from "@/types/types";
import { atom } from "recoil";

export const communityState = atom<ICommunityState>({
  key: "communitiesState",
  default: {
    snippets: [],
    areSnippetsFetched: false,
  },
});
