import { IDirectoryMenuItem, IDirectoryMenuState } from "@/types/types";
import { FaSlidersH } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { atom } from "recoil";

export const defaultMenuItem: IDirectoryMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
};

export const defaultMenuState: IDirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom<IDirectoryMenuState>({
  key: "directoryMenuState",
  default: defaultMenuState,
});
