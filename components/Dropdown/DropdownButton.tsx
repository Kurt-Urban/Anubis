import React, { useEffect } from "react";

import { Menu } from "@headlessui/react";
import classNames from "classnames";

interface DropdownButtonProps {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "ghost";
  className?: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  color,
  className,
}) => {
  return (
    <>
      <Menu.Button
        className={classNames(className, "btn", {
          "btn-primary": color === "primary",
          "btn-secondary": color === "secondary",
          "btn-accent": color === "accent",
          "btn-info": color === "info",
          "btn-success": color === "success",
          "btn-warning": color === "warning",
          "btn-danger": color === "danger",
          "btn-ghost": color === "ghost",
        })}
      >
        {children}
      </Menu.Button>
    </>
  );
};

export default DropdownButton;
