import React from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { SelectField } from "@/components";
import { useMutation } from "@apollo/react-hooks";
import { createServerMutation } from "@/mutations";
import useUser from "hooks/useUser";
import { useServer } from "hooks/useServer";

const gameIDList = [
  { label: "Minecraft", value: "minecraft" },
  { label: "HyTale", value: "hyTale" },
];

const ServerDetails: React.FC = ({}) => {
  const { asPath } = useRouter();
  const history = useRouter();
  const isNew = asPath.includes("new");
  const { user } = useUser();
  const serverID = asPath.slice(8);
  const { server } = useServer(serverID);
  const [createServer, { data: serverData }] = useMutation(
    createServerMutation,
    {
      onCompleted: () => {
        console.log("Server created");
        history.push(`/server/${serverData.id}`);
      },
      onError: () => console.log("Failed to create server"),
    }
  );
  if (!isNew && !server) return null;
  return (
    <Formik
      initialValues={
        isNew
          ? {
              serverName: "",
              ipAddress: "",
              bannerURL: "",
              gameID: "minecraft",
              tags: [],
            }
          : {
              serverName: server?.serverName,
              ipAddress: server?.ipAddress || "",
              bannerURL: server?.bannerURL || "",
              gameID: server?.gameID || "Minecraft",
              tags: server?.tags || [],
            }
      }
      onSubmit={(values) => {
        if (isNew) {
          createServer({
            variables: {
              input: {
                ownerID: user!.id,
                serverName: values.serverName,
                ipAddress: values.ipAddress,
                bannerURL: values.bannerURL,
                gameID: values.gameID,
                tags: values.tags.map((tag: any) =>
                  tag.toLowerCase().replace(/\s/g, "")
                ),
              },
            },
          });
        }
      }}
    >
      {({ values }) => {
        return (
          <Container className="w-75">
            <Form>
              <Row className="mt-4 ml-2 justify-content-center align-items-center">
                <Col xs={1}>
                  <Button
                    className="py-1"
                    color="accent"
                    outline
                    onClick={history.back}
                  >
                    Back
                  </Button>
                </Col>
                <Col className="ml-2 pt-1">
                  <div className="h2">{isNew ? "Create" : "Edit"} Server</div>
                </Col>
              </Row>
              <Row className="mx-2 mt-2">
                <Col>
                  <Card className="bg-800 border-700 shadow">
                    <CardHeader className="bg-darkest d-flex justify-content-center h5">
                      General Information
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col xs={6}>
                          <div>Server Name</div>
                          <Field
                            name="serverName"
                            className="bg-white form-control mt-1"
                            placeholder="Server Name..."
                          />
                        </Col>
                        <Col xs={6}>
                          <div>IP Address</div>
                          <Field
                            name="ipAddress"
                            className="bg-white form-control mt-1"
                            placeholder="IP Address..."
                          />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col xs={4}>
                          <div>Game</div>
                          <SelectField
                            name="gameID"
                            className="mt-1"
                            options={gameIDList}
                          />
                        </Col>
                        <Col xs={6}>
                          <div>IP Address</div>
                          <Field
                            name="bannerURL"
                            className="bg-white form-control mt-1"
                            placeholder="Banner URL..."
                          />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="mx-2 mt-3">
                <Col>
                  <Card className="bg-800 border-700 shadow">
                    <CardHeader className="bg-darkest d-flex justify-content-center h5">
                      Tags
                    </CardHeader>
                    <CardBody>
                      <Row className="mt-2">
                        <Col xs={12}>
                          <div>Tags</div>
                          <SelectField
                            name="tags"
                            className="mt-1"
                            isMulti
                            creatable
                            options={server?.tags?.map((t: any) => ({
                              label:
                                t.tag.value[0].toUpperCase() +
                                t.tag.value.slice(1),
                              value: t.tag.value,
                            }))}
                          />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Button
                color="accent"
                outline
                className="float-right mt-3 mr-4"
                type="submit"
              >
                {isNew ? "Create" : "Update"} Server
              </Button>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
};

export default ServerDetails;
