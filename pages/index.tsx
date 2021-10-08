import React from "react";

import { Container } from "../components";

import Home from "./Home";

const Index: React.FC = ({}) => {
  return (
    <>
      <Container className="min-w-full h-screen overflow-hidden">
        <Home />
      </Container>
    </>
  );
};

export default Index;
