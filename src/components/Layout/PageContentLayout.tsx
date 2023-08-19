import { Flex } from "@chakra-ui/react";

type PageContentLayoutProps = {
  children: React.ReactNode[];
};

/**
 * Layout for two-column pages.
 * @param param0 Array of tow children components
 * @returns
 */
const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
  return (
    // Outer container
    <Flex justify="center" p="16px 0px">
      {/* Inner container */}
      <Flex width="95%" justify="center" maxWidth="974px">
        {/* Left Column */}
        <Flex direction="column" width={{ base: "100%", md: "640px" }} mr={{ base: 0, md: 6 }}>
          {children[0]}
        </Flex>

        {/* Right Column */}
        <Flex display={{ base: "none", md: "flex" }} flexGrow={1} minW="310px" border="solid 1px orange">
          {children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContentLayout;
