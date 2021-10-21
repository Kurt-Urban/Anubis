import classNames from "classnames";
import React from "react";
import { useUser } from "../../hooks";

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

import Link from "next/link";

import GoogleAuth from "../GoogleAuth";

const TopNavSettings: React.FC = ({}) => {
  const {
    user: { firstName, email, googleID },
  } = useUser();

  return (
    <>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle className="d-flex bg-transparent border-0 text-lighter align-items-center py-2">
          <FaBars />
        </DropdownToggle>
        <DropdownMenu right className="bg-darker mx-1 px-4 py-3">
          {firstName ? (
            <>
              <Row>
                <Col xs={12} className="mb-2">
                  <span className="text-lighter h5">Hello {firstName}!</span>
                </Col>
                <Col xs={12}>
                  <small className="text-lighter">Signed in as {email}</small>
                </Col>
              </Row>
              <hr className="bg-300" />
              <Row>
                <Col xs={12} className="d-flex justify-content-center mb-2">
                  <DropdownItem className="text-300 bg-transparent d-flex justify-content-center">
                    <Link passHref href={`/profile/${googleID}`}>
                      <div>Profile</div>
                    </Link>
                  </DropdownItem>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="d-flex justify-content-center mb-2">
                  <DropdownItem className="text-300 bg-transparent d-flex justify-content-center">
                    <Link passHref href="/profile/favorites">
                      <div>Favorites</div>
                    </Link>
                  </DropdownItem>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="d-flex justify-content-center mb-2">
                  <DropdownItem className="text-300 bg-transparent d-flex justify-content-center">
                    <Link passHref href="/profile/servers">
                      <div>Servers</div>
                    </Link>
                  </DropdownItem>
                </Col>
              </Row>
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
            </>
          ) : (
            <Row>
              <Col xs={12} className="d-flex justify-content-center mb-2">
                <small className="text-light">Please Sign In</small>
              </Col>
              <Col xs={12} className="d-flex justify-content-center">
                <GoogleAuth />
              </Col>
            </Row>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default TopNavSettings;