import React, { Fragment, useEffect } from "react";
import Link from "next/link";

import {
  Col,
  Navbar,
  NavItem,
  Nav,
  NavbarBrand,
  Button,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
} from "reactstrap";
import { TopNavSettings } from "@/components";
import { FaMicrosoft } from "react-icons/fa";

const TopNav: React.FC = ({}) => {
  return (
    <>
      <Navbar color="700" className="p-2 border-bottom border-500">
        <Nav>
          <Link href="/">
            <a className="text-white h5 mb-0 ml-2">Servers</a>
          </Link>
        </Nav>
        <Nav>
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              className="bg-transparent border-0 shadow-none text-200"
            >
              Games
            </DropdownToggle>
            <DropdownMenu right className="bg-darker p-3">
              <Row>
                <Col xs={12} className="d-flex justify-content-center mb-2">
                  <DropdownItem className="text-100 bg-transparent d-flex justify-content-center">
                    <Link href="/Minecraft" passHref>
                      <div className="d-flex text-accent align-items-center">
                        <FaMicrosoft className="mr-2" />
                        Minecraft
                      </div>
                    </Link>
                  </DropdownItem>
                </Col>
              </Row>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav className="d-flex float-right">
          <NavItem>
            <TopNavSettings />
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default TopNav;
