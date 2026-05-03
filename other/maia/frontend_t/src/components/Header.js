import React from "react";
import styles from "@/styles/header.module.css";

const Header = () => {
  return (
    <div className={styles.header1}>
      <div className={styles.header_left}>
        <img className={styles.header_left1} src="maiaLogo.svg" alt="MAIA Logo"/>
        <div className={styles.header_left2}>
          <span>MAIA</span>
          <span>My AI Assistant</span>
        </div>
      </div>
      <img className={styles.header_right} src="quest.svg" alt="MAIA Logo"/>
    </div>
  );
};

export default Header;