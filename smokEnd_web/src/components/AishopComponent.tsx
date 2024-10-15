import { Link } from "react-router-dom";
import styles from "../styles/Analyze.module.css";
import React, { useState, useEffect } from "react";

interface Item {
  ID: number;
  image: string;
  m_price: number;
  name: string;
  price: number;
  url: string;
  category: string;
}

const AishopComponent = () => {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); // 필터링된 상품 저장

  const fetchData = async () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!token) {
      console.error("토큰이 없습니다. API 요청을 할 수 없습니다.");
      return;
    }

    console.log("API 요청에 사용되는 토큰:", token);

    try {
      const response = await fetch(
        `http://${
          import.meta.env.VITE_URL_API
        }/api/analyze/recommended/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data: Item[] = await response.json();
        setFilteredItems(data);
        console.log("데이터 가져오기 성공");
      }
    } catch {
      alert("엥?");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.shopName}>SmokEnd의 추천 상품</div>
      {filteredItems.length > 0 ? (
        filteredItems.map((item: Item) => (
          <div key={item.ID} className={styles.shopBox}>
            <div className={styles.shopBox2}>
              <div className={styles.shopBox3}>
                <img src={item.image} alt={item.name} className={styles.img} />
                <a className={styles.t2}>{item.name}</a>
                <div className={styles.shopBox4}>
                  <a className={styles.t3}>
                    {item.price.toLocaleString()} 원 /
                  </a>
                  <a className={styles.t3}>{item.m_price.toLocaleString()} P</a>
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
    </>
  );
};

export default AishopComponent;
