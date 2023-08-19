import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const SubmitPostPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Submit to *communityId*</title>
      </Head>
      <PageContentLayout>
        <>
          <Box p="14px 0" borderBottom="1px solid white">
            <Text fontSize="18px" fontWeight={600}>
              Create a post
            </Text>
          </Box>
          <NewPostForm />
        </>
        <>{/* About community */}</>
      </PageContentLayout>
    </>
  );
};

export default SubmitPostPage;
