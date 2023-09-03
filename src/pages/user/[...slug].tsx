import PageContentLayout from "@/components/Layout/PageContentLayout";
import ProfilePostItem from "@/components/Profile/ProfilePostItem";
import ProfilePostSkeleton from "@/components/Profile/ProfilePostSkeleton";
import ProfileTabItem from "@/components/Profile/ProfileTabItem";
import { firestore } from "@/firebase/clientApp";
import { IPost } from "@/types/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type ProfilePageProps = {};

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userScreenName, setUserScreenName] = useState("");
  const [tabTitle, setTabTitle] = useState("");
  const [posts, setPosts] = useState<IPost[]>([]);

  const getUserPosts = async () => {
    setIsLoading(true);
    const postDocuments = await getDocs(
      query(
        collection(firestore, "posts"),
        where("creatorDisplayName", "==", userScreenName),
        orderBy("createdAt", "desc"),
      ),
    );
    const posts = postDocuments.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(posts as IPost[]);
    setIsLoading(false);
  };

  useEffect(() => {
    // Get user's screen name and desired tab from the route
    if (router.query.slug) {
      setUserScreenName(router.query.slug[0]);

      if (router.query.slug.length) {
        setTabTitle(router.query.slug[1]);
      }
    }
  }, [router.query.slug]);

  useEffect(() => {
    if (tabTitle === "submitted" && userScreenName) getUserPosts();

    return () => {
      setPosts([]);
    };
  }, [tabTitle, userScreenName]);

  return (
    <>
      <Head>
        <title>
          {userScreenName} (u/{userScreenName}) – Bredit
        </title>
      </Head>
      <Flex height="40px" bg="white">
        <Flex width={{ base: "426px", md: "974px" }} mx="auto" align="center">
          <ProfileTabItem
            title="Overview"
            isSelected={!tabTitle}
            isDisabled={false}
            setSelectedTab={() => {
              router.push(`/user/${userScreenName}`);
            }}
          />
          <ProfileTabItem
            title="Posts"
            isSelected={tabTitle === "submitted"}
            isDisabled={false}
            setSelectedTab={() => {
              router.push(`/user/${userScreenName}/submitted`);
            }}
          />
          <ProfileTabItem
            title="Comments"
            isSelected={tabTitle === "comments"}
            isDisabled={false}
            setSelectedTab={() => {
              router.push(`/user/${userScreenName}/comments`);
            }}
          />
        </Flex>
      </Flex>
      <PageContentLayout>
        <>
          {/* Posts tab */}
          {tabTitle === "submitted" && (
            <>
              {/* Loading  */}
              {isLoading && <ProfilePostSkeleton />}
              {/* Loading complete */}
              {posts.length > 0 && !isLoading && (
                <Stack>
                  {posts.map((post) => (
                    <ProfilePostItem post={post} key={`user-post-id-${post.id}`} />
                  ))}
                </Stack>
              )}
            </>
          )}
          {(!tabTitle || tabTitle === "comments") && (
            <Flex direction="column">
              <Text>&laquo;Overview&raquo; and &laquo;Comments&raquo; tabs are not yet implemented.</Text>
              <Text>
                Please visit{" "}
                <Link
                  href={`/user/${userScreenName}/submitted`}
                  style={{ fontWeight: 600, textDecoration: "underline" }}
                >
                  Posts
                </Link>{" "}
                tab instead.
              </Text>
            </Flex>
          )}
        </>
        <>
          User: {userScreenName}, tab: {tabTitle}
        </>
      </PageContentLayout>
    </>
  );
};

export default ProfilePage;
