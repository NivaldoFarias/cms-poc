import { MutableRefObject } from "react";

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
  type: "Feijão" | "Macarrão" | "Arroz" | "";
}

export interface CookForms {
  cri: string;
}

export type InputRef = SupplierRef | ProvisionsRef | CookRef;

export type Forms = SupplierForms | ProvisionsForms | CookForms;

export type ComponentInputRef = MutableRefObject<Record<string, HTMLInputElement | null>>;
