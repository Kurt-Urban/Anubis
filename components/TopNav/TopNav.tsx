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
            <a className="text-white h5 mb-0 ml-2">Minecwaft Servers</a>
          </Link>
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
