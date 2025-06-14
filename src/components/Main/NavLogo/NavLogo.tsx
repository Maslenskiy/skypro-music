
import Image from "next/image"
import styles from './NavLogo.module.css'
export default function NavLogo(){
    return(
        <div className={styles.nav__logo}>
        <Image
        className={styles.logo__image} 
        alt="logo"
        src="/logo.png" 
        width={113}
        height={17}
        />
                            
        </div>
    )

}