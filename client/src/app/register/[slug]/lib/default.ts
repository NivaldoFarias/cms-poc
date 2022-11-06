import type { InitialDisplayError, InitialInputRef, InitialState } from "../types";

export const form: InitialState = {
  supplier: {
    name: "",
    cnpj: "",
  },
  provisions: [],
  cook: {
    cri: "",
  },
};

export const displayError: InitialDisplayError = {
  supplier: {
    name: false,
    cnpj: false,
  },
  provisions: {
    type: false,
  },
  cook: {
    cri: false,
  },
};

export const inputRef: InitialInputRef = {
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
