import { firestore } from "@/firebase/clientApp";
import { ICommunity } from "@/types/types";
import { Flex, Text } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type HomePageProps = {
  communities: ICommunity[];
};

const HomePage: React.FC<HomePageProps> = ({ communities }) => {
  return (
    <div>
      <Head>
        <title>Bredit</title>
      </Head>
      <Flex justify="center" p="16px 0px">
        <Flex p={5} width="95%" maxWidth="974px" direction="column">
          <Text fontWeight={600} pb={2}>
            We have these communities:
          </Text>
          {communities.map((comm) => (
            <Link href={`/b/${comm.id}`} key={comm.id}>
              <Text _hover={{ textDecoration: "underline" }}>/b/{comm.id}</Text>
            </Link>
          ))}
        </Flex>
      </Flex>
    </div>
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
