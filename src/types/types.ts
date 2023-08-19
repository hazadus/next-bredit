import { Timestamp } from "firebase/firestore";

export interface ICommunity {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface ICommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface ICommunityState {
  snippets: ICommunitySnippet[];
}
