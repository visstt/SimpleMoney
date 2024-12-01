import React from 'react'
import Sidebar from '../../Components/SideBar/SideBar'
import ExpensePageContent from './ExpencePageContent'
import styles from "./ExpencePage.module.css"

export default function ExpencePage() {
  return (
    <div className={styles.container}>
        <Sidebar/>
        <ExpensePageContent/>
    </div>
  )
}
