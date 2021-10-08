import React, { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

interface DropdownItemsProps {
  className?: string;
  width: number;
  bg: string;
}

const DropdownItems: React.FC<DropdownItemsProps> = ({
  children,
  className,
  width,
  bg,
}) => {
  return (
    <>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "mt-1 rounded-md shadow-lg p-1 border border-gray-700",
            `w-${width}`,
            `bg-${bg}`,
            className
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </>
  );
};

export default DropdownItems;
