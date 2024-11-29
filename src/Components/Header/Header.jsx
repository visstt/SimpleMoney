import React from "react";
import styles from "./Header.module.css";
import Logo from "./Logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logoSection}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <h1>SIMPLE MONEY</h1>
      </div>
      <div className={styles.loginSection}>
        <Link to="/login">
          <h1>Вход</h1>
        </Link>
        <Link to="/reg" className={styles.reg}>
          <h1>Регистрация</h1>
        </Link>
      </div>
    </div>
  );
}
