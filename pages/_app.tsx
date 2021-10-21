import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import "../styles/scss/globals.scss";
import UserProvider from "../context/UserContext";
import { Layout } from "../components";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ApolloProvider>
  );
};

export default MyApp;
