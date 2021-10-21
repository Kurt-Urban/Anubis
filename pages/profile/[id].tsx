import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useUser } from "../../hooks";

import Image from "next/image";
import { Button, Card, Col, Row } from "reactstrap";

const UserProfile: React.FC = ({}) => {
  const { user } = useUser();
  const history = useRouter();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Row className="mx-2 mt-4">
        <Col xs={6}>
          <Card className="bg-800 border-700 shadow p-3">
            <Row>
              <Col xs={2}>
                <Image
                  src="/public/favicon.ico"
                  width={75}
                  height={75}
                  alt="Profile Photo"
                  className="border border-700 rounded"
                />
              </Col>
              <Col xs={10}>
                <div className="h2">
                  {user?.firstName} {user?.lastName}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={6}>
          <Card className="bg-800 border-700 shadow p-3">
            <Row className="mb-2 align-items-center">
              <Col className="h2 ml-3">Servers</Col>
              <Col className="d-flex justify-content-end mr-3">
                <div>
                  <Button color="secondary">Create Server</Button>
                </div>
              </Col>
            </Row>
            {user?.servers.map((server: any) => (
              <Card className="bg-darker my-1 p-1" key={server.id}>
                <Row className="mx-1 align-items-center">
                  <Col xs={1} className="mr-2">
                    <Button
                      color="accent"
                      outline
                      onClick={() => history.push(`/server/${server.id}`)}
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col className="d-inline my-1">
                    <Col>
                      <small className="font-weight-bold text-accent">
                        Server Name:
                      </small>
                    </Col>
                    <Col>{server.serverName}</Col>
                  </Col>
                  <Col>
                    <Col>
                      {" "}
                      <small className="font-weight-bold text-accent">
                        IP Address:
                      </small>
                    </Col>
                    <Col>{server?.ipAddress || "No Address"}</Col>
                  </Col>
                  <Col>
                    <Col></Col>
                    <Col>{server?.status || "Inactive"}</Col>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
