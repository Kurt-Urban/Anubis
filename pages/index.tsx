import React from "react";

import Image from "next/image";
import { Container, Col, Row } from "../components";
import login from "../public/login.jpg";
import { Button } from "@sonic-web-dev/core";
import { Form, Field } from "@sonic-web-dev/form";

const Index: React.FC = ({}) => {
  return (
    <Container className="min-w-full h-screen flex justify-center items-center overflow-hidden border-red-500 border">
      <Image
        src={login}
        alt="Alps at dusk"
        className="border-2 border-red-500"
        layout="fill"
        objectFit="cover"
      />
    </Container>
  );
};

export default Index;
