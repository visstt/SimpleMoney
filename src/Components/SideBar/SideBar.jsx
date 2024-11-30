import React from "react";
import styles from "./SideBar.module.css";
import logo from "./logoB.png";

const Sidebar = () => {
  const handleMenuClick = (menuName) => {
    alert(`Вы выбрали: ${menuName}`);
  };

  return (
    <div className={styles.sidebar}>
      <img src={logo} alt="Логотип компании" className={styles.logo} />
      <h1 className={styles.title}>Мария</h1>
      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${styles.active}`}
          onClick={() => handleMenuClick("Бюджет")}
        >
          <i className="fas fa-file-alt"></i> Бюджет
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick("Доход")}
        >
          <i className="fas fa-coins"></i> Доход
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick("Расход")}
        >
          <i className="fas fa-wallet"></i> Расход
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick("Долги")}
        >
          <i className="fas fa-hand-holding-usd"></i> Долги
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick("Счета")}
        >
          <i className="fas fa-receipt"></i> Счета
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick("Категории")}
        >
          <i className="fas fa-th-list"></i> Категории
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick("Отчёты")}
        >
          <i className="fas fa-chart-bar"></i> Отчёты
        </li>
      </ul>
      <div className={styles.logout} onClick={() => handleMenuClick("Выход")}>
        <i className="fas fa-sign-out-alt"></i> ВЫХОД
      </div>
    </div>
  );
};

export default Sidebar;
