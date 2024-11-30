import React from "react";
import styles from "./Section3.module.css";
import laptop from "./laptop.png";
import map from "./map.png";
import snake from "./snake.png";
import pk from "./pk.png";

export default function Section3() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Как работает Simple Money</div>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <div className={styles.wrapper}>
            <img src={laptop} alt="" />
            <div>
              <h3>Зарегистрируйтесь бесплатно</h3>
              <p>
                Начните свой путь с нашим бесплатным приложением. Это просто —
                не нужно ни кредитной карты, ни обязательств.
              </p>
            </div>
          </div>
          <div className={styles.wrapper}>
            <img src={map} alt="" />
            <div>
              <h3>Составьте денежный план</h3>
              <p>
                Добавьте свои счета и расходы, установите цели по сбережениям и
                поделитесь своим планом с близкими.
              </p>
            </div>
          </div>
          <div className={styles.wrapper}>
            <img src={snake} alt="" />
            <div>
              <h3>Наслаждайтесь меньшим стрессом</h3>
              <p>
                Начните чувствовать себя уверенно, спокойно и безопасно в своей
                финансовой жизни. Возможно, вы даже будете лучше спать.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.imageSection}>
          <img src={pk} alt=""  />
        </div>
      </div>
      <button className={styles.button}>
        Начните учёт финансов прямо сейчас!
      </button>
    </div>
  );
}
