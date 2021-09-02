import React from "react";
import classNames from "classnames";

interface ColProps {
  className?: string | TemplateStringsArray;
  size?: number;
  full?: boolean;
}

const Col: React.FC<ColProps> = ({ className, children, size, full }) => {
  return (
    <div
      className={classNames(className, {
        "col-span-1": size === 1,
        "col-span-2": size === 2,
        "col-span-3": size === 3,
        "col-span-4": size === 4,
        "col-span-5": size === 5,
        "col-span-6": size === 6,
        "col-span-7": size === 7,
        "col-span-8": size === 8,
        "col-span-9": size === 9,
        "col-span-10": size === 10,
        "col-span-11": size === 11,
        "col-span-12": size === 12,
        "col-span-full": full,
      })}
    >
      {children}
    </div>
  );
};

export default Col;
