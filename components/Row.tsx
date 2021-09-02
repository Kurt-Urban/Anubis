import React from "react";
import classNames from "classnames";

interface RowProps {
  className?: string | TemplateStringsArray;
  size?: number;
}

const Row: React.FC<RowProps> = ({ className, children, size }) => {
  return (
    <div
      className={classNames(className, {
        "row-span-1": size === 1,
        "row-span-2": size === 2,
        "row-span-3": size === 3,
        "row-span-4": size === 4,
        "row-span-5": size === 5,
        "row-span-6": size === 6,
        "row-span-7": size === 7,
        "row-span-8": size === 8,
        "row-span-9": size === 9,
        "row-span-10": size === 10,
        "row-span-11": size === 11,
        "row-span-12": size === 12,
      })}
    >
      {children}
    </div>
  );
};

export default Row;
