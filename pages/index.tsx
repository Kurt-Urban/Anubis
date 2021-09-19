import React from "react";

import Image from "next/image";
import { Container, Col, Row } from "../components";
import { FaGlobeAmericas } from "react-icons/fa";
import login from "../public/login.jpg";
import { Button } from "@sonic-web-dev/core";
import { Form, Field } from "@sonic-web-dev/form";
import GoogleLogin from "react-google-login";
import GoogleAuth from "./components/utils/GoogleAuth";
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
