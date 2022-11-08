"use client";

import type {
  ComponentInputRef,
  InputRef,
  SelectComponent,
  InputComponent,
  SupplierForms,
  ProvisionsForms,
  CookForms,
  Forms,
  Supplier,
  Provisions,
  Cook,
  DisplayError,
  InitialState,
  Props,
  DisplayerErrorState,
} from "./types";
import { ChangeEvent, FocusEvent, MouseEvent, useContext } from "react";
import type { ActionMeta, MultiValue } from "react-select";
import type { Option } from "../../../ui/MultiSelect";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import MultiSelect from "../../../ui/MultiSelect";
import InputSection from "../../../ui/InputSection";

import formStyles from "./../../../components/RegisterForm/styles/styles.module.scss";
import styles from "./../styles/page.module.scss";

import { RegisterUserForm, useRegister } from "../../../hooks/useAPI";
import generateComponents from "./lib/components";
import * as initial from "./lib/default";
import DataContext from "../../data-provider";
import { toast, ToastContainer } from "react-toastify";

export default function Page({ params, searchParams: { groups_left } }: Props) {
  const slug = __parseSlug(params);

  const [ displayError, setDisplayError ] = useState<DisplayError>(initial.displayError[ slug ]);
  const [ form, setForm ] = useState<Forms>(initial.form[ slug ]);
  const inputRef: ComponentInputRef = useRef<InputRef>(
    initial.inputRef[ slug ],
  ) as unknown as ComponentInputRef;

  const { data, setData } = useContext(DataContext);
  const components = generateComponents(form);
  const router = useRouter();

  const page = buildPage();

  return (
    <form
      className={styles.page}
      onSubmit={handleSubmit}
    >
      {page}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </form>
  );

  function buildPage() {
    return (
      <>
        <p className={styles.title_card}>
          Cadastro de Usuário - <span>{initial.groups[ slug ]}</span>
        </p>
        <div className={formStyles.form_group}>
          <h3 className={formStyles.header_section}>cire sua conta</h3>
          <div className={formStyles.input_group}>
            {components[ slug ].map((component, index) => {
              return component.isSelect ? (
                <MultiSelect
                  key={index}
                  Icon={component.Icon}
                  placeholder="Selecione os Suprimentos"
                  handleChangeSelection={handleChangeSelection}
                  options={(component as SelectComponent).options}
                  displayError={
                    displayError[ (component as SelectComponent).key as keyof DisplayError ]
                  }
                />
              ) : (
                <InputSection
                  key={index}
                  inputRef={inputRef}
                  name={(component as InputComponent).name}
                  Icon={component.Icon}
                  state={(component as InputComponent).state as string}
                  type={(component as InputComponent).type}
                  label={(component as InputComponent).label}
                  displayError={
                    displayError[ (component as InputComponent).name as keyof DisplayError ]
                  }
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
                href={parseHref()}
                className={formStyles.next_btn}
                onClick={handleNextBtnClick}
              >
                PRÓXIMO
              </Link>
            ) : (
              <button
                className={formStyles.next_btn}
                type={"submit"}
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

    function parseHref() {
      const slug = groups_left.includes("-") ? groups_left.split("-")[ 0 ] : groups_left;
      const searchParams = groups_left.includes("-")
        ? `?groups_left=${groups_left.split("-")[ 1 ]}`
        : ``;

      return `/register/${slug}${searchParams}`;
    }
  }

  function handleSubmit(event: MouseEvent<HTMLFormElement>) {
    checkForms(event, { ...displayError });
    if (!event.defaultPrevented) event.preventDefault();

    console.log({ data, form });

    return registerUser();
  }

  function handleNextBtnClick(event: MouseEvent<HTMLAnchorElement>) {
    const newDisplayErrorState = { ...displayError };

    checkForms(event, newDisplayErrorState);

    const stateChanged = Object.values(newDisplayErrorState).some((value) => value === true);

    if (stateChanged) {
      toast.warn("Revise os campos destacados!", {
        progress: undefined,
      });
      setDisplayError(newDisplayErrorState);
    }
    if (!event.defaultPrevented) {
      return setData({
        ...data,
        groups: {
          ...data.groups,
          [ slug ]: form,
        },
      });
    }

    return null;
  }

  function checkForms(
    event: MouseEvent<HTMLAnchorElement | HTMLFormElement, globalThis.MouseEvent>,
    newDisplayErrorState: DisplayerErrorState,
  ) {
    switch (slug) {
      case "supplier" as keyof InitialState: {
        const { name, cnpj } = form as SupplierForms;

        if (name.length === 0) {
          if (!event.defaultPrevented) event.preventDefault();
          (newDisplayErrorState as Supplier<boolean>).name = true;
        } else if ((displayError as Supplier<boolean>).name) {
          (newDisplayErrorState as Supplier<boolean>).name = false;
        }

        if (cnpj.length !== 14) {
          if (!event.defaultPrevented) event.preventDefault();
          (newDisplayErrorState as unknown as Supplier<boolean>).cnpj = true;
        } else if ((displayError as unknown as Supplier<boolean>).cnpj) {
          (newDisplayErrorState as unknown as Supplier<boolean>).cnpj = false;
        }
        break;
      }
      case "provisions" as keyof InitialState: {
        if ((form as ProvisionsForms).length === 0) {
          if (!event.defaultPrevented) event.preventDefault();
          (newDisplayErrorState as Provisions<boolean>).type = true;
        } else if ((displayError as Provisions<boolean>).type) {
          (newDisplayErrorState as Provisions<boolean>).type = false;
        }
        break;
      }
      case "cook" as keyof InitialState: {
        const { cir } = form as CookForms;

        if (cir.length !== 7) {
          if (!event.defaultPrevented) event.preventDefault();
          (newDisplayErrorState as Cook<boolean>).cir = true;
        } else if ((displayError as Cook<boolean>).cir) {
          (newDisplayErrorState as Cook<boolean>).cir = false;
        }
        break;
      }
      default:
        throw new TypeError("Unsuported slug");
    }
  }

  async function registerUser() {
    const body = slug === "provisions" ? __normalizeProvisionsValue() : __normalizeDefaultValue();

    try {
      await useRegister(body);
      return router.push("/");
    } catch (error: unknown) {
      toast.warn((error as Error)!.message ?? "Ops! Algo deu errado", {
        draggable: true,
        progress: 1,
      });
      console.error(error);
    }

    function __normalizeDefaultValue() {
      return {
        ...data,
        groups: {
          ...data.groups,
          [ slug ]: form,
          provisions: {
            type: (
              data.groups.provisions as unknown as { provisions: ProvisionsForms }
            ).provisions.map((provisions) => {
              return { value: provisions.label };
            }),
          },
        },
      } as unknown as RegisterUserForm;
    }

    function __normalizeProvisionsValue() {
      return {
        ...data,
        groups: {
          ...data.groups,
          provisions: {
            type: (form as unknown as { provisions: ProvisionsForms }).provisions.map(
              (provisions) => {
                return { value: provisions.label };
              },
            ),
          },
        },
      } as unknown as RegisterUserForm;
    }
  }
}

function __parseSlug(params: { slug: "supplier" | "provisions" | "cook" }) {
  return params.slug.includes("-")
    ? (params.slug.split("-")[ 0 ] as keyof InitialState)
    : params.slug;
}
