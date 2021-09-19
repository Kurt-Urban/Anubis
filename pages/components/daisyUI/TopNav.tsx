import React, { useEffect } from "react";
import { Menu } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import GoogleAuth from "../utils/GoogleAuth";

const TopNav = ({}) => {
  return (
    <>
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Server List</span>
        </div>
        <div>
          <Menu>
            <Menu.Button>
              <FaBars className="text-xl" />
            </Menu.Button>
            <Menu.Items>
              <Menu.Item>
                {({ active }) => (
                  <button className={`${active && "bg-blue-500"}`}>Test</button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default TopNav;
