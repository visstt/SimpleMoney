import React, { useState, useEffect } from "react";
import styles from "./Budget.module.css";

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    month: "январь",
    year: "2024",
    plan: "",
  });
  const [activeTab, setActiveTab] = useState("расходы"); // "расходы" или "доходы"
  const [data, setData] = useState([]); // Данные для таблицы
  const [filters, setFilters] = useState({ month: "январь", year: "2024" });

  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

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

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/costPlan/${filters.month}-${filters.year}-2`
      );
      const data = await response.json();
      setData(data.filter((item) => item.category.categoryType === activeTab));
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    fetchCategories();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ categoryId: "", month: "январь", year: "2024", plan: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setData([]); // Очищаем данные, чтобы не путать их между вкладками
  };

  useEffect(() => {
    fetchData();
  }, [filters, activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new URLSearchParams({
      month: formData.month,
      year: formData.year,
      plan: formData.plan,
      fact: "0",
      personId: "2",
      categoryId: formData.categoryId,
    });

    try {
      const response = await fetch(
        "http://localhost:8080/costPlan/addCostPlan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: payload.toString(),
        }
      );

      if (response.ok) {
        alert("План добавлен!");
        handleCloseModal();
        fetchData();
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось добавить план"}`);
      }
    } catch (error) {
      alert("Ошибка отправки данных!");
    }
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.contentTitle}>БЮДЖЕТ</h1>
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
        <div className={styles.plan}>
          План {activeTab}: {filters.month} {filters.year} года
        </div>
        <button
          className={`${styles.button} ${styles.add}`}
          onClick={handleAddClick}
        >
          + Добавить
        </button>
        <select
          className={styles.select}
          name="month"
          value={filters.month}
          onChange={handleFiltersChange}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          name="year"
          value={filters.year}
          onChange={handleFiltersChange}
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <button
          className={`${styles.button} ${styles.update}`}
          onClick={fetchData}
        >
          Обновить
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Категория</th>
            <th>План</th>
            <th>Факт</th>
            {activeTab === "расходы" ? <th>Переплата</th> : <th>Недобор</th>}
            <th>Резерв</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.itemId}>
              <td>{item.category.categoryName}</td>
              <td>{item.plan}</td>
              <td>{item.fact}</td>
              {activeTab === "расходы" ? (
                <td>{item.overpayment || "-"}</td>
              ) : (
                <td>{item.shortage || "-"}</td>
              )}
              <td>{item.reserve || "-"}</td>
              <td>
                <i className="fas fa-pen"></i>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="6">Нет данных для отображения</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Добавить план</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                Категория:
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Месяц:
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  required
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Год:
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </label>
              <label>
                План:
                <input
                  type="number"
                  name="plan"
                  value={formData.plan}
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

export default Content;
