import { User } from "firebase/auth";
import React from "react";
import AuthenticatedUserMenu from "./AuthenticatedUserMenu";
import UnknownUserMenu from "./UnknownUserMenu";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return <>{user ? <AuthenticatedUserMenu user={user} /> : <UnknownUserMenu />}</>;
};

export default UserMenu;
