import type { ChangeEvent, FocusEvent } from "react";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

import useSession from "../../hooks/useSession";
import { useSignIn } from "../../hooks/useAPI";

import styles from "./styles.module.scss";
import InputSection from "../../ui/InputSection";
import { toast, ToastContainer } from "react-toastify";
import { GetServerSidePropsContext } from "next";

type InputRef = Fields<HTMLInputElement | null>;

declare type Fields<T> = Record<"email" | "password", T>;

export interface SignInForm {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [ displayError, setDisplayError ] = useState<Fields<boolean>>({
    email: false,
    password: false,
  });
  const [ form, setForm ] = useState<SignInForm>({
    email: "",
    password: "",
  });

  const inputRef = useRef<InputRef>({
    email: null,
    password: null,
  });

  const router = useRouter();
  const { setSession } = useSession();

  const signInForm = buildSignInForm();

  return (
    <form
      className={styles.form_group}
      onSubmit={handleSubmit}
    >
      {signInForm}
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

  function buildSignInForm() {
    return (
      <>
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
        </div>
        <section className={styles.footer_section}>
          <button
            className={styles.next_btn}
            type="submit"
          >
            Entrar
          </button>
          <Link
            className={styles.navigate_link}
            href="/register"
          >
            Não tem uma conta? <span>Registre-se</span>
          </Link>
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const token = await useSignIn(form);
      if (!token) return null;

      setSession(token);
      return router.push("/dashboard");
    } catch (error: unknown) {
      toast.warn((error as Error)!.message ?? "Ops! Algo deu errado", {
        draggable: true,
        progress: 1,
      });
      console.error(error);
    }
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(context.req.headers.referer);
}
