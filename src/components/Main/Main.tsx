
import BurgerNav from "./BurgerNav/BurgerNav"
import NavLogo from "./NavLogo/NavLogo"
import MainCenterBlock from "./MainCenterBlock/MainCenterBlock"
import MainSideBar from "./MainSideBar/MainSideBar"
import styles from './Main.module.css'



export default function Main(){
    return(
         <main className={styles.main}>
              <nav className={styles.main__nav}>
                <NavLogo />
                <BurgerNav />
              </nav>
             <MainCenterBlock />
             <MainSideBar />
            </main>
    )
}