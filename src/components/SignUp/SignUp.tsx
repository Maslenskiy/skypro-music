import Image from "next/image";
import styles from "./signup.module.css";
import Link from "next/link";
export default function SignUp() {
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
        <input type="password" placeholder="Повторите пароль" />
      </div>

      <Link
        href="/login"
        className={styles.form_button} // Переносим стили сюда
      >
        Зарегистрироваться
      </Link>
    </form>
  );
}
