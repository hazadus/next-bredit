import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { ICommunity, ICommunitySnippet } from "@/types/types";
import { collection, doc, getDocs, increment, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const setAuthModalState = useSetRecoilState(authModalState);

  const joinOrLeaveCommunity = (communityData: ICommunity, isJoined: boolean) => {
    // Open the modal if user is not authenticated
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

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
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const joinCommunity = async (communityData: ICommunity) => {
    setIsLoading(true);

    try {
      // Here we use Batch Write method instead of Transaction, because we only write data, and do not read anything.
      // We want to create new snippet AND update members count only if both operations succeed,
      // hence we use batch write, not just separate writes.
      const batch = writeBatch(firestore);

      const newSnippet: ICommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      // Actually write new snippet to the `communitySnippets` collection,
      // the full path will be like `users/${user.uid}/communitySnippets/${communityData.id}`:
      batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet);

      // Increment users count in this community
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      // Update global state only after data is successfully committed to the Firestore
      setCommunityStateValue((prev) => ({ ...prev, snippets: [...prev.snippets, newSnippet] }));
    } catch (error: any) {
      console.log("joinCommunity error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    setIsLoading(true);

    try {
      const batch = writeBatch(firestore);

      // Delete the community snippet document from authenticated user's communitySnippets collection
      batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));

      // Decrease users count in this community
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      // Update global state only after changes are successfully committed to the Firestore
      setCommunityStateValue((prev) => ({
        ...prev,
        snippets: prev.snippets.filter((item) => item.communityId !== communityId),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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