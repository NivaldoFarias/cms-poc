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
  DefaultState,
  GroupComponents,
  InputComponent,
  SelectComponent,
} from "./types";
import type { ActionMeta, MultiValue } from "react-select";
import type { Option } from "../../../ui/MultiSelect";

import { useRef, useState } from "react";
import Link from "next/link";

import { MdOutlineLocationCity } from "react-icons/md";
import { IoIosBarcode } from "react-icons/io";
import { GoPackage } from "react-icons/go";

import { defaultInputRef, defaultState, groups } from "./lib/default";
import InputSection from "../../../ui/InputSection";

import formStyles from "./../../../components/RegisterForm/styles.module.scss";
import styles from "./../styles/page.module.scss";
import MultiSelect from "../../../ui/MultiSelect";

export default function Page({ params, searchParams: { groups_left } }: Params) {
  const slug = parseSlug();
  const [form, setForm] = useState<Forms>(defaultState[slug]);

  const inputRef: ComponentInputRef = useRef<InputRef>(
    defaultInputRef[slug],
  ) as unknown as ComponentInputRef;

  const groupComponents: GroupComponents = {
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
        state: (form as ProvisionsForms).type,
        name: "provisions",
        Icon: GoPackage,
        isSelect: true,
      },
    ],
    cook: [
      {
        state: (form as CookForms).cri,
        label: "Seu CRI (Código da Caderneta)",
        name: "type",
        Icon: IoIosBarcode,
        type: "text",
        isSelect: false,
      },
    ],
  };

  return (
    <div className={styles.page}>
      <p className={styles.title_card}>
        Cadastro de Usuário - <span>{groups[slug]}</span>
      </p>
      <div className={formStyles.form_group}>
        <h3 className={formStyles.header_section}>Crie sua conta</h3>
        <div className={formStyles.input_group}>
          {groupComponents[slug].map((component, index) => {
            return component.isSelect ? (
              <MultiSelect
                key={index}
                name={component.name}
                Icon={component.Icon}
                state={(component as SelectComponent).state}
                options={(component as SelectComponent).options}
                placeholder="Selecione os Suprimentos"
                handleChangeSelection={handleChangeSelection}
              />
            ) : (
              <InputSection
                key={index}
                inputRef={inputRef}
                name={component.name}
                Icon={component.Icon}
                state={component.state as string}
                type={(component as InputComponent).type}
                label={(component as InputComponent).label}
                handleInputBlur={handleInputBlur}
                handleInputFocus={handleInputFocus}
                handleInputChange={handleInputChange}
              />
            );
          })}
        </div>
        <section className={formStyles.footer_section}>
          {!!groups_left ? (
            <Link
              href={`/register/${
                groups_left.includes("-") ? groups_left.split("-")[0] : groups_left
              }${groups_left.includes("-") ? `?groups_left=${groups_left.split("-")[1]}` : ``}`}
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
    </div>
  );

  function parseSlug() {
    return params.slug.includes("-")
      ? (params.slug.split("-")[0] as keyof DefaultState)
      : params.slug;
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function handleInputFocus(event: FocusEvent<HTMLInputElement>) {
    if (event.target.value.length !== 0) return null;

    const { name } = event.target;

    return inputRef.current[name as keyof InputRef]?.classList.add("input-field--active");
  }

  function handleInputBlur(event: FocusEvent<HTMLInputElement>) {
    if (event.target.value.length !== 0) return null;

    const { name } = event.target;

    return inputRef.current[name as keyof InputRef]?.classList.remove("input-field--active");
  }

  function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log(form);
  }

  function handleChangeSelection(newValue: MultiValue<unknown>, actionMeta: ActionMeta<unknown>) {
    const { action } = actionMeta;

    switch (action) {
      case "select-option": {
        const NewProvisions = (newValue as Option[]).map(({ label, value }: Option) => {
          return { label, value };
        });

        setForm((prev) => ({ ...prev, provisions: NewProvisions }));
        break;
      }
      case "remove-value": {
        const NewProvisions = (newValue as Option[]).map(({ label, value }: Option) => {
          return { label, value };
        });

        setForm((prev) => ({ ...prev, provisions: NewProvisions }));
        break;
      }
      case "clear": {
        setForm((prev) => ({ ...prev, provisions: [] }));
        break;
      }
      case "pop-value": {
        const NewProvisions = (newValue as Option[]).map(({ label, value }: Option) => {
          return { label, value };
        });

        setForm((prev) => ({ ...prev, provisions: NewProvisions }));
        break;
      }
      default:
        throw new TypeError("Unsuported action");
    }
  }
}
