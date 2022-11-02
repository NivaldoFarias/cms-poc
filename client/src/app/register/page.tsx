"use client";

import RegisterForm from "../../components/RegisterForm";
import styles from "./styles/page.module.scss";

export default function Page() {
  return (
    <div className={styles.page}>
      <p className={styles.title_card}>
        Cadastro de Usuário - <span>Padrão</span>
      </p>
      <RegisterForm form_group={styles.form_group} />
    </div>
  );
}
