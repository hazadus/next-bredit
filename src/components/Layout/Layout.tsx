import React, { PropsWithChildren } from "react";

const Layout: React.FC = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
