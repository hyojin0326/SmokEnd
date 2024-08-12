import React, { useState, useEffect } from "react";
import styles from "../styles/Shop.module.css";
import CASE from "../assets/Introduction/case.png";
import { Link } from "react-router-dom";
import caseImage from "../assets/Introduction/case.png";
import belowArrow from "../assets/shop/belowArrow.png";

function Shop() {
  return (
    <>
      <Link to="/smokEndCase" style={{ textDecoration: "none" }}>
        <div className={styles.smokeBox}>
          <div className={styles.smokCase}>
            {" "}
            <div className={styles.box}>
              <div className={styles.leftBox}>
                <div className={styles.Fname}>SmokEnd Case</div>
                <br />
                <br />
                <div className={styles.Grey}>
                  <p className={styles.p}>당신의 눈을 즐겁게 폐를 건강하게</p>
                  <br />
                  <br />
                  <p className={styles.p}>SmokEnd 와 함께 </p>
                </div>
              </div>
              <img src={caseImage} className={styles.caseImage} />
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.bottom}>
        <img src={belowArrow} alt="Arrow" />
      </div>

      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.productsBox}>
            <div className={styles.products}>
              <div className={styles.p2}>p r o d u c t s</div>
              <div className={styles.border}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.outerContainer1}>
        <div className={styles.innerContainer1}>
          <div className={styles.shop}>
            <div className={styles.shopBox}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
