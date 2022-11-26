import type { MutableRefObject } from "react";
import type { IconType } from "react-icons";

// TODO: declare namespaces for each User type (e.g. Supplier)

declare interface Supplier<T> {
    name: T;
    cnpj: T;
}

declare interface Provisions<T> {
    type: T;
}

declare interface Cook<T> {
    cir: T;
}

declare interface InputComponent {
    state: string;
    label: string;
    name: string;
    Icon: IconType;
    type: string;
    isSelect: boolean;
}

declare interface SelectComponent {
    options: Option[];
    key: string;
    Icon: IconType;
    isSelect: boolean;
}

declare interface Initial<T> {
    supplier: Supplier<T>;
    provisions: Provisions<T>;
    cook: Cook<T>;
}
export interface InitialState {
    supplier: SupplierForms;
    provisions: ProvisionsForms;
    cook: CookForms;
}
export type InitialInputRef = Initial<null>;
export type InitialDisplayError = {
    supplier: Supplier<boolean>;
    provisions: Provisions<boolean>;
    cook: Cook<boolean>;
};

export type DisplayError =
    | Supplier<boolean>
    | Provisions<boolean>
    | Cook<boolean>;

export interface Props {
    params: {
        slug: "supplier" | "provisions" | "cook";
    };
    searchParams?: {
        groups_left: string;
    };
}

export type SupplierRef = Supplier<HTMLInputElement | null>;
export type SupplierForms = Supplier<string>;

declare interface Macarrao {
    label: "Macarrão";
    value: "macarrao";
}
declare interface Arroz {
    label: "Arroz";
    value: "arroz";
}
declare interface Feijao {
    label: "Feijão";
    value: "feijao";
}

declare type Option = Macarrao | Arroz | Feijao;

export type ProvisionsRef = Provisions<HTMLInputElement | null>;
export type ProvisionsForms = Option[];

export type CookRef = Cook<HTMLInputElement | null>;
export type CookForms = Cook<string>;

export type GroupComponents = {
    supplier: InputComponent[];
    provisions: SelectComponent[];
    cook: InputComponent[];
};

export type Forms = SupplierForms | ProvisionsForms | CookForms;
export type InputRef = SupplierRef | ProvisionsRef | CookRef;
export type ComponentInputRef = MutableRefObject<
    Record<string, HTMLInputElement | null>
>;

export type DisplayerErrorState =
    | {
          name: boolean;
          cnpj: boolean;
      }
    | {
          type: boolean;
      }
    | {
          cir: boolean;
      };
