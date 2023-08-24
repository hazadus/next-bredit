import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bredit</title>
      </Head>
      <Flex justify="center" p="16px 0px">
        <Flex p={5} width="95%" maxWidth="974px" direction="column">
          <Text fontWeight={600}>Some hard-coded links to communities:</Text>
          <Link href="/b/hazadus">
            <Text _hover={{ textDecoration: "underline" }}>/b/hazadus</Text>
          </Link>
          <Link href="/b/MagicTheGathering">
            <Text _hover={{ textDecoration: "underline" }}>/b/MagicTheGathering</Text>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
}
