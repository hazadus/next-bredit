import { atom } from "recoil";

interface IAuthModalState {
  open: boolean;
  view: "login" | "signup" | "passwordReset";
}

const defaultModalState: IAuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<IAuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
