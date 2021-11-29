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
import Image from "next/image";
import { SelectField } from "@/components";
import { useMutation } from "@apollo/react-hooks";
import { createServerMutation, updateServerMutation } from "@/mutations";
import { useUser, useServer, useTags, useNotification } from "@/hooks";
import Dropzone from "react-dropzone";
import { supabase } from "utils/supabaseClient";

const ServerDetails: React.FC = ({}) => {
  const history = useRouter();
  const { asPath } = useRouter();
  const isNew = asPath.includes("new");
  const serverID = asPath.slice(8);
  const { user } = useUser();
  const { server, loading } = useServer(serverID);
  const { tags } = useTags();
  const { notification } = useNotification();

  const [createServer] = useMutation(createServerMutation, {
    onError: (error) => {
      console.error("GraphQL Error:" + error);
      notification("GraphQL Error:" + error, "error");
    },
  });

  const [updateServer] = useMutation(updateServerMutation, {
    onCompleted: () => {
      notification("Server updated successfully", "success");
    },
    onError: (error) => {
      console.error("GraphQL Error:" + error);
      notification("GraphQL Error:" + error, "error");
    },
  });

  if (!isNew && !server && loading) return null;
  return (
    <Formik
      initialValues={
        isNew
          ? {
              serverName: "",
              ipAddress: "",
              bannerURL: "",
              tags: [],
              banner: null,
            }
          : {
              serverName: server?.serverName,
              ipAddress: server?.ipAddress || "",
              bannerURL: server?.bannerURL || "",
              banner: server?.banner || null,
              tags: server?.tags?.map((t: any) => t.tag.value) || [],
            }
      }
      onSubmit={async (values) => {
        try {
          const { error } = await supabase.storage
            .from("dev")
            .upload(`banners/${values.banner?.[0].path}`, values.banner?.[0], {
              contentType: "image/gif",
            });
          if (error) {
            notification(error.message, "error");
          }
          const { publicURL, error: urlError } = await supabase.storage
            .from("dev")
            .getPublicUrl(`banners/${values.banner?.[0].path}`);

          if (urlError) {
            notification(urlError.message, "error");
          }

          if (isNew) {
            await createServer({
              variables: {
                input: {
                  ownerID: user!.id,
                  serverName: values.serverName,
                  ipAddress: values.ipAddress,
                  bannerURL: publicURL || "",
                  gameID: "Minecraft",
                },
                tags: values.tags,
              },
            });
          } else {
            await updateServer({
              variables: {
                input: {
                  serverName: values.serverName,
                  ipAddress: values.ipAddress,
                  bannerURL: publicURL || server.bannerURL,
                  gameID: "Minecraft",
                },
                tags: values.tags,
                id: serverID,
              },
            });
          }
        } catch (e) {
          console.error(e);
        }
      }}
    >
      {({ setFieldValue, values }) => {
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
                      <Row>
                        <Col xs={12} className="mt-2">
                          <div>Banner URL</div>
                          <Field
                            name="bannerURL"
                            className="bg-light form-control mt-1"
                            placeholder="Banner URL..."
                            disabled
                          />
                        </Col>
                        <Col xs={12} className="text-center mt-4">
                          <Image
                            src={server?.bannerURL || "/placeholderBanner.png"}
                            alt="banner img"
                            height="60"
                            width="468"
                          />
                        </Col>
                        <Col xs={7} className="mt-3 mx-auto">
                          <div className="border border-light rounded text-center p-3 clickable">
                            <Dropzone
                              onDropAccepted={(file) =>
                                setFieldValue("banner", file)
                              }
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <div>
                                    {values.banner
                                      ? values.banner?.[0].path
                                      : "Drag and drop banner .gif here or click to browse files."}
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="mx-2 mt-3">
                <Col>
                  <Card className="bg-800 border-700 shadow">
                    <CardHeader className="bg-600 d-flex justify-content-center h5">
                      Tags
                    </CardHeader>
                    <CardBody>
                      <Row className="mt-2">
                        <Col xs={12}>
                          <SelectField
                            name="tags"
                            className="mt-1"
                            isMulti
                            creatable
                            options={[].concat(
                              tags?.map((t: any) => ({
                                label: t.value,
                                value: t.value,
                              }))
                            )}
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
