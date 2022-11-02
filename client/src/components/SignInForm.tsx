import "./../app/styles/page.scss";

import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

import { ChangeEvent, FocusEvent, useRef, useState } from "react";
import Link from "next/link";

interface InputRef {
  email: HTMLInputElement | null;
  password: HTMLInputElement | null;
}

interface Props {
  form_group: string;
}

export default function SignInForm({ form_group }: Props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const inputRef = useRef<InputRef>({
    email: null,
    password: null,
  });

  const signInForm = buildSignInForm();

  return (
    <form
      className={form_group}
      onSubmit={handleSubmit}
    >
      {signInForm}
    </form>
  );

  function buildSignInForm() {
    return (
      <>
        <div className="input-group">
          <section className="input-section">
            <HiMail className="svg-icon" />
            <div className="styled-input">
              <input
                type="email"
                name="email"
                value={form.email}
                className={`input-field spacedout-field ${
                  form.email.length > 0 ? "input-field--active" : ""
                }`}
                ref={(element) => (inputRef.current.email = element)}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label-text spacedout-field">E-mail</label>
            </div>
          </section>
          <section className="input-section">
            <RiLockPasswordFill className="svg-icon" />
            <div className="styled-input">
              <input
                type="password"
                name="password"
                value={form.password}
                className={`input-field input-spacedout-field ${
                  form.password.length > 0 ||
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
              <label className="label-text spacedout-field">Senha</label>
            </div>
          </section>
        </div>
        <section className="footer-section">
          <button
            className="submit-btn"
            type="submit"
          >
            Entrar
          </button>
          <Link
            className="navigate-link"
            href="/register"
          >
            Não tem uma conta? <span>Registre-se</span>
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
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(form);
  }
}
