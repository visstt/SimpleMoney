import React, { useState, useEffect } from "react";
import styles from "./CategoryPage.module.css";

const CategoryPageContent = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryType: "расходы",
    categoryName: "",
    categoryId: null,
  });
  const [activeTab, setActiveTab] = useState("расходы"); // "расходы" или "доходы"
  const personId = 2;

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/category/getСostCategories/${activeTab}-${personId}`
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  const handleAddClick = () => {
    setFormData({
      categoryType: activeTab,
      categoryName: "",
      categoryId: null,
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setFormData({
      categoryType: category.categoryType,
      categoryName: category.categoryName,
      categoryId: category.categoryId,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/category/deleteCategory`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ categoryId }),
        }
      );

      if (response.ok) {
        alert("Категория удалена!");
        fetchCategories();
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось удалить категорию"}`);
      }
    } catch (error) {
      alert("Ошибка удаления категории!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = formData.categoryId
      ? `http://localhost:8080/category/updateCategory`
      : `http://localhost:8080/category/addCategory`;

    const body = formData.categoryId
      ? new URLSearchParams({
          categoryId: formData.categoryId || "",
          categoryType: formData.categoryType,
          categoryName: formData.categoryName,
          personId: String(personId),
        })
      : new URLSearchParams({
          categoryType: formData.categoryType,
          categoryName: formData.categoryName,
          personId: String(personId),
        });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (response.ok) {
        alert(
          formData.categoryId ? "Категория обновлена!" : "Категория добавлена!"
        );
        setIsModalOpen(false);
        fetchCategories();
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось сохранить категорию"}`);
      }
    } catch (error) {
      alert("Ошибка сохранения категории!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      categoryType: activeTab,
      categoryName: "",
      categoryId: null,
    });
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
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
            <th>Категории {activeTab}</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryId}>
              <td>{category.categoryName}</td>
              <td>
                <span
                  className={styles.icon}
                  title="Редактировать"
                  onClick={() => handleEditClick(category)}
                >
                  ✏️
                </span>
                <span
                  className={styles.icon}
                  title="Удалить"
                  onClick={() => handleDeleteClick(category.categoryId)}
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="2">Нет категорий для отображения</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>
              {formData.categoryId
                ? "Редактировать категорию"
                : "Добавить категорию"}
            </h2>
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
