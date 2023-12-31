import { communityState } from "@/atoms/communitiesAtom";
import { defaultMenuState, directoryMenuState } from "@/atoms/directoryMenuAtom";
import { IDirectoryMenuItem } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";

const useDirectory = () => {
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
  const router = useRouter();
  const communityStateValue = useRecoilValue(communityState);

  const toggleDirectoryMenuOpen = () => {
    setDirectoryState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const onSelectMenuItem = (menuItem: IDirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) toggleDirectoryMenuOpen();
  };

  // Set selected menu item when user enters (or leaves) another community,
  // including using browser "back" button
  useEffect(() => {
    const { currentCommunity } = communityStateValue;

    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `b/${currentCommunity.id}`,
          link: `/b/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: "blue.500",
        },
      }));
    }
  }, [communityStateValue.currentCommunity, router.query]);

  // Update state when user moves around various routes on the site
  useEffect(() => {
    if (router.asPath === "/") {
      setDirectoryState(() => ({ ...defaultMenuState }));
    }
  }, [router.query]);

  return { directoryState, toggleDirectoryMenuOpen, onSelectMenuItem };
};

export default useDirectory;
