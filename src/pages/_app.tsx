import { theme } from "@/chakra/theme";
import Layout from "@/components/Layout/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "./styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head key="_app.tsx">
        <script
          async
          src="https://stats.hazadus.ru/script.js"
          data-website-id="a3cffe8d-da26-4f7b-88b3-eeb62b5ea845"
        ></script>
      </Head>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
