import styles from "./ExpencePage.module.css";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ExpensePageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    month: "январь",
    year: "2024",
    date: "",
    summa: "",
    accountId: "",
  });
  const [data, setData] = useState([]);
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

  const personId = Cookies.get("personId");

  const fetchCategories = async () => {
    try {
      const url = `http://localhost:8080/category/getСostCategories/расходы-${personId}`;
      const response = await fetch(url);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/accounts/${personId}`
      );
      const data = await response.json();
      console.log("Fetched accounts:", data);
      if (Array.isArray(data)) {
        setAccounts(data);
      } else {
        console.error("Ожидался массив счетов, но получен:", data);
      }
    } catch (error) {
      console.error("Ошибка загрузки счетов:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/expense/${filters.month}-${filters.year}-${personId}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setData(data);
      } else {
        console.error("Unexpected data format:", data);
        setData([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    fetchCategories();
    fetchAccounts();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      categoryId: "",
      month: "январь",
      year: "2024",
      date: "",
      summa: "",
      accountId: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchCategories();
    fetchAccounts();
    fetchData();
  }, [filters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formData.date;

    const payload = new URLSearchParams({
      month: formData.month,
      year: formData.year,
      date: formattedDate,
      summa: parseFloat(formData.summa),
      personId: personId,
      categoryId: formData.categoryId,
      accountId: formData.accountId,
    }).toString();

    try {
      const response = await fetch("http://localhost:8080/expense/addExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload,
      });

      if (response.ok) {
        alert("Расход добавлен!");
        handleCloseModal();
        fetchData();
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось добавить расход"}`);
      }
    } catch (error) {
      alert("Ошибка отправки данных !");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.contentTitle}> Расходы</h1>
        <div className={styles.controls}>
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
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Категория</th>
              <th>Дата</th>
              <th>Счет</th>
              <th>Сумма</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.expenseid}>
                <td>
                  {item.category ? item.category.categoryName : "Нет категории"}
                </td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.account ? item.account.accountName : "Не найден"}</td>
                <td>{item.summa}</td>
                <td>
                  <i className="fas fa-pen"></i>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5">Нет данных для отображения</td>
              </tr>
            )}
          </tbody>
        </table>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Добавить расход</h2>
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
                  Счет:
                  <select
                    name="accountId"
                    value={formData.accountId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Выберите счет</option>
                    {accounts.map((account) => (
                      <option key={account.accountId} value={account.accountId}>
                        {account.accountName} ({account.currency})
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
                  Дата:
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Сумма:
                  <input
                    type="number"
                    name="summa"
                    value={formData.summa}
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
    </div>
  );
};

export default ExpensePageContent;
