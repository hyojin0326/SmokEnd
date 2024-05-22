import React, { useState } from "react";
import styles from "../styles/Introduction.module.css";
import background1 from "../assets/Introduction/background1.png";
import background2 from "../assets/Introduction/background2.png";

function Introduction() {
  return (
    <>
      <div>
        <div className={styles.background}>
          <img src={background1} alt="background1" />
        </div>
        <div className={styles.background}>
          <img src={background2} alt="background2" />
        </div>
      </div>
    </>
  );
}
export default Introduction;
