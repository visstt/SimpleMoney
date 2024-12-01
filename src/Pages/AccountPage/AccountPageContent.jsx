import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Импортируем библиотеку для работы с куками
import styles from "./AccountPage.module.css";

const AccountPageContent = () => {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountName: "",
    currency: "USD",
    summa: 0,
  });
  const [transferData, setTransferData] = useState({
    fromAccountId: null,
    toAccountId: null,
    transferAmount: 0,
  });
  const personId = Cookies.get("personId"); // Получаем personId из куков

  const fetchAccounts = async () => {
    console.log("Fetching accounts for personId:", personId);
    try {
      const response = await fetch(
        `http://localhost:8080/accounts/${personId}`
      );
      const data = await response.json();
      console.log("Fetched accounts:", data);
      setAccounts(data);
    } catch (error) {
      console.error("Ошибка загрузки счетов:", error);
    }
  };

  const handleAddClick = () => {
    console.log("Opening modal to add account");
    setFormData({
      accountName: "",
      currency: "USD",
      summa: 0,
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (account) => {
    console.log("Opening modal to edit account:", account);
    setFormData({
      accountName: account.accountName,
      currency: account.currency,
      summa: account.summa,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (accountId) => {
    console.log("Deleting account with ID:", accountId);
    try {
      const response = await fetch(
        `http://localhost:8080/accounts/deleteAccount?accountId=${accountId}`, // Изменено на @RequestParam
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("Счет удален!");
        fetchAccounts();
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось удалить счет"}`);
      }
    } catch (error) {
      alert("Ошибка удаления счета!");
      console.error("Ошибка при удалении счета:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting account form with data:", formData);

    const url = formData.accountId
      ? `http://localhost:8080/accounts/updateAccount`
      : `http://localhost:8080/accounts/addAccount`;

    const formDataToSend = new FormData();
    formDataToSend.append("accountName", formData.accountName);
    formDataToSend.append("currency", formData.currency);
    formDataToSend.append("summa", formData.summa);
    formDataToSend.append("personId", personId); // Добавляем personId

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend, // Используем FormData для отправки данных
      });

      if (response.ok) {
        alert(formData.accountId ? "Счет обновлен!" : "Счет добавлен!");
        setIsModalOpen(false);
        fetchAccounts();
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось сохранить счет"}`);
      }
    } catch (error) {
      alert("Ошибка сохранения счета!");
      console.error("Ошибка при сохранении счета:", error);
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8080/accounts/transfer?fromId=${transferData.fromAccountId}&toId=${transferData.toAccountId}&amount=${transferData.transferAmount}`;

    try {
      const response = await fetch(url, {
        method: "POST",
      });

      if (response.ok) {
        alert("Перевод выполнен!");
        setIsTransferModalOpen(false);
        fetchAccounts();
      } else {
        const errorData = await response.text();
        alert(`Ошибка: ${errorData || "Не удалось выполнить перевод"}`);
      }
    } catch (error) {
      alert("Ошибка выполнения перевода!");
      console.error("Ошибка при выполнении перевода:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransferInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Transfer input changed: ${name} = ${value}`);
    setTransferData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    console.log("Closing account modal");
    setIsModalOpen(false);
    setFormData({
      accountName: "",
      currency: "USD",
      summa: 0,
    });
  };

  const handleCloseTransferModal = () => {
    console.log("Closing transfer modal");
    setIsTransferModalOpen(false);
    setTransferData({
      fromAccountId: null,
      toAccountId: null,
      transferAmount: 0,
    });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.contentTitle}>СЧЕТА</h1>
      <button className={styles.button} onClick={handleAddClick}>
        + Добавить счет
      </button>
      <button
        className={styles.button}
        onClick={() => setIsTransferModalOpen(true)}
      >
        Перевести деньги
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Название счета</th>
            <th>Единица (валюта)</th>
            <th>Сумма</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountId}>
              <td>{account.accountName}</td>
              <td>{account.currency}</td>
              <td>{account.summa}</td>
              <td>
                <span
                  className={styles.icon}
                  title="Редактировать"
                  onClick={() => handleEditClick(account)}
                >
                  ✏️
                </span>
                <span
                  className={styles.icon}
                  title="Удалить"
                  onClick={() => handleDeleteClick(account.accountId)}
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
          {accounts.length === 0 && (
            <tr>
              <td colSpan="4">Нет счетов для отображения</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>
              {formData.accountId ? "Редактировать счет" : "Добавить счет"}
            </h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                Название счета:
                <input
                  type="text"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Единица (валюта):
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  required
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="RUB">RUB</option>
                </select>
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

      {isTransferModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Перевод денег</h2>
            <form onSubmit={handleTransferSubmit} className={styles.form}>
              <label>
                Счет откуда:
                <select
                  name="fromAccountId"
                  value={transferData.fromAccountId}
                  onChange={handleTransferInputChange}
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
                Счет куда:
                <select
                  name="toAccountId"
                  value={transferData.toAccountId}
                  onChange={handleTransferInputChange}
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
                Сумма перевода:
                <input
                  type="number"
                  name="transferAmount"
                  value={transferData.transferAmount}
                  onChange={handleTransferInputChange}
                  required
                />
              </label>
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.button}>
                  Перевести
                </button>
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleCloseTransferModal}
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

export default AccountPageContent;
