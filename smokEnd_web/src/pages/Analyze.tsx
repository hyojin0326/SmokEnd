import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "../styles/Analyze.module.css";
import AnalyzeHeader from "../components/analyzeHeader";
import PersonalSmokingTrend from "./PersonalSmokingTrend";
import PersonalWeeklySmokingFrequency from "./PersonalWeeklySmokingFrequency";
import AiAnalyze from "./AiAnalyze";
import { Link } from "react-router-dom";

interface Item {
  ID: number;
  image: string;
  m_price: number;
  name: string;
  price: number;
  url: string;
  category: string;
}

function Analyze() {
  const [isAiAnalyzeVisible, setAiAnalyzeVisible] = useState(false);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); // 필터링된 상품 저장
  const [visibleItem, setVisibleItem] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const toggleAiAnalyze = () => {
    setAiAnalyzeVisible(!isAiAnalyzeVisible);
  };

  async function fetchItems() {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API 응답 데이터:", data);

      if (Array.isArray(data)) {
        setItemsData(data);

        // 카테고리가 'Medicine'인 상품을 필터링하여 최대 3개 선택
        const filtered = data
          .filter((item) => item.category === "Medicine")
          .slice(0, 3);
        setFilteredItems(filtered);
      } else {
        console.error("items 데이터가 없습니다.", data);
        setItemsData([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const fetchedToken = await user.getIdToken();
          setToken(fetchedToken);
          console.log("로그인한 사용자의 토큰:", fetchedToken);
          fetchItems(); // 로그인 시 상품 데이터 요청
        } catch (error) {
          console.error("토큰 가져오기 오류:", error);
        }
      } else {
        console.error("사용자가 인증되지 않았습니다.");
      }
    });

    return () => unsubscribe(); // 언마운트 시 리스너 정리
  }, []);

  useEffect(() => {
    if (token) {
      fetchItems(); // token이 업데이트될 때마다 fetchItems 호출
    }
  }, [token]); // 토큰이 변경될 때마다 fetchItems 호출

  const toggleVisibility = (id: number) => {
    setVisibleItem(visibleItem === id ? null : id);
  };

  return (
    <>
      <div className={styles.momBox}>
        <div className={styles.left}>
          <AnalyzeHeader />
        </div>

        <div className={styles.right}>
          <div className={styles.test}>
            <div className={styles.textBox}>
              <div className={styles.pagName}>분석페이지</div>
            </div>

            <div className={styles.charMomBox}>
              <div className={styles.charBox}>
                <div className={styles.char1}>
                  <div className={styles.cahrName}>나의 흡연량 변화</div>
                  <div className={styles.cahr}>
                    <PersonalSmokingTrend />
                  </div>
                </div>
                <div className={styles.char2}>
                  <div className={styles.cahrName}>나의 요일 별 흡연 빈도</div>
                  <div className={styles.cahr}>
                    <PersonalWeeklySmokingFrequency />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.line}></div>

            <div>
              <button className={styles.Btn} onClick={toggleAiAnalyze}>
                {isAiAnalyzeVisible ? "확인 완료" : "AI 분석 결과 보기"}
              </button>
            </div>

            <div className={styles.aiBox}>
              {isAiAnalyzeVisible && <AiAnalyze />}

              {isAiAnalyzeVisible && ( // AiAnalyze가 보일 때만 추천 상품 표시
                <>
                  <div className={styles.shopName}>SmokEnd의 추천 상품</div>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item: Item) => (
                      <div key={item.ID} className={styles.shopBox}>
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
                                    <div className={styles.t}>
                                      마일리지 구매
                                    </div>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analyze;
