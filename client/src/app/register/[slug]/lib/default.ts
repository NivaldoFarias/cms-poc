import type { DefaultInputRef, DefaultState } from "../types";

export const defaultState: DefaultState = {
  supplier: {
    name: "",
    cnpj: "",
  },
  provisions: {
    type: "",
  },
  cook: {
    cri: "",
  },
};

export const defaultInputRef: DefaultInputRef = {
  supplier: {
    name: null,
    cnpj: null,
  },
  provisions: {
    type: null,
  },
  cook: {
    cri: null,
  },
};

export const groups = {
  provisions: "Suprimentos",
  supplier: "Fornecedor",
  cook: "Cozinheiro",
};
