import classNames from "classnames";
import React from "react";

import { Button } from "@sonic-web-dev/core";
import { FaBars } from "react-icons/fa";
import { useUser } from "../../../hooks";
import GoogleAuth from "../utils/GoogleAuth";
import GoogleLogout from "../utils/GoogleLogout";

const TopNavSettings = ({}) => {
  const {
    user: { firstName, email },
    setGoogleUser,
  } = useUser();

  const logout = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="dropdown dropdown-end dropdown-open float-right">
        <div tabIndex={0} className="m-1 text-lg btn btn-ghost">
          <FaBars />
        </div>
        <ul
          tabIndex={0}
          className="py-2 shadow menu dropdown-content bg-gray-600 rounded-md w-56 mr-1"
        >
          <div className={classNames(email !== "" ? "hidden" : "")}>
            <li className="py-2 px-3">
              <GoogleAuth />
            </li>
          </div>
          <div className={classNames(email !== "" ? "" : "hidden")}>
            <li className="py-2 px-3">
              <span className="h-3">Hello {firstName}!</span>
              <span className="text-xs h-12">Signed in as {email}</span>
            </li>
          </div>
          <hr className="border-gray-500 mb-2" />
          <li>
            <Button
              color="black"
              className="mx-2 py-0 btn btn-ghost max-h-3 justify-center rounded-none"
            >
              <span className="font-normal">Account</span>
            </Button>
          </li>
          <li>
            <Button
              color="black"
              className="mx-2 py-0 btn btn-ghost max-h-3 justify-center "
            >
              <span className="font-normal">My Servers</span>
            </Button>
          </li>
          <li>
            <Button
              color="black"
              className="mx-2 py-0 btn btn-ghost max-h-3 justify-center "
            >
              <span className="font-normal">Open Bids</span>
            </Button>
          </li>

          <hr className="border-gray-500 my-2 " />
          <li>
            <Button
              color="black"
              className="mx-2 py-0 btn btn-ghost max-h-3 justify-center"
              onClick={() => {
                window?.gapi?.auth2?.getAuthInstance()?.signOut();
                window.location.reload();
              }}
            >
              Sign Out
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TopNavSettings;
