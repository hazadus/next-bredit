import { atom } from "recoil";

type AboutAppModalState = {
  isOpen: boolean;
};

const defaulAboutAppModalState: AboutAppModalState = {
  isOpen: false,
};

export const aboutAppModalState = atom<AboutAppModalState>({
  key: "aboutAppModalState",
  default: defaulAboutAppModalState,
});
