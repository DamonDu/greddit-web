import React from "react";
import Head from "next/head";
import Layout from "./layout";

function App(props) {
  return (
    <div>
      <Head>
        <title>Greddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>{props.children}</Layout>
    </div>
  );
}

export default App;
