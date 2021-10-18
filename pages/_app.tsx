import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import "../styles/scss/globals.scss";
import UserProvider from "../context/UserContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ApolloProvider>
  );
};

export default MyApp;
