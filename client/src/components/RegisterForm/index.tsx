import type { ChangeEvent, FocusEvent, MouseEvent } from "react";
import type { Group } from "../../ui/SelectGroups";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { HiMail } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import SelectGroups from "../../ui/SelectGroups";
import InputSection from "../../ui/InputSection";

import styles from "./styles.module.scss";
import "./styles.scss";

export type InputRef = Record<
  "email" | "password" | "name" | "confirm_password" | "groups",
  HTMLInputElement | null
>;

export type Forms = {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
  groups: Group[];
};

export default function RegisterForm() {
  const [ form, setForm ] = useState<Forms>({
    email: "",
    name: "",
    password: "",
    confirm_password: "",
    groups: [],
  });

  const inputRef = useRef<InputRef>({
    email: null,
    name: null,
    password: null,
    confirm_password: null,
    groups: null,
  });

  const router = useRouter();
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
            handleInputChange={handleInputChange}
            handleInputFocus={handleInputFocus}
            handleInputBlur={handleInputBlur}
          />
          <SelectGroups
            groups={form.groups}
            setForm={setForm}
          />
        </div>
        <section className={styles.footer_section}>
          <button
            className={styles.next_btn}
            onClick={handleNavigate}
            type="button"
          >
            PRÓXIMO
          </button>
        </section>
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

    function handleNavigate(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      router.push("/register/" + form.groups);
    }
  }


}
