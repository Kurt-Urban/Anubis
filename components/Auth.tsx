import classNames from "classnames";
import { Field, Form, Formik } from "formik";
import useUser from "hooks/useUser";
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
      onSubmit={async (values) => {
        if (newUser) {
          await signUp({
            email: values.email.toLowerCase(),
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          });
          history.push(`/profile/${user.id}`);
        }
        if (!newUser) {
          await signIn({
            email: values.email.toLowerCase(),
            password: values.password,
          });
          history.push("/");
        }
      }}
    >
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
              className="form-control bg-transparent text-lightest border-primary"
              placeholder="Email"
            />
          </Row>
          <Row className="mt-4">
            <Field
              name="password"
              className="form-control bg-transparent text-lightest border-primary"
              type="password"
              placeholder="Password"
            />
          </Row>
          <Row className={classNames("mt-4", { "d-none": !newUser })}>
            <Col className="pl-0">
              <Field
                name="firstName"
                className="form-control bg-transparent text-lightest border-primary"
                type="firstName"
                placeholder="First Name"
              />
            </Col>
            <Col className="p-0">
              <Field
                name="lastName"
                className="form-control bg-transparent text-lightest border-primary"
                type="lastName"
                placeholder="Last Name"
              />
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
    </Formik>
  );
};

export default Auth;
