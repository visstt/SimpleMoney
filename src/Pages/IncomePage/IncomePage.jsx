import React from "react";
import IncomePageContent from "./IncomePageContent";
import SideBar from "../../Components/SideBar/SideBar";
import styles from "./IncomePage1.module.css";

export default function IncomePage() {
  return (
    <div className={styles.container}>
      <SideBar />
      <IncomePageContent />
    </div>
  );
}
