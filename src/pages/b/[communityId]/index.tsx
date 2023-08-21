import { communityState } from "@/atoms/communitiesAtom";
import AboutCommunity from "@/components/Community/AboutCommunity";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import Posts from "@/components/Posts/Posts";
import { firestore } from "@/firebase/clientApp";
import { ICommunity } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: ICommunity;
};

/**
 * This page uses SSR.
 * @param props
 * @returns
 */
const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  // When the community is visited, set it as current in the global state
  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, []);

  return (
    <>
      <Head>
        <title>{communityData.id}</title>
      </Head>
      <Header communityData={communityData} />
      <PageContentLayout>
        {/* Left column */}
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        {/* Right column */}
        <>
          <AboutCommunity community={communityData} />
        </>
      </PageContentLayout>
    </>
  );
};

// Next.js will pre-render this page on each request using the data returned by this function.
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get community data from Firestore DB **on backend**
  try {
    const communityDocumentRef = doc(firestore, "communities", context.query.communityId as string);
    const communityDocument = await getDoc(communityDocumentRef);

    return {
      props: {
        communityData: communityDocument.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDocument.id, // `data()` does not include `id`
                ...communityDocument.data(),
              }),
            )
          : "",
      },
    };
  } catch (error: any) {
    console.log("Community page - getServerSideProps error:", error);
  }
}

export default CommunityPage;
