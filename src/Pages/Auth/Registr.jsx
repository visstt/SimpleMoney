import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./Auth.module.css";

const Registr = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при выполнении запроса");
      }

      const token = await response.text(); // Получаем токен в виде текста
      Cookies.set("token", token, { expires: 1 }); // Сохраняем токен в cookies на 1 день
      alert("Регистрация выполнена успешно!");
      navigate("/login"); // Переадресация на страницу входа
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось зарегистрироваться");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>SIMPLE MONEY</h2>
        <p>У вас уже есть аккаунт?</p>
        <a href="/login">Войти</a>
      </div>
      <div className={styles.right}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <label htmlFor="email">Электронная почта</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registr;
