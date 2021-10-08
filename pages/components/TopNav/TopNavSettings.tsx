import React, { useEffect } from "react";

import { FaBars } from "react-icons/fa";
import useUser from "../../../hooks/useUser";
import GoogleAuth from "../utils/GoogleAuth";

const TopNavSettings = ({}) => {
  return (
    <>
      <div className="dropdown dropdown-end float-right">
        <div tabIndex={0} className="m-1 text-lg btn btn-ghost">
          <FaBars />
        </div>
        <ul
          tabIndex={0}
          className="py-2 shadow menu dropdown-content bg-gray-600 rounded-md w-52 mr-1"
        >
          <li className="py-2 px-3">
            <GoogleAuth />
          </li>
          <hr className="border-gray-500 mb-2" />
          <li>
            <button className="py-1 btn btn-ghost justify-start rounded-none"></button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TopNavSettings;
