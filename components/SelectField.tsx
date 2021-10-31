import React from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { useFormikContext } from "formik";
import classNames from "classnames";

interface SelectProps {
  options: object[];
  name: string;
  isMulti?: boolean;
  className?: string;
  creatable?: boolean;
  disabled?: boolean;
}

interface Option {
  value: any;
  label: string;
}

const SelectField: React.FC<SelectProps> = ({
  options,
  isMulti,
  name,
  className,
  creatable,
  disabled,
}) => {
  const { setFieldValue, values } = useFormikContext();

  const onChange = (options: Option[]) => {
    setFieldValue(
      name,
      isMulti ? options?.map((item: Option) => item.value) : options?.value
    );
  };

  const defaultValue = () => {
    if (Array.isArray(values?.[name]))
      return options.map((option) => {
        if (values?.[name].filter((o) => o === option.value)) {
          return option;
        }
      });

    if (!Array.isArray(values?.[name]))
      return options.filter((option: any) => option?.value === values?.[name]);

    return;
  };

  return creatable ? (
    <Creatable
      className={classNames("text-darkest", className)}
      onChange={(e: any) => onChange(e)}
      options={options}
      isMulti={isMulti}
      defaultValue={defaultValue()}
      isClearable
    />
  ) : (
    <Select
      className={classNames("text-darkest", className)}
      onChange={(e: any) => onChange(e)}
      options={options}
      isMulti={isMulti}
      isClearable={isMulti}
      defaultValue={defaultValue()}
      isDisabled={disabled}
    />
  );
};

export default SelectField;
