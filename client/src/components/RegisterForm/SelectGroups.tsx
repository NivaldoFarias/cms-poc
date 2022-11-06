import type { MultiValue, ActionMeta } from "react-select";
import type { Dispatch, SetStateAction } from "react";
import type { Forms } from "./";

import { FaUsers } from "react-icons/fa";

import Select, { ValueContainerProps, components } from "react-select";
import "./../../styles/plugins/Select.scss";

export interface Option {
  readonly value: string;
  readonly label: string;
}

export interface Group {
  label: string;
  value: string;
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

interface Props {
  displayError: boolean;
  setForm: Dispatch<SetStateAction<Forms>>;
}

export default function SelectGroups({ displayError, setForm }: Props) {
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
      className={`select-wrapper ${displayError ? "select-wrapper--error" : ""}`}
      classNamePrefix="select-wrapper"
      isMulti={true}
      isSearchable={false}
      openMenuOnFocus={true}
      onChange={handleChangeSelection}
    />
  );

  function handleChangeSelection(newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>) {
    const { action } = actionMeta;

    switch (action) {
      case "select-option": {
        const newGroups = (newValue as Group[]).map((group: Group) => {
          return {
            label: group.label,
            value: group.value,
          };
        });

        setForm((prev) => ({ ...prev, groups: newGroups }));
        break;
      }
      case "remove-value": {
        const newGroups = (newValue as Group[]).map((group: Group) => {
          return {
            label: group.label,
            value: group.value,
          };
        });

        setForm((prev) => ({ ...prev, groups: newGroups }));
        break;
      }
      case "clear": {
        setForm((prev) => ({ ...prev, groups: [] }));
        break;
      }
      case "pop-value": {
        const newGroups = (newValue as Group[]).map((group: Group) => {
          return {
            label: group.label,
            value: group.value,
          };
        });

        setForm((prev) => ({ ...prev, groups: newGroups }));
        break;
      }
      default:
        throw new TypeError("Unsuported action");
    }
  }
}
