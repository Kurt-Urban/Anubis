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
  placeholder?: string;
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
  placeholder,
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
      return values?.[name].map((option) => ({ value: option, label: option }));
    return { label: values?.[name], value: values?.[name] };
  };

  return creatable ? (
    <Creatable
      className={classNames("text-darkest", className)}
      onChange={(e: any) => onChange(e)}
      options={options}
      isMulti={isMulti}
      defaultValue={defaultValue}
      isClearable
      placeholder={placeholder}
    />
  ) : (
    <Select
      className={classNames("text-darkest", className)}
      onChange={(e: any) => onChange(e)}
      options={options}
      isMulti={isMulti}
      isClearable={isMulti}
      defaultValue={defaultValue}
      isDisabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default SelectField;
