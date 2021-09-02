import React from "react";
import classNames from "classnames";

interface ContainerProps {
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
  className?: string | TemplateStringsArray;
  gridCols?: number;
  gridRows?: number;
}

const Container: React.FC<ContainerProps> = ({
  sm,
  md,
  lg,
  xl,
  xxl,
  children,
  className,
  gridCols,
  gridRows,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(
        className,
        {
          "sm:container": sm,
          "md:container": md,
          "lg:container": lg,
          "xl:container": xl,
          "2xl:container": xxl,
          "container ": !sm && !md && !lg && !xl && !xxl,
        },
        {
          "grid grid-cols-1": gridCols === 1,
          "grid grid-cols-2": gridCols === 2,
          "grid grid-cols-3": gridCols === 3,
          "grid grid-cols-4": gridCols === 4,
          "grid grid-cols-5": gridCols === 5,
          "grid grid-cols-6": gridCols === 6,
          "grid grid-cols-7": gridCols === 7,
          "grid grid-cols-8": gridCols === 8,
          "grid grid-cols-9": gridCols === 9,
          "grid grid-cols-10": gridCols === 10,
          "grid grid-cols-11": gridCols === 11,
          "grid grid-cols-12": gridCols === 12,
        },
        {
          "grid grid-rows-1": gridRows === 1,
          "grid grid-rows-2": gridRows === 2,
          "grid grid-rows-3": gridRows === 3,
          "grid grid-rows-4": gridRows === 4,
          "grid grid-rows-5": gridRows === 5,
          "grid grid-rows-6": gridRows === 6,
          "grid grid-rows-7": gridRows === 7,
          "grid grid-rows-8": gridRows === 8,
          "grid grid-rows-9": gridRows === 9,
          "grid grid-rows-10": gridRows === 10,
          "grid grid-rows-11": gridRows === 11,
          "grid grid-rows-12": gridRows === 12,
        }
      )}
    >
      {children}
    </div>
  );
};

export default Container;
