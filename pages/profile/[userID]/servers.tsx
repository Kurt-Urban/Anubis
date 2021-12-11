import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePrivateRoute, useServers } from "@/hooks";
import { Button, Card, Col, Container, Row } from "reactstrap";
import { FaCheck, FaCopy } from "react-icons/fa";
import { Formik } from "formik";
import { getServerData } from "@/queries";

const ProfileServers: React.FC = ({}) => {
  usePrivateRoute();
  const history = useRouter();
  const { servers } = useServers(history.query?.userID);

  const serverData = async () => {
    return await Promise.all(
      servers?.map(async (server: any) => await getServerData(server.ipAddress))
    ).then((data) => data);
  };
  serverData();

  return (
    <Formik initialValues={{ copyIndex: null }} onSubmit={(values) => {}}>
      {({ values, setFieldValue }) => {
        return (
          <Container>
            <Row className="mx-2 mt-4">
              <Col>
                <Card className="bg-800 border-700 shadow p-3">
                  <Row className="mb-2 align-items-center">
                    <Col className="h2 ml-3">Servers</Col>
                    <Col className="d-flex justify-content-end mr-3">
                      <div>
                        <Link href="/server/new" passHref>
                          <Button color="accent" outline>
                            Create Server
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                  {/* <Row>
              <Col>
                <Card className="bg-800 border-700 shadow p-3">
                  <Row>
                    <Col xs={1} className="d-flex justify-content-center">
                      Rank
                    </Col>
                    <Col xs={2} className="d-flex justify-content-center">
                      Name
                    </Col>
                    <Col xs={5} className="d-flex justify-content-center">
                      Server
                    </Col>
                    <Col xs={2} className="d-flex justify-content-center">
                      Players
                    </Col>
                    <Col xs={2} className="d-flex justify-content-center">
                      Status
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row> */}
                  {servers?.map((server: any) => {
                    return (
                      <Card className="bg-darker my-1 py-2 p-1" key={server.id}>
                        <Row className="mx-1 align-items-center">
                          <Col xs={1} className="mr-2">
                            <Button color="accent" outline></Button>
                          </Col>
                          <Col xs={3} className="font-weight-bold my-1">
                            {server.serverName}
                          </Col>
                          <Col xs={5} className="p-0">
                            <Link href={`/server/view/${server.id}`} passHref>
                              <Image
                                src={
                                  server?.bannerURL || "/placeholderBanner.png"
                                }
                                priority
                                alt="banner"
                                height="60"
                                width="468"
                                className="mb-0 clickable"
                              />
                            </Link>
                            <div className="bg-primary d-flex mt-0 rounded-bottom align-items-center">
                              <div className="p-1 pl-2">{server.ipAddress}</div>
                              <Button
                                className="ml-auto d-flex py-2 copy-button shadow-none"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    server?.ipAddress
                                  );
                                  setFieldValue("copyIndex", server.id);
                                }}
                              >
                                {values.copyIndex === server.id ? (
                                  <FaCheck />
                                ) : (
                                  <FaCopy />
                                )}
                              </Button>
                            </div>
                          </Col>
                          <Col></Col>
                          <Col xs={1} className="mr-2 ml-auto">
                            <Button
                              color="accent"
                              outline
                              onClick={() =>
                                history.push(`/server/${server.id}`)
                              }
                            >
                              Edit
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </Card>
              </Col>
            </Row>
          </Container>
        );
      }}
    </Formik>
  );
};

export default ProfileServers;
