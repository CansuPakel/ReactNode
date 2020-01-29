import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";

function Layout({ children, user }) {
  return (
    <div>
      <Head>
        <title>Bookshop</title>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Header user={user} />
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
