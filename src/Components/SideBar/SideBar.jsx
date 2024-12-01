import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Импортируем библиотеку для работы с куками
import styles from "./SideBar.module.css";
import logo from "./logoB.png";

const Sidebar = () => {
  // Извлекаем personName из куков
  const personName = Cookies.get("personName") || "Пользователь"; // Используем "Пользователь" как запасное имя
  const location = useLocation(); // Получаем текущий путь
  const navigate = useNavigate(); // Хук для навигации

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    // Удаляем все куки, связанные с аккаунтом
    Cookies.remove("personName");
    Cookies.remove("authToken"); // Пример: удаление токена аутентификации
    // Добавьте другие куки, которые необходимо удалить
    // Cookies.remove("anotherCookieName");

    // Перенаправляем на домашнюю страницу
    navigate("/");
  };

  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <img src={logo} alt="Логотип компании" className={styles.logo} />
      </Link>
      <h1 className={styles.title}>{personName}</h1>
      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${
            location.pathname === "/budget" ? styles.active : ""
          }`}
        >
          <Link to="/budget" className={styles.link}>
            <i className="fas fa-file-alt"></i> Бюджет
            {location.pathname === "/budget" && (
              <span className={styles.dot}>•</span>
            )}
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          <Link to="/income" className={styles.link}>
            <i className="fas fa-coins"></i> Доход
            {location.pathname === "/" && <span className={styles.dot}>•</span>}
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === "/expenses" ? styles.active : ""
          }`}
        >
          <Link to="/expenses" className={styles.link}>
            <i className="fas fa-wallet"></i> Расход
            {location.pathname === "/expenses" && (
              <span className={styles.dot}>•</span>
            )}
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === "/debts" ? styles.active : ""
          }`}
        >
          <Link to="/debts" className={styles.link}>
            <i className="fas fa-hand-holding-usd"></i> Долги
            {location.pathname === "/debts" && (
              <span className={styles.dot}>•</span>
            )}
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === "/account" ? styles.active : ""
          }`}
        >
          <Link to="/account" className={styles.link}>
            <i className="fas fa-receipt"></i> Счета
            {location.pathname === "/account" && (
              <span className={styles.dot}>•</span>
            )}
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === "/category" ? styles.active : ""
          }`}
        >
          <Link to="/category" className={styles.link}>
            <i className="fas fa-th-list"></i> Категории
            {location.pathname === "/category" && (
              <span className={styles.dot}>•</span>
            )}
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            location.pathname === "/reports" ? styles.active : ""
          }`}
        >
          <Link to="/reports" className={styles.link}>
            <i className="fas fa-chart-bar"></i> Отчёты
            {location.pathname === "/reports" && (
              <span className={styles.dot}>•</span>
            )}
          </Link>
        </li>
      </ul>
      <div className={styles.logout}>
        <button className={styles.linkLogout} onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> ВЫХОД
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
