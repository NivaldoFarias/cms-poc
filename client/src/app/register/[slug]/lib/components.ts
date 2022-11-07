import type { CookForms, Forms, GroupComponents, SupplierForms } from "../types";

import { MdOutlineLocationCity } from "react-icons/md";
import { IoIosBarcode } from "react-icons/io";
import { GoPackage } from "react-icons/go";

type GenerateComponents = (form: Forms) => GroupComponents;

const generateComponents: GenerateComponents = (form) => {
  return {
    supplier: [
      {
        state: (form as SupplierForms).name,
        label: "Nome da sua Empresa",
        name: "name",
        Icon: MdOutlineLocationCity,
        type: "text",
        isSelect: false,
      },
      {
        state: (form as SupplierForms).cnpj,
        label: "CNPJ da sua Empresa",
        name: "cnpj",
        Icon: IoIosBarcode,
        type: "text",
        isSelect: false,
      },
    ],
    provisions: [
      {
        options: [
          {
            label: "Macarrão",
            value: "macarrao",
          },
          {
            label: "Feijão",
            value: "feijao",
          },
          {
            label: "Arroz",
            value: "arroz",
          },
        ],
        key: "type",
        Icon: GoPackage,
        isSelect: true,
      },
    ],
    cook: [
      {
        state: (form as CookForms).cir,
        label: "Seu CIR (Código da Caderneta)",
        name: "cir",
        Icon: IoIosBarcode,
        type: "text",
        isSelect: false,
      },
    ],
  };
};

export default generateComponents;
