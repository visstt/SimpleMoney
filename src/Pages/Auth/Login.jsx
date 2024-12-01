import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./Auth.module.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при выполнении запроса");
      }

      const data = await response.json(); // Предполагаем, что сервер возвращает JSON
      const { token, person } = data; // Извлекаем токен и объект person из ответа
      const { personId, name: personName } = person; // Извлекаем personId и name

      // Сохраняем данные в куки
      Cookies.set("token", token, { expires: 10 });
      Cookies.set("personId", personId, { expires: 10 });
      Cookies.set("personName", personName, { expires: 10 });

      // Выводим данные в консоль
      console.log("Token:", token);
      console.log("Person ID:", personId);
      console.log("Person Name:", personName);

      alert("Вход выполнен успешно!");
      navigate("/category");
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось войти");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>SIMPLE MONEY</h2>
        <p>Нет аккаунта?</p>
        <a href="/reg">Регистрация</a>
      </div>
      <div className={styles.right}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
  