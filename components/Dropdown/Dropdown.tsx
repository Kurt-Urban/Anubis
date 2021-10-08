import React from "react";

import { Menu } from "@headlessui/react";
import classNames from "classnames";

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, className }) => {
  return (
    <Menu as="div" className={classNames(className)}>
      {children}
    </Menu>
  );
};

export default Dropdown;
