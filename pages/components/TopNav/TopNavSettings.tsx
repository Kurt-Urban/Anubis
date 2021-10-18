import classNames from "classnames";
import React from "react";

import {
  Button,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Col,
  Row,
} from "reactstrap";
import { FaBars } from "react-icons/fa";
import { useUser } from "../../../hooks";
import GoogleAuth from "../utils/GoogleAuth";

const TopNavSettings = ({}) => {
  const {
    user: { firstName, email },
  } = useUser();

  return (
    <>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle className="d-flex bg-transparent border-0 text-200 align-items-center py-2">
          <FaBars />
        </DropdownToggle>
        <DropdownMenu right className="bg-darker mx-1 p-4">
          {firstName ? (
            <Row>
              <Col xs={12} className="mb-2">
                <span className="text-light h5">Hello {firstName}!</span>
              </Col>
              <Col xs={12}>
                <small className="text-light">Signed in as {email}</small>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col xs={12}>
                <GoogleAuth />
              </Col>
            </Row>
          )}
          <hr className="bg-300" />
          <Row className="mt-3">
            <Col xs={12} className="d-flex justify-content-center">
              <Button
                color="accent"
                outline
                className=""
                onClick={() => {
                  window?.gapi?.auth2?.getAuthInstance()?.signOut();
                  window.location.reload();
                }}
              >
                Sign Out
              </Button>{" "}
            </Col>
          </Row>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default TopNavSettings;
