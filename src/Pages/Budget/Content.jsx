import styles from "./Budget.module.css";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    month: "январь",
    year: "2024",
    plan: "",
  });
  const [activeTab, setActiveTab] = useState("расходы");
  const [data, setData] = useState([]); // Данные расходов
  const [incomeData, setIncomeData] = useState([]); // Данные доходов
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
      const response = await fetch(
        `http://localhost:8080/category/getСostCategories/${activeTab}-${personId}`
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
        `http://localhost:8080/costPlan/${filters.month}-${filters.year}-${personId}`
      );
      const data = await response.json();
      setData(data.filter((item) => item.category.categoryType === "расходы"));
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const fetchIncomePlanData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/costPlan/${filters.month}-${filters.year}-${personId}`
      );
      if (!response.ok) {
        throw new Error("Ошибка при получении данных доходов");
      }
      const incomeData = await response.json();
      setIncomeData(incomeData);
    } catch (error) {
      console.error("Ошибка загрузки данных доходов:", error);
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
    setData([]);
    setIncomeData([]); // Сбрасываем данные доходов при переключении вкладки
  };

  useEffect(() => {
    fetchData();
    fetchIncomePlanData(); // Загружаем данные доходов
  }, [filters, activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new URLSearchParams({
      month: formData.month,
      year: formData.year,
      plan: formData.plan,
      fact: "0",
      personId: personId,
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
        fetchIncomePlanData(); // Обновляем данные доходов после добавления плана
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось добавить план"}`);
      }
    } catch (error) {
      alert("Ошибка отправки данных!");
    }
  };

  const chartData = {
    labels: data.map((item) => item.category.categoryName),
    datasets: [
      {
        label: "План",
        data: data.map((item) => item.plan),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Факт",
        data:
          activeTab === "расходы"
            ? incomeData.map((item) => item.fact)
            : data.map((item) => item.fact || "0"), // Используем данные из incomeData для расходов и фактические данные для доходов
        backgroundColor: "rgba(255 , 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.container}>
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
            {activeTab === "расходы"
              ? data.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.category.categoryName}</td>
                    <td>{item.plan}</td>
                    <td>
                      {incomeData.find(
                        (income) =>
                          income.category.categoryId ===
                          item.category.categoryId
                      )?.fact || "0"}
                    </td>
                    <td>{item.overpayment || "0"}</td>
                    <td>{item.reserve || "0"}</td>
                    <td>
                      <i className="fas fa-pen"></i>
                    </td>
                  </tr>
                ))
              : incomeData.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.category.categoryName}</td>
                    <td>{item.plan}</td>
                    <td>{item.fact || "0"}</td>
                    <td>{item.shortage || "0"}</td>
                    <td>{item.reserve || "0"}</td>
                    <td>
                      <i className="fas fa-pen"></i>
                    </td>
                  </tr>
                ))}
            {(activeTab === "расходы" ? data : incomeData).length === 0 && (
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

        <div className={styles.chartContainer}>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Content;
