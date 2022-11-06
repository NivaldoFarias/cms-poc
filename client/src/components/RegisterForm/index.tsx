import type { ChangeEvent, FocusEvent, MouseEvent } from "react";
import type { Group } from "./SelectGroups";

import { useRef, useState } from "react";
import Link from "next/link";

import { HiMail } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import InputSection from "../../ui/InputSection";
import SelectGroups from "./SelectGroups";

import styles from "./styles.module.scss";
import "./styles.scss";

import * as initial from "./lib/initial";

export type InputRef = Fields<HTMLInputElement | null>;

export type Forms = {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
  groups: Group[];
};

type Fields<T> = Record<"email" | "password" | "name" | "confirm_password" | "groups", T>;

export default function RegisterForm() {
  const [displayError, setDisplayError] = useState<Fields<boolean>>(initial.displayError);
  const [form, setForm] = useState<Forms>(initial.form);
  const inputRef = useRef<InputRef>(initial.inputRef);

  const registerForm = buildRegisterForm();

  return (
    <form
      className={styles.form_group}
      onSubmit={handleSubmit}
    >
      {registerForm}
    </form>
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(form);
  }

  function buildRegisterForm() {
    return (
      <>
        <h3 className={styles.header_section}>Crie sua conta</h3>
        <div className={styles.input_group}>
          <InputSection
            state={form.email}
            label="Seu Email"
            name="email"
            Icon={HiMail}
            type="email"
            inputRef={inputRef}
            displayError={displayError.email}
            handleInputChange={handleInputChange}
            handleInputFocus={handleInputFocus}
            handleInputBlur={handleInputBlur}
          />
          <InputSection
            state={form.name}
            label="Seu Nome"
            name="name"
            Icon={FaUserCircle}
            type="text"
            inputRef={inputRef}
            displayError={displayError.name}
            handleInputChange={handleInputChange}
            handleInputFocus={handleInputFocus}
            handleInputBlur={handleInputBlur}
          />
          <InputSection
            state={form.password}
            label="Sua Senha"
            name="password"
            Icon={RiLockPasswordFill}
            type="password"
            inputRef={inputRef}
            displayError={displayError.password}
            handleInputChange={handleInputChange}
            handleInputFocus={handleInputFocus}
            handleInputBlur={handleInputBlur}
          />
          <InputSection
            state={form.confirm_password}
            name="confirm_password"
            label="Confirme Sua Senha"
            Icon={RiLockPasswordFill}
            type="password"
            inputRef={inputRef}
            displayError={displayError.confirm_password}
            handleInputChange={handleInputChange}
            handleInputFocus={handleInputFocus}
            handleInputBlur={handleInputBlur}
          />
          <SelectGroups
            displayError={displayError.groups}
            setForm={setForm}
          />
        </div>
        <section className={styles.footer_section}>
          <Link
            href={parseHref()}
            className={styles.next_btn}
            onClick={handleNextBtnClick}
          >
            PRÓXIMO
          </Link>
        </section>
      </>
    );

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

    function handleNextBtnClick(event: MouseEvent<HTMLAnchorElement>) {
      const { email, password, name, confirm_password, groups } = form;
      const newDisplayErrorState = { ...displayError };

      __emailError();
      __nameError();
      __passwordError();
      __confirmPasswordError();
      __groupsError();

      return setDisplayError(newDisplayErrorState);

      function __groupsError() {
        if (groups.length === 0) {
          if (!event.defaultPrevented) event.preventDefault();
          newDisplayErrorState.groups = true;
        } else if (displayError.groups) {
          newDisplayErrorState.groups = false;
        }
      }

      function __confirmPasswordError() {
        if (confirm_password.length < 4 || password !== confirm_password) {
          if (!event.defaultPrevented) event.preventDefault();
          newDisplayErrorState.confirm_password = true;

          if (document.activeElement?.tagName !== "INPUT") {
            inputRef.current.confirm_password?.focus();
          }
        } else if (displayError.confirm_password) {
          newDisplayErrorState.confirm_password = false;
        }
      }

      function __passwordError() {
        if (password.length < 4 || password !== confirm_password) {
          if (!event.defaultPrevented) event.preventDefault();
          newDisplayErrorState.password = true;

          if (document.activeElement?.tagName !== "INPUT") {
            inputRef.current.password?.focus();
          }
        } else if (displayError.password) {
          newDisplayErrorState.password = false;
        }
      }

      function __nameError() {
        if (name.length === 0) {
          if (!event.defaultPrevented) event.preventDefault();
          newDisplayErrorState.name = true;

          if (document.activeElement?.tagName !== "INPUT") {
            inputRef.current.name?.focus();
          }
        } else if (displayError.name) {
          newDisplayErrorState.name = false;
        }
      }

      function __emailError() {
        if (email.length === 0) {
          if (!event.defaultPrevented) event.preventDefault();
          newDisplayErrorState.email = true;

          if (document.activeElement?.tagName !== "INPUT") {
            inputRef.current.email?.focus();
          }
        } else if (displayError.email) {
          newDisplayErrorState.email = false;
        }
      }
    }

    function parseHref() {
      const [slug, search, extra] = form.groups;

      const extraSearchParam = extra?.value ? "-" + extra?.value : "";
      const searchParams = search?.value ? search?.value + extraSearchParam : "";
      const createSearchParams = `${slug?.value}?groups_left=${searchParams}`;

      const parsedSlug = form.groups.length > 1 ? createSearchParams : slug?.value;
      return `/register/${parsedSlug}`;
    }
  }
}
