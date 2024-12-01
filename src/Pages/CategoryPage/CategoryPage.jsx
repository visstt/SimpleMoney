import React from "react";
import styles from "./CategoryPage.module.css";
import Sidebar from "../../Components/SideBar/SideBar";
import CategoryPageContent from "./CategoryPageContent";
export default function CategoryPage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <CategoryPageContent />
    </div>
  );
}
