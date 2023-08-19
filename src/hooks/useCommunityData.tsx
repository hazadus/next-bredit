import { communityState } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { ICommunity, ICommunitySnippet } from "@/types/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const joinOrLeaveCommunity = (communityData: ICommunity, isJoined: boolean) => {
    // Is user authenticated?

    // Act depending on user joined or not
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }

    joinCommunity(communityData);
  };

  /**
   * Get community snippets for logged in user.
   */
  const getSnippets = async () => {
    setIsLoading(true);

    try {
      // Get user's community snippets from Firestore database
      const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
      // Convert Firestore docs to JS objects of our type
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() })) as ICommunitySnippet[];

      // Store community snippets in global state
      setCommunityStateValue((prev) => ({ ...prev, snippets }));
    } catch (error: any) {
      console.log("getSnippets error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinCommunity = (communityData: ICommunity) => {};

  const leaveCommunity = (communityId: string) => {};

  // This hook will trigger every time `user` changes:
  useEffect(() => {
    if (user) getSnippets();
  }, [user]);

  return {
    communityStateValue,
    isLoading,
    joinOrLeaveCommunity,
  };
};

export default useCommunityData;
