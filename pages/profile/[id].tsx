import React, { useEffect } from "react";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { Button, Card, Col, Row } from "reactstrap";
import ReactSwitch from "react-switch";

const UserProfile: React.FC = ({}) => {
  const { user } = useUser();
  const history = useRouter();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Row className="mx-2 mt-4">
        <Col xs={4}>
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
        <Col xs={8}>
          <Card className="bg-800 border-700 shadow p-3">
            <Row className="mb-2 align-items-center">
              <Col className="h2 ml-3">Servers</Col>
              <Col className="d-flex justify-content-end mr-3">
                <div>
                  <Link href="/server/new" passHref>
                    <Button color="secondary">Create Server</Button>
                  </Link>
                </div>
              </Col>
            </Row>
            {user?.servers?.map((server: any) => (
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
                  <Col xs={4}>
                    <Col>
                      <small className="font-weight-bold text-accent">
                        IP Address:
                      </small>
                    </Col>
                    <Col>{server?.ipAddress || "No Address"}</Col>
                  </Col>
                  <Col xs={2} className="">
                    <Col className="ml-1 mb-1">
                      <small className="font-weight-bold text-accent">
                        Status:
                      </small>
                    </Col>
                    <Col>
                      <ReactSwitch
                        key={server.id}
                        onChange={() => {}}
                        checked={server.status}
                        className="font-size-sm"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={18}
                        width={48}
                      />
                    </Col>
                  </Col>
                  <Col>
                    <Col>
                      <small className="font-weight-bold text-accent">
                        Slot:
                      </small>
                    </Col>
                    <Col>{server.listSlot || "Not Listed"}</Col>
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
