import React, { Fragment, useEffect } from "react";
import Link from "next/link";

import { Col, Navbar, NavItem, Nav, NavbarBrand, Button } from "reactstrap";
import TopNavSettings from "./TopNavSettings";

const TopNav = ({}) => {
  return (
    <>
      <Navbar color="700" className="p-2 border-bottom border-500">
        <NavbarBrand className="text-light">Server List</NavbarBrand>
        <Nav className="d-flex float-right">
          <NavItem className="d-flex align-items-center">
            <TopNavSettings />
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default TopNav;
