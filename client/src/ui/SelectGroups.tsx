import "./../styles/plugins/SelectGroups.scss";
import Select, { ValueContainerProps, components } from "react-select";

import { FaUsers } from "react-icons/fa";

interface Option {
  readonly value: string;
  readonly label: string;
}

const options: Option[] = [
  {
    label: "Fornecedor",
    value: "supplier",
  },
  {
    label: "Suprimentos",
    value: "provisions",
  },
  {
    label: "Cozinheiro",
    value: "cook",
  },
];

export default function SelectGroups() {
  const ValueContainer = (props: ValueContainerProps) => {
    const { children } = props;
    return (
      <components.ValueContainer {...props}>
        <>
          <FaUsers className="svg-icon" />
          {children}
        </>
      </components.ValueContainer>
    );
  };

  return (
    <Select
      // @ts-ignore
      options={options}
      name="groups"
      placeholder="Seus Grupos"
      components={{ ValueContainer }}
      className="select-groups"
      classNamePrefix="select-groups"
      isMulti={true}
      isSearchable={false}
      openMenuOnFocus={true}
    />
  );
}
