import Image from "next/image"
import BurgerNav from "./BurgerNav/BurgerNav"
import NavMenu from "./NavMenu/NavMenu"
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
                <NavMenu />
              </nav>
             <MainCenterBlock />
             <MainSideBar />
            </main>
    )
}