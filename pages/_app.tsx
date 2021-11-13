import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import "../styles/scss/globals.scss";
import UserProvider from "../context/UserContext";
import { Layout } from "../components";
import NotificationProvider from "context/NotificationContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <NotificationProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default MyApp;
