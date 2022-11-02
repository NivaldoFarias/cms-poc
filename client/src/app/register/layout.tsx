import styles from "./styles/layout.module.scss";
import Image from "next/image";

import logo from "./../../assets/img/semantix-logo_white.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.wrapper}>
      {children}
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
          <div className={styles.return_navigation}>{"<-"} Voltar para o Login</div>
        </article>
      </aside>
    </main>
  );
}
