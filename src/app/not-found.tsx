import Navigation from '@/components/Navigation/Navigation';
import styles from './music/main/page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Bar from '@/components/Bar/Bar';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Navigation />

        <div className={styles.nontound_page}>
          <p className={styles.notfound_text1}>404</p>

          <span className={styles.textWithIcon}>
            Страница не найдена
            <Image
              className={styles.nontound_smile}
              src="/img/crying.svg"
              alt="Печальный смайл"
              width={56}
              height={56}
            />
          </span>

          <p className={styles.notfound_text2}>
            Возможно, она была удалена <br /> или перенесена на другой адрес
          </p>
          <div className={styles.nontound_button}>
            <Link href="/music/main">
              <button className={styles.nontound_buttontext}>
                Вернуться на главную
              </button>
            </Link>
          </div>
        </div>

        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
