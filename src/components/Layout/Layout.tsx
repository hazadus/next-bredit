import Navbar from "../Navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

/**
 * Main app layout.
 */
const Layout = (props: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "44px" }}>{props.children}</main>
    </>
  );
};

export default Layout;
