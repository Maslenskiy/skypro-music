import styles from './BurgerNav.module.css'
export default function BurgerNav(){
    return(
                <div className={styles.nav__burger}>
                  <span className={styles.burger__line} />
                  <span className={styles.burger__line} />
                  <span className={styles.burger__line} />
                </div>
    )
}