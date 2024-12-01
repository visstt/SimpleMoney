import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import logo from "./logoB.png";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <img src={logo} alt="Логотип компании" className={styles.logo} />
      <h1 className={styles.title}>Мария</h1>
      <ul className={styles.menu}>
        <li className={`${styles.menuItem} ${styles.active}`}>
          <Link to="/budget" className={styles.link}>
            <i className="fas fa-file-alt"></i> Бюджет
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/" className={styles.link}>
            <i className="fas fa-coins"></i> Доход
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/" className={styles.link}>
            <i className="fas fa-wallet"></i> Расход
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/" className={styles.link}>
            <i className="fas fa-hand-holding-usd"></i> Долги
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/" className={styles.link}>
            <i className="fas fa-receipt"></i> Счета
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/category" className={styles.link}>
            <i className="fas fa-th-list"></i> Категории
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/" className={styles.link}>
            <i className="fas fa-chart-bar"></i> Отчёты
          </Link>
        </li>
      </ul>
      <div className={styles.logout}>
        <Link to="/" className={styles.link}>
          <i className="fas fa-sign-out-alt"></i> ВЫХОД
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
