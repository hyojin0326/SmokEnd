import React, { useState, useEffect } from "react";
import styles from "../styles/Shop.module.css";
import CASE from "../assets/Introduction/case.png";
import { Link } from "react-router-dom";
import caseImage from "../assets/Introduction/case.png";
import belowArrow from "../assets/shop/belowArrow.png";

import test from "../assets/Introduction/test.jpg";

// Item 타입 정의 (예시)
type Item = {
  ID: number;
  image: string;
  m_price: number;
  name: string;
  price: number;
  url: string;
};

function Shop() {
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [response, setResponse] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_URL_API}/api/get/items`
      );
      if (response.ok) {
        const data: Item[] = await response.json();
        setItemsData(data);
      } else {
        setResponse("서버 오류");
      }
    } catch (error) {
      console.error("fetch 에러", error);
      setResponse("fetch 에러");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className={styles.smokeBox}>
        <div className={styles.smokCase}>
          <div className={styles.box}>
            <div className={styles.leftBox}>
              <Link to="/smokEndCase" style={{ textDecoration: "none" }}>
                <div className={styles.Fname}>SmokEnd Case</div>
              </Link>
              <br />
              <br />
              <div className={styles.Grey}>
                <Link to="/smokEndCase" style={{ textDecoration: "none" }}>
                  <p className={styles.p}>당신의 눈을 즐겁게 폐를 건강하게</p>
                  <br />
                  <br />
                  <p className={styles.p}>SmokEnd 와 함께 </p>
                </Link>
              </div>
            </div>
            <img src={caseImage} className={styles.caseImage} />
          </div>
        </div>
      </div>

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
            <div>
              {response && <p>{response}</p>}
              {itemsData.length > 0 ? (
                itemsData.map((item) => (
                  <div key={item.ID} className={styles.shopBox}>
                    {/* 상품 칸 */}
                    {/* <div className={styles.shopBox2}>
                      <div className={styles.shopBox3}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.img}
                        />
                        <a className={styles.t2}>{item.name}</a>
                        <div className={styles.shopBox4}>
                          <a className={styles.t3}>{item.price} 원 /</a>
                          <a className={styles.t3}>{item.m_price} P</a>
                        </div>
                      </div>
                    </div> */}
                    {/* // */}
                    <div className={styles.hovershopBox}>
                      <div className={styles.btnBack}>
                        <div className={styles.btnBox}>
                          <a href={item.url} className={styles.btn1}>
                            <div className={styles.tBox}>
                              <div className={styles.t}>현금 구매</div>
                            </div>
                          </a>
                          <Link
                            to="/mileagePurchase?id=${ID}"
                            style={{ textDecoration: "none" }}
                          >
                            <div className={styles.btn2}>
                              <div className={styles.tBox}>
                                <div className={styles.t}>마일리지 구매</div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>데이터를 불러오는 중입니다...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          이전
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>다음</button>
      </div>
    </>
  );
}

export default Shop;
