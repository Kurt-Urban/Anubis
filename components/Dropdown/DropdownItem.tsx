import React, { useEffect } from "react";

import { Menu } from "@headlessui/react";

interface DropdownItemProps {
  className?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, className }) => {
  return (
    <>
      <Menu.Item>{({ active }) => children}</Menu.Item>
    </>
  );
};

export default DropdownItem;
