"use client";

import type { ChangeEvent, FocusEvent, MouseEvent } from "react";
import type {
  ComponentInputRef,
  CookForms,
  Forms,
  InputRef,
  Params,
  ProvisionsForms,
  SupplierForms,
} from "./types";
import { useRef, useState } from "react";

import { MdOutlineLocationCity } from "react-icons/md";
import { IoIosBarcode } from "react-icons/io";
import { GoPackage } from "react-icons/go";

import formStyles from "./../../../components/RegisterForm/styles.module.scss";
import styles from "./../styles/page.module.scss";

import InputSection from "../../../ui/InputSection";
import { defaultInputRef, defaultState, groups } from "./lib/default";
import Link from "next/link";
import { DefaultState } from "./types";

export default function Page({ params, searchParams: { groups_left } }: Params) {
  const slug = params.slug.includes("-")
    ? (params.slug.split("-")[ 0 ] as keyof DefaultState)
    : params.slug;
  const [ form, setForm ] = useState<Forms>(defaultState[ slug ]);

  const inputRef: ComponentInputRef = useRef<InputRef>(
    defaultInputRef[ slug ],
  ) as unknown as ComponentInputRef;

  const GroupComponents = {
    supplier: [
      {
        state: (form as SupplierForms).name,
        label: "Nome da sua Empresa",
        name: "name",
        Icon: MdOutlineLocationCity,
        type: "text",
      },
      {
        state: (form as SupplierForms).cnpj,
        label: "CNPJ da sua Empresa",
        name: "cnpj",
        Icon: IoIosBarcode,
        type: "text",
      },
    ],
    provisions: [
      {
        state: (form as ProvisionsForms).type,
        label: "Selecione os Suprimentos",
        name: "type",
        Icon: GoPackage,
        type: "text",
      },
    ],
    cook: [
      {
        state: (form as CookForms).cri,
        label: "Seu CRI (Código da Caderneta)",
        name: "type",
        Icon: IoIosBarcode,
        type: "text",
      },
    ],
  };

  console.log({ groups_left });

  return (
    <>
      <p className={styles.title_card}>
        Cadastro de Usuário - <span>{groups[ slug ]}</span>
      </p>
      <div className={formStyles.form_group}>
        {" "}
        <h3 className={formStyles.header_section}>Crie sua conta</h3>
        <div className={formStyles.input_group}>
          {GroupComponents[ slug ].map((component, index) => {
            const { state, label, name, Icon, type } = component;

            return (
              <InputSection
                key={index}
                state={state}
                label={label}
                name={name}
                Icon={Icon}
                type={type}
                inputRef={inputRef}
                handleInputChange={handleInputChange}
                handleInputFocus={handleInputFocus}
                handleInputBlur={handleInputBlur}
              />
            );
          })}
        </div>
        <section className={formStyles.footer_section}>
          {!!groups_left ? (
            <Link
              href={`/register/${groups_left.includes("-") ? groups_left.split("-")[ 0 ] : groups_left
                }${groups_left.includes("-") ? `?groups_left=${groups_left.split("-")[ 1 ]}` : ``}`}
              className={formStyles.next_btn}
            >
              PRÓXIMO
            </Link>
          ) : (
            <button
              className={formStyles.next_btn}
              onClick={handleSubmit}
            >
              Cadastrar
            </button>
          )}
        </section>
      </div>
    </>
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({ ...form, [ name ]: value });
  }

  function handleInputFocus(event: FocusEvent<HTMLInputElement>) {
    if (event.target.value.length !== 0) return null;

    const { name } = event.target;

    return inputRef.current[ name as keyof InputRef ]?.classList.add("input-field--active");
  }

  function handleInputBlur(event: FocusEvent<HTMLInputElement>) {
    if (event.target.value.length !== 0) return null;

    const { name } = event.target;

    return inputRef.current[ name as keyof InputRef ]?.classList.remove("input-field--active");
  }

  function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log(form);
  }
}
