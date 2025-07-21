import Image from "next/image";
import styles from "./login.module.css";
import Link from "next/link";
export default function LogIn() {
  return (
    <form className={styles.box_container}>
      <Image
        className={styles.logo__image}
        alt="logo"
        src="/logo_modal.png"
        width={140}
        height={21}
      />

      <div className={styles.form_input}>
        <input type="email" placeholder="Почта" />
        <input type="password" placeholder="Пароль" />
      </div>
      <Link
        href="/"
        className={styles.form_button} // Переносим стили сюда
      >
        Войти
      </Link>

        <Link
        href="/signup"
        className={styles.form_login} // Переносим стили сюда
      >
        Зарегистрироваться
      </Link>
    </form>
  );
}
