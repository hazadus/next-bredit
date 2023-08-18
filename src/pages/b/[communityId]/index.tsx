import CommunityNotFound from "@/components/Community/CommunityNotFound";
import { firestore } from "@/firebase/clientApp";
import { ICommunity } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
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
  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <div>
      CommunityPage for {communityData.id}, {communityData.privacyType}, {communityData.createdAt?.toString()}
    </div>
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