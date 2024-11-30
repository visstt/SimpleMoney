import React from "react";
import styles from "./Budget.module.css";

const Content = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.contentTitle}>БЮДЖЕТ</h1>
      <div className={styles.controls}>
        <div className={styles.toggle}>
          <button className={`${styles.button} ${styles.active}`}>
            Расходы
          </button>
          <button className={styles.button}>Доходы</button>
        </div>
        <div className={styles.plan}>План расходов: Ноябрь 2024 года</div>
        <button className={`${styles.button} ${styles.add}`}>+ Добавить</button>
        <select className={styles.select}>
          <option>Ноябрь</option>
        </select>
        <select className={styles.select}>
          <option>2024</option>
        </select>
        <button className={`${styles.button} ${styles.update}`}>
          Обновить
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Категория</th>
            <th>План</th>
            <th>Факт</th>
            <th>Переплата</th>
            <th>Резерв</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Авто</td>
            <td>1500</td>
            <td>10000</td>
            <td>8500</td>
            <td>-</td>
            <td>
              <i className="fas fa-pen"></i>
            </td>
          </tr>
          <tr>
            <td>Гигиена и красота</td>
            <td>1700</td>
            <td>1500</td>
            <td>-</td>
            <td>200</td>
            <td>
              <i className="fas fa-pen"></i>
            </td>
          </tr>
          <tr>
            <td>Итого:</td>
            <td>3200</td>
            <td>11500</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Content;
