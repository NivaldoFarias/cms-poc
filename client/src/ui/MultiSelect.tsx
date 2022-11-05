import type { MultiValue, ActionMeta } from "react-select";
import type { IconType } from "react-icons";

import Select, { ValueContainerProps, components } from "react-select";
import "./../styles/plugins/Select.scss";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  state: Option;
  name: string;
  Icon: IconType;
  options: Option[];
  placeholder: string;
  handleChangeSelection: (newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>) => void;
}

export default function MultiSelect(props: Props) {
  const { placeholder, name, options, Icon, handleChangeSelection } = props;

  const ValueContainer = (props: ValueContainerProps) => {
    const { children } = props;
    return (
      <components.ValueContainer {...props}>
        <>
          <Icon className="svg-icon" />
          {children}
        </>
      </components.ValueContainer>
    );
  };

  return (
    <Select
      name={name}
      options={options}
      placeholder={placeholder}
      components={{ ValueContainer }}
      className="select-wrapper"
      classNamePrefix="select-wrapper"
      isMulti={true}
      isSearchable={false}
      openMenuOnFocus={true}
      onChange={handleChangeSelection}
    />
  );
}
