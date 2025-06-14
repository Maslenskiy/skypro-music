import styles from './NavMenu.module.css'
export default function NavMenu(){
    return(
        <div className={styles.nav__menu }>
                  <ul className={styles.menu__list}>
                    <li className={styles.menu__item}>
                      <a href="#" className={styles.menu__link}>
                        Главное
                      </a>
                    </li>
                    <li className={styles.menu__item}>
                      <a href="#" className={styles.menu__link}>
                        Мой плейлист
                      </a>
                    </li>
                    <li className={styles.menu__item}>
                      <a href="../signin.html" className={styles.menu__link}>
                        Войти
                      </a>
                    </li>
                  </ul>
                </div>
    )
}