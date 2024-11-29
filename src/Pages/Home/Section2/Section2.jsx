import React from "react";
import styles from "./Section2.module.css";
import photo from "./photo.png";

export default function Section2() {
  return (
    <div>
      <div className={styles.text}>
        Simple Money – это больше, чем приложение для бюджета; это инструмент
        для создания жизни вашей мечты. Кем вы видите себя в будущем, и как ваши
        финансы помогут воплотить эту мечту?
      </div>
      <div className={styles.container}>
        <div className={styles.photo}>
          <img src={photo} alt="photo" className={styles.photo} />
        </div>
        <div className={styles.info}>
          <h1>
            Simple Money: контроль над финансами, рост сбережений, удовольствие
            от покупок
          </h1>
          <h3>
            Больше сбережений, больше удовольствия от покупок! Simple Money —
            это метод управления финансами, который покажет вам, куда уходят
            ваши деньги, и поможет изменить это.
          </h3>
        </div>
      </div>
    </div>
  );
}
