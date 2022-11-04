import Image from "next/image";
import Link from "next/link";

import { HiArrowLeft } from "react-icons/hi";

import logo from "./../../assets/img/semantix-logo_white.png";
import styles from "./styles/layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.page}>{children}</div>
      <aside className={styles.sidebar}>
        <Image
          width={300}
          quality={100}
          src={logo}
          alt="Semantix logo"
        />
        <article className={styles.description}>
          <div className={styles.navlink}>All About Data</div>
          <p className={styles.title}>The Big Data revolution in your organisation</p>
          <p className={styles.content}>
            Join the data revolution and accelerate the digital transformation of your business with
            Big Data, Artificial Intelligence, Machine Learning, and more.
          </p>
          <Link
            href="/"
            className={styles.return_navigation}
          >
            <HiArrowLeft className={styles.svg_icon} />
            <p>Voltar para o Login</p>
          </Link>
        </article>
      </aside>
    </main>
  );
}
