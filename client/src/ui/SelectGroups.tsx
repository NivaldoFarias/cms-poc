import Select from "react-select";
import "./../styles/plugins/SelectGroups.scss";

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
      defaultValue={["supplier"]}
      name="groups"
      placeholder="Seu Grupo"
      className="select-groups"
      classNamePrefix="select-groups"
      isMulti={true}
      isSearchable={false}
      openMenuOnFocus={true}
    />
  );
}
