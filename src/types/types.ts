import { Icon } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { IconType } from "react-icons";

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
  voteStatus: number; // number of votes on the post
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
}

export interface IPostVote {
  id: string;
  postId: string;
  communityId: string; // community where the `post` is located
  voteValue: number; // 1 (upvote) or -1 (downvote)
}

export interface IPostState {
  selectedPost: IPost | null;
  posts: IPost[];
  postVotes: IPostVote[];
}

export interface IComment {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  body: string;
  createdAt: Timestamp;
}

export interface IDirectoryMenuItem {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
}

export interface IDirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: IDirectoryMenuItem;
}
