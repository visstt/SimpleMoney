import React, { useState, useEffect } from "react";
import styles from "./CategoryPage.module.css";

const CategoryPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryType: "расходы", // Тип категории: "доходы" или "расходы"
    categoryName: "",
  });
  const [activeTab, setActiveTab] = useState("расходы");

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/category/getСostCategories/${activeTab}-2`
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    fetchCategories(); // Загружаем категории соответствующего типа
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ categoryType: activeTab, categoryName: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new URLSearchParams({
      categoryType: formData.categoryType,
      categoryName: formData.categoryName,
      personId: "2",
    });

    try {
      const response = await fetch(
        "http://localhost:8080/category/addCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: payload.toString(),
        }
      );

      if (response.ok) {
        alert("Категория добавлена!");
        handleCloseModal();
        fetchCategories();
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось добавить категорию"}`);
      }
    } catch (error) {
      alert("Ошибка отправки данных!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [activeTab]);

  return (
    <div className={styles.content}>
      <h1 className={styles.contentTitle}>КАТЕГОРИИ</h1>
      <div className={styles.controls}>
        <div className={styles.toggle}>
          <button
            className={`${styles.button} ${
              activeTab === "расходы" ? styles.active : ""
            }`}
            onClick={() => handleTabSwitch("расходы")}
          >
            Расходы
          </button>
          <button
            className={`${styles.button} ${
              activeTab === "доходы" ? styles.active : ""
            }`}
            onClick={() => handleTabSwitch("доходы")}
          >
            Доходы
          </button>
        </div>
        <button
          className={`${styles.button} ${styles.add}`}
          onClick={handleAddClick}
        >
          + Добавить
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Категория</th>
            <th>Ред/Удал</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryId}>
              <td>{category.categoryName}</td>
              <td>
                <i className="fas fa-pen" title="Редактировать"></i>
                &nbsp;&nbsp;
                <i
                  className="fas fa-trash"
                  title="Удалить"
                  style={{ color: "red", cursor: "pointer" }}
                ></i>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="2">Нет данных для отображения</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Добавить категорию</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                Тип категории:
                <select
                  name="categoryType"
                  value={formData.categoryType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="расходы">Расходы</option>
                  <option value="доходы">Доходы</option>
                </select>
              </label>
              <label>
                Название категории:
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.button}>
                  Сохранить
                </button>
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleCloseModal}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPageContent;
