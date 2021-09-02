import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "@sonic-web-dev/core";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
