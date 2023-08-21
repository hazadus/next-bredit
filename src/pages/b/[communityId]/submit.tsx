import { communityState } from "@/atoms/communitiesAtom";
import AboutCommunity from "@/components/Community/AboutCommunity";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const SubmitPostPage: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { communityId } = router.query;
  const communityStateValue = useRecoilValue(communityState);

  return (
    <>
      <Head>
        <title>Submit to {communityId}</title>
      </Head>
      <PageContentLayout>
        <>
          <Box p="14px 0" borderBottom="1px solid white">
            <Text fontSize="18px" fontWeight={600}>
              Create a post
            </Text>
          </Box>
          {user && communityId && <NewPostForm user={user} communityId={communityId as string} />}
        </>
        <>
          <AboutCommunity community={communityStateValue.currentCommunity!} />
        </>
      </PageContentLayout>
    </>
  );
};

export default SubmitPostPage;
