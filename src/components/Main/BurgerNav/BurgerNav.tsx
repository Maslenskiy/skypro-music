"use client"
import styles from "./BurgerNav.module.css";
import NavMenu from "../NavMenu/NavMenu";
import { useState } from "react";
export default function BurgerNav() {
  const [isOpen, setIsOpen] = useState(false);

  function burgerClick () {
    setIsOpen((prev) => !prev)
  }
  return (
    <>
      <div className={styles.nav__burger} onClick={burgerClick}>
        <span className={styles.burger__line} />
        <span className={styles.burger__line} />
        <span className={styles.burger__line} />
      </div>

      {isOpen && <NavMenu isOpen = {isOpen}/>}
    </>
  );
}
