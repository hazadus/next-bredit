import CreatePostLink from "@/components/Community/CreatePostLink";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import PostItem from "@/components/Posts/PostItem";
import PostSkeleton from "@/components/Posts/PostSkeleton";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { ICommunity, IPost } from "@/types/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import safeJsonStringify from "safe-json-stringify";

type HomePageProps = {
  communities: ICommunity[];
};

const HomePage: React.FC<HomePageProps> = ({ communities }) => {
  const [user, loadingUser] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const { postsStateValue, setPostsStateValue, onSelectPost, onDeletePost, onVote } = usePosts();

  /**
   * Fetch 10 posts sorted by vote number and put them into posts global state.
   */
  const buildAnonymousUserHomeFeed = async () => {
    setIsLoading(true);

    try {
      const postQuery = query(collection(firestore, "posts"), orderBy("voteStatus", "desc"), limit(10));
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostsStateValue((prev) => ({
        ...prev,
        posts: posts as IPost[],
      }));
    } catch (error: any) {
      console.log("buildAnonymousUserHomeFeed error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildAuthenticatedUserHomeFeed = () => {};

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) buildAnonymousUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <>
      <Head>
        <title>Bredit</title>
      </Head>
      <PageContentLayout>
        {/* Left column */}
        <>
          <CreatePostLink />

          <Flex
            bg="white"
            mb={5}
            p={5}
            borderRadius={4}
            border="1px solid"
            borderColor="gray.300"
            width="100%"
            direction="column"
          >
            <Text fontWeight={600} pb={2}>
              We have these amazing communities:
            </Text>
            {communities.map((comm) => (
              <Flex key={`list-id-${comm.id}`}>
                <Link href={`/b/${comm.id}`}>
                  <Text _hover={{ textDecoration: "underline" }}>/b/{comm.id}</Text>
                </Link>
              </Flex>
            ))}
          </Flex>

          {isLoading ? (
            <PostSkeleton />
          ) : (
            <Stack>
              {postsStateValue.posts.map((post) => (
                <PostItem
                  post={post}
                  key={`post-list-id-${post.id}`}
                  userIsCreator={user?.uid === post.creatorId}
                  onSelectPost={onSelectPost}
                  onVote={onVote}
                  userVoteValue={postsStateValue.postVotes.find((item) => item.postId === post.id)?.voteValue}
                  onDeletePost={onDeletePost}
                  isOnHomePage={true}
                />
              ))}
            </Stack>
          )}
        </>

        {/* Right column */}
        <></>
      </PageContentLayout>
    </>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const communityDocuments = await getDocs(query(collection(firestore, "communities")));
  const communities = communityDocuments.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      // JSON stringify/parse stuff because Next doesn't like Firebase's Timstamp type
      communities: JSON.parse(safeJsonStringify(communities)),
    },
  };
};
