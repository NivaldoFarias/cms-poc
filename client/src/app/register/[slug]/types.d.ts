import type { ActionMeta, MultiValue } from "react-select";
import type { Option } from "../../../ui/MultiSelect";
import type { MutableRefObject } from "react";
import type { IconType } from "react-icons";

export interface DefaultState {
  supplier: SupplierForms;
  provisions: ProvisionsForms;
  cook: CookForms;
}

export interface DefaultInputRef {
  supplier: {
    name: null;
    cnpj: null;
  };
  provisions: {
    type: null;
  };
  cook: {
    cri: null;
  };
}

export interface Params {
  params: {
    slug: "supplier" | "provisions" | "cook";
  };
  searchParams: {
    groups_left: string;
  };
}

export interface SupplierRef {
  name: HTMLInputElement | null;
  cnpj: HTMLInputElement | null;
}

export interface ProvisionsRef {
  type: HTMLInputElement | null;
}

export interface CookRef {
  cri: HTMLInputElement | null;
}
export interface SupplierForms {
  name: string;
  cnpj: string;
}

export interface ProvisionsForms {
  type: {
    label: "Feijão" | "Macarrão" | "Arroz" | "";
    value: "feijao" | "macarrao" | "arroz" | "";
  };
}

export interface CookForms {
  cri: string;
}

interface InputComponent {
  state: string;
  label: string;
  name: string;
  Icon: IconType;
  type: string;
  isSelect: boolean;
}

interface SelectComponent {
  options: Option[];
  state: Option;
  name: string;
  Icon: IconType;
  isSelect: boolean;
}

export interface GroupComponents {
  supplier: InputComponent[];
  provisions: SelectComponent[];
  cook: InputComponent[];
}

export type InputRef = SupplierRef | ProvisionsRef | CookRef;

export type Forms = SupplierForms | ProvisionsForms | CookForms;

export type ComponentInputRef = MutableRefObject<Record<string, HTMLInputElement | null>>;
