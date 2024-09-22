import React, { useState, useEffect } from "react";
import styles from "../styles/Shop.module.css";
import CASE from "../assets/Introduction/case.png";
import { Link } from "react-router-dom";
import caseImage from "../assets/Introduction/case.png";
import belowArrow from "../assets/shop/belowArrow.png";

import Pagination from "../components/Pagination";

import test from "../assets/Introduction/test.jpg";

// Item 타입 정의 (예시)
interface Item {
  ID: number;
  image: string;
  m_price: number;
  name: string;
  price: number;
  url: string;
}

function Shop() {
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [response, setResponse] = useState<string>("");
  const LIMIT = 12; // 한 페이지에 표시할 항목 수
  const [pageIndex, setPageIndex] = useState(1); // 현재 페이지
  const [totalPage, setTotalPage] = useState(1); // 전체 페이지 수
  const [activePage, setActivePage] = useState(1);

  // 페이지 변경 시 호출되는 함수
  const getCurrentPage = (pageNumber: number, type: string) => {
    setPageIndex(pageNumber);
    setActivePage(pageNumber); // 활성 페이지 업데이트
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_URL_API}/api/get/items`
      );
      if (response.status === 200) {
        const data: Item[] = await response.json();
        setItemsData(data);
        console.log("데이터 가져오기 성공");
        setTotalPage(Math.ceil(data.length / LIMIT)); // 전체 페이지 수 계산
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
  }, []);

  // 현재 페이지에 맞는 항목을 필터링
  const currentItems = itemsData.slice(
    (pageIndex - 1) * LIMIT,
    pageIndex * LIMIT
  );

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
            <div className="pagination">
              {itemsData.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.ID} className={styles.shopBox}>
                    {/* 상품 항목 표시 */}
                    <div className={styles.shopBox2}>
                      <div className={styles.shopBox3}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.img}
                        />
                        <a className={styles.t2}>{item.name}</a>
                        <div className={styles.shopBox4}>
                          <a className={styles.t3}>
                            {item.price.toLocaleString()} 원 /
                          </a>
                          <a className={styles.t3}>
                            {item.m_price.toLocaleString()} P
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className={styles.hovershopBox}>
                      <div className={styles.btnBack}>
                        <div className={styles.btnBox}>
                          <a href={item.url} className={styles.btn1}>
                            <div className={styles.tBox}>
                              <div className={styles.t}>현금 구매</div>
                            </div>
                          </a>
                          <Link
                            key={item.ID}
                            to={`/mileagePurchase?id=${item.ID}`}
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

      {/* 페이지네이션 컴포넌트 */}
      <Pagination
        postsPerPage={LIMIT}
        totalPosts={itemsData.length}
        getCurrentPage={getCurrentPage}
        activePage={activePage} // 활성 페이지 전달
      />
    </>
  );
}

export default Shop;
