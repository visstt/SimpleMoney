import React from 'react'
import styles from './Header.module.css'
import Logo from './Logo.png'

export default function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.logoSection}>
            <img src={Logo} alt="logo"  className={styles.logo}/>
            <h1>SIMPLE MONEY</h1>
        </div>
        <div className={styles.loginSection}>
                <a href='#'><h1>Вход</h1></a>
                <a href='#'><h1 className={styles.reg}>Регистрация</h1></a>
        </div>
    </div>
  )
}
