import classNames from "classnames";
import useUser from "hooks/useUser";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaServer } from "react-icons/fa";
import { Button, Col, Container, Row } from "reactstrap";

const Auth: React.FC = () => {
  const [newUser, setNewUser] = useState(false);
  const history = useRouter();
  const { user, signIn, signUp } = useUser();

  return (
    <Formik
      initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
          .min(8, "Must be at least 8 characters.")
          .required("Required"),
      })}
      onSubmit={async (values) => {
        if (newUser) {
          await signUp({
            email: values.email.toLowerCase(),
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          });
        }
        if (!newUser) {
          await signIn({
            email: values.email.toLowerCase(),
            password: values.password,
          });
          history.push("/");
        }
      }}
      render={() => (
        <Form className="page-container">
          <Container className="h-25 p-0 w-25 d-flex">
            <div className="mt-auto mb-1 h4 align-items-middle text-lighter">
              <FaServer className="mb-1" /> {newUser ? "Sign Up" : "Login"}
            </div>
          </Container>
          <Container className="w-25 my-auto">
            <Row className="mt-3">
              <Field
                name="email"
                type="email"
                className="form-control bg-transparent text-lighter border-primary"
                placeholder="Email"
              />
              <small className="mt-1 text-danger">
                <ErrorMessage name="email" />
              </small>
            </Row>
            <Row className="mt-4">
              <Field
                name="password"
                className="form-control bg-transparent text-lighter border-primary"
                type="password"
                placeholder="Password"
              />
              <small className="mt-1 text-danger">
                <ErrorMessage name="password" />
              </small>
            </Row>
            <Row className={classNames("mt-4", { "d-none": !newUser })}>
              <Col className="pl-0">
                <Field
                  name="firstName"
                  className="form-control bg-transparent text-lighter border-primary"
                  type="firstName"
                  placeholder="First Name"
                />
                <small className="mt-1 text-danger">
                  <ErrorMessage name="firstName" />
                </small>
              </Col>
              <Col className="p-0">
                <Field
                  name="lastName"
                  className="form-control bg-transparent text-lighter border-primary"
                  type="lastName"
                  placeholder="Last Name"
                />
                <small className="mt-1 text-danger">
                  <ErrorMessage name="lastName" />
                </small>
              </Col>
            </Row>
            <Row className="mt-2 justify-content-end">
              <div className="text-muted d-flex align-items-center">
                {newUser ? "" : "New User? Click"}
                <Button
                  className="ml-1 p-0 border-0 text-secondary shadow-none"
                  color="transparent"
                  outline
                  onClick={() => setNewUser((o) => !o)}
                >
                  {newUser ? "Go Back" : "Here"}
                </Button>
              </div>
            </Row>
            <Row className="justify-content-end">
              <Button color="accent" type="submit" outline className="mt-3">
                {newUser ? "Sign Up" : "Login"}
              </Button>
            </Row>
          </Container>
        </Form>
      )}
    ></Formik>
  );
};

export default Auth;
