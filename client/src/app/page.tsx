import Image from 'next/image';

import { HiMail } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';

import logo from "./../assets/img/semantix-logo_white.png";
import styles from './page.module.scss';


export default function Home() {
  return (
    <div className={styles.home}>
      <main className={styles.container}>
        <figure className={styles.figure}>
          <Image
            width={450}
            quality={100}
            src={logo}
            alt="Semantix logo"
          />
          <figcaption>Faça seu Login na Plataforma</figcaption>
        </figure>
        <form className={styles.forms_container}>
          <div className={styles.input_wrapper}>
            <div className={styles.input_field}>
              <HiMail className={styles.svg_icon} />
              E-mail
            </div>
            <div className={styles.input_field}>
              <RiLockPasswordFill className={styles.svg_icon} />
              Senha
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
