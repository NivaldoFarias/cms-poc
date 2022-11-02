import styles from "./styles.module.scss";
import "./styles.scss";

import { HiMail } from "react-icons/hi";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { ChangeEvent, FocusEvent, useRef, useState } from "react";

type InputRef = Record<
  "email" | "password" | "name" | "confirm_password" | "group",
  HTMLInputElement | null
>;

type Props = {
  form_group: string;
};

// TODO create modules for input field component

export default function RegisterForm({ form_group }: Props) {
  const [ form, setForm ] = useState<Record<string, string>>({
    email: "",
    name: "",
    password: "",
    confirm_password: "",
    group: "",
  });

  const inputRef = useRef<InputRef>({
    email: null,
    name: null,
    password: null,
    confirm_password: null,
    group: null,
  });

  const registerForm = buildRegisterForm();

  return (
    <form
      className={form_group}
      onSubmit={handleSubmit}
    >
      {registerForm}
    </form>
  );

  function buildRegisterForm() {
    return (
      <>
        <h3 className={styles.header_section}>Crie sua conta</h3>
        <div className={styles.input_group}>
          <section className={styles.input_section}>
            <HiMail className={styles.svg_icon} />
            <div className={styles.styled_input}>
              <input
                type="email"
                name="email"
                value={form.email}
                className={`input-field spacedout-field ${form.email.length > 0 ? "input-field--active" : ""
                  }`}
                ref={(element) => (inputRef.current.email = element)}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label-text">Seu E-mail</label>
            </div>
          </section>
          <section className={styles.input_section}>
            <FaUserCircle className={styles.svg_icon} />
            <div className={styles.styled_input}>
              <input
                type="text"
                name="name"
                value={form.name}
                className={`input-field ${form.name.length > 0 ? "input-field--active" : ""}`}
                ref={(element) => (inputRef.current.name = element)}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label-text">Seu Nome</label>
            </div>
          </section>
          <section className={styles.input_section}>
            <RiLockPasswordFill className={styles.svg_icon} />
            <div className={styles.styled_input}>
              <input
                type="password"
                name="password"
                value={form.password}
                className={`input-field input-spacedout-field ${form.password.length > 0 ||
                    inputRef.current.password?.classList.contains("input-field--active")
                    ? "input-field--active"
                    : ""
                  }`}
                ref={(element) => (inputRef.current.password = element)}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label-text">Sua Senha</label>
            </div>
          </section>
          <section className={styles.input_section}>
            <RiLockPasswordFill className={styles.svg_icon} />
            <div className={styles.styled_input}>
              <input
                type="password"
                name="confirm_password"
                value={form.confirm_password}
                className={`input-field input-spacedout-field ${form.confirm_password.length > 0 ||
                    inputRef.current.confirm_password?.classList.contains("input-field--active")
                    ? "input-field--active"
                    : ""
                  }`}
                ref={(element) => (inputRef.current.confirm_password = element)}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label-text">Confirme Sua Senha</label>
            </div>
          </section>
          <section className={styles.input_section}>
            <FaUsers className={styles.svg_icon} />
            <div className={styles.styled_input}>
              <input
                type="text"
                name="group"
                value={form.group}
                className={`input-field input-spacedout-field ${form.group.length > 0 ||
                    inputRef.current.group?.classList.contains("input-field--active")
                    ? "input-field--active"
                    : ""
                  }`}
                ref={(element) => (inputRef.current.group = element)}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label-text">Seu Grupo</label>
            </div>
          </section>
        </div>
        <section className={styles.footer_section}>
          <button
            className={styles.next_btn}
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
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(form);
  }
}
