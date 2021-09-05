import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GitHub profiles</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
