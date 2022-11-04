import "./../styles/plugins/SelectGroups.scss";
import Select from "react-select";

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
  return (
    <Select
      // @ts-ignore
      options={options}
      name="groups"
      placeholder={
        <>
          <FaUsers />
          Seus Grupos
        </>
      }
      className="select-groups"
      classNamePrefix="select-groups"
      isMulti={true}
      isSearchable={false}
      openMenuOnFocus={true}
    />
  );
}
