import { Icon } from "@chakra-ui/react";
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
  currentCommunity?: ICommunity;
}

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

export interface IPost {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
}

export interface IPostState {
  selectedPost: IPost | null;
  posts: IPost[];
}
