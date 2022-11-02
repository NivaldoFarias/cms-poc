"use client";

import Image from "next/image";
import "./page.scss";

import logo from "./../assets/img/semantix-logo_white.png";
import styles from "./page.module.scss";
import SignInForm from "../components/SignInForm";

export default function Home() {
  return (
    <main className={styles.container}>
      <figure className={styles.figure}>
        <Image
          width={400}
          quality={100}
          src={logo}
          alt="Semantix logo"
        />
        <figcaption>Faça seu Login na Plataforma</figcaption>
      </figure>
      <SignInForm form_group={styles.form_group} />
    </main>
  );
}
