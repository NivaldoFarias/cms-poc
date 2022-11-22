"use client";

import RegisterForm from "../../components/RegisterForm";
import styles from "./styles/page.module.scss";

export default function Register() {
  return (
    <div className={styles.page}>
      <p className={styles.title_card}>
        Cadastro de Usuário - <span>Padrão</span>
      </p>
      <RegisterForm />
    </div>
  );
}
