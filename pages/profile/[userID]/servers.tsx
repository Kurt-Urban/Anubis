import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useServers } from "@/hooks";
import { Button, Card, Col, Container, Row } from "reactstrap";

const ProfileServers: React.FC = ({}) => {
  const history = useRouter();
  const { servers } = useServers(history.query?.userID);
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
            {servers.map((server: any) => (
              <Card className="bg-darker my-1 py-2 p-1" key={server.id}>
                <Row className="mx-1 align-items-center">
                  <Col xs={1} className="mr-2">
                    <Button color="accent" outline></Button>
                  </Col>
                  <Col xs={3} className="d-inline my-1">
                    <Col>
                      <small className="font-weight-bold text-accent">
                        Server Name:
                      </small>
                    </Col>
                    <Col>{server.serverName}</Col>
                  </Col>
                  <Col xs={4} className="p-0 clickable">
                    <Link href={`/server/view/${server.id}`} passHref>
                      <Image
                        src={server?.bannerURL || "/placeholderBanner.png"}
                        alt="banner"
                        height="60"
                        width="468"
                        className="mb-0"
                      />
                    </Link>
                    <div className="bg-primary mt-0">{server.ipAddress}</div>
                  </Col>
                  <Col xs={1} className="mr-2">
                    <Button
                      color="accent"
                      outline
                      onClick={() => history.push(`/server/${server.id}`)}
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileServers;
