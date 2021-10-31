import React from "react";
import classnames from "classnames";
import Switch, { ReactSwitchProps } from "react-switch";
import { FormGroup, Label, UncontrolledTooltip } from "reactstrap";
import { useField } from "formik";
import { FaQuestionCircle } from "react-icons/fa";

interface SwitchProps extends Partial<ReactSwitchProps> {
  label?: string;
  name: string;
  helpMessage?: string;
}

const FormikSwitch: React.SFC<SwitchProps> = ({
  label,
  name,
  helpMessage,
  className,
  ...props
}) => {
  const [{ value }, _, { setValue }] = useField(name);

  return (
    <FormGroup className="d-flex flex-column">
      {label && (
        <Label className="mb-0 mr-3">
          {label}
          {helpMessage && (
            <FaQuestionCircle
              className="ml-1"
              id={`tooltip-${name.replace(/[^a-zA-Z 0-9]+/g, "")}`}
            />
          )}
        </Label>
      )}
      {label && helpMessage && (
        <UncontrolledTooltip
          placement="top"
          target={`tooltip-${name.replace(/[^a-zA-Z 0-9]+/g, "")}`}
        >
          {helpMessage}
        </UncontrolledTooltip>
      )}
      <Switch
        className={classnames("mt-1", className)}
        height={18}
        width={35}
        handleDiameter={18}
        {...props}
        checked={value}
        onChange={(checked: boolean) => setValue(checked)}
      />
    </FormGroup>
  );
};

export default FormikSwitch;
