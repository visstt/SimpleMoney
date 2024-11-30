import React from "react";
import Sidebar from "../../Components/SideBar/SideBar";
import Content from "./Content";
import styles from "./Budget.module.css";

const BudgetPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Content />
    </div>
  );
};

export default BudgetPage;
