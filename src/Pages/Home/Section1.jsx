import React from 'react'
import styles from './Section1.module.css'
import man from './man1.png'

export default function Section1() {
  return (
    <div className={styles.Section1}>
        <div className={styles.textBlock}>
            <h1>Освободитесь от забот в финансах </h1>
            <h3>Легко управляйте своими деньгами, наслаждайтесь покупками без угрызений совести и достигайте финансового благополучия.</h3>
            <button className={styles.btn}>Пора начать следить за своими финансами!</button>
        </div>
        <div className={styles.photoBlock}>
            <img src={man} alt=""  className={styles.man}/>
        </div>
    </div>
  )
}
