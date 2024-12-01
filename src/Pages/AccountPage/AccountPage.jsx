import React from "react";
import Sidebar from "../../Components/SideBar/SideBar";
import styles from "./AccountPage.module.css";
export default function AccountPage() {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
}
