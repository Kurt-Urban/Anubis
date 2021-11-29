import React, { useEffect } from "react";
import { useUser } from "@/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { Button, Card, Col, Row } from "reactstrap";
import ReactSwitch from "react-switch";
import { useMutation } from "@apollo/client";
import { deleteServerMutation } from "@/mutations";

const UserProfile: React.FC = ({}) => {
  const { user } = useUser();
  const history = useRouter();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const servers = user?.servers || [];

  const [deleteServer] = useMutation(deleteServerMutation);

  return (
    <>
      <Row className="mx-2 mt-4">
        <Col xs={4}>
          <Card className="bg-800 border-700 shadow p-3">
            <Row>
              <Col xs={10}>
                <div className="h2">
                  {user?.firstName} {user?.lastName}
                </div>
              </Col>
              <Col>{user?.id}</Col>
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
                    <Button color="accent" outline>
                      Create Server
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
            {servers.map((server: any, index: number) => (
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
                  <Col xs={4} className="p-0 clickable">
                    <Link href={`/server/view/${server.id}`} passHref>
                      <Image
                        src={server?.bannerURL}
                        width={468}
                        height={60}
                        alt="banner img"
                      />
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      outline
                      color="danger"
                      onClick={() => {
                        deleteServer({ variables: { id: server.id } });
                        // user?.servers?.splice(index, 1);
                      }}
                    >
                      Delete
                    </Button>
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
