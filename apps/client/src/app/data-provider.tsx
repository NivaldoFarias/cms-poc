"use client";

import type { Cook, Provisions, Supplier } from "./register/[slug]/types";
import { useState, createContext } from "react";

export type ContextType =
  | { data: Data; setData: () => void }
  | { data: Data; setData: React.Dispatch<React.SetStateAction<Data>> };
export type Groups = {
  supplier: Supplier<string>;
  provisions: Provisions<("macarrao" | "arroz" | "feijao")[]>;
  cook: Cook<string>;
};
export type Data = {
  email: string;
  name: string;
  password: string;
  groups: Groups;
};

const initialState = {
  email: "",
  name: "",
  password: "",
  groups: {
    supplier: {
      name: "",
      cnpj: "",
    },
    provisions: {
      type: [],
    },
    cook: {
      cir: "",
    },
  },
};

// eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
const DataContext = createContext<ContextType>({
  data: initialState,
  setData: () => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Data>(initialState);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
