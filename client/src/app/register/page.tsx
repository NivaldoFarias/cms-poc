"use client";

import RegisterForm from "../../components/RegisterForm";
import styles from "./styles/page.module.scss";

export default function Page() {
  return (
    <>
      <p className={styles.title_card}>
        Cadastro de Usuário - <span>Padrão</span>
      </p>
      <RegisterForm />
    </>
  );
}
