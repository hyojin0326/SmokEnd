import React from "react";
import styles from "../styles/Introduction.module.css";
import background1 from "../assets/Introduction/background1.png";
import background2 from "../assets/Introduction/background2.png";
import phone1 from "../assets/Introduction/phone1.png";
import Header from "../components/Header";

function Introduction() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.background}>
          <img
            src={background1}
            alt="background1"
            className={styles.backgroundImage}
          />
          <div>
            <div className={styles.phone1}>
              <img src={phone1} alt="phone1" className={styles.phoneImage} />
              <div className={styles.leftBox}>
                <p className={styles.logo}>
                  Smok<p className={styles.logo2}>E</p>nd
                </p>
                <p className={styles.p}>에 오신 걸 환영 합니다.</p>
                <br />
                <br />
                <p className={styles.p}>지금 부터</p>
                <p className={styles.logo}>
                  Smok<p className={styles.logo2}>E</p>nd
                </p>
                <p className={styles.p}>의 이야기를 시작합니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.background}>
          <img
            src={background2}
            alt="background2"
            className={styles.backgroundImage}
          />
        </div>
      </div>
    </>
  );
}

export default Introduction;
