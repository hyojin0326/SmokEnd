import styles from "../styles/Main.module.css";
import belowArrow from "../assets/main/belowArrow_white.png";
import { useEffect, useState, useRef } from "react";
import data1Image from "../assets/Introduction/case_background.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Image = styled.div`
  width: 25vw;
  height: 26vw;
  border-radius: 1vw;
  background-image: url(${data1Image});
  background-size: contain;
  background-color: #c4a5d9;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 768px) {
    width: 35vw;
    height: 36vw;
  }
`;

interface Item {
  ID: number;
  image: string;
  m_price: number;
  name: string;
  price: number;
  url: string;
}

function Main() {
  //const [scrollPosition, setScrollPosition] = useState(0);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [num, setNum] = useState<number>(0);
  const [specialProductIndex, setSpecialProductIndex] = useState<number>(0);
  const isMobile = window.innerWidth <= 768;
  const [isLogin, setIsLogin] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null); // container_temp를 참조할 변수
  const [isVisible, setIsVisible] = useState(false); // 화면에 나타났는지 여부를 관리

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // 요소가 화면에 들어오면 상태를 true로 변경
            observer.disconnect(); // 한 번 감지되면 더 이상 관찰하지 않음
          }
        });
      },
      { threshold: 0.1 } // 요소가 10% 정도 보일 때 감지
    );

    if (containerRef.current) {
      observer.observe(containerRef.current); // container_temp를 관찰
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current); // cleanup 시 관찰 해제
      }
    };
  }, []);

  //로그인 상태에 따라
  useEffect(() => {
    getThreeItems();
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    setIsLogin(!!token);
  }, []);

  // itemsData가 변경될 때마다 콘솔에 값을 찍는 useEffect 추가
  useEffect(() => {
    if (itemsData.length > 0) {
      console.log(itemsData[0]);
    }
  }, [itemsData]);

  //스크롤 가능, 불가능
  useEffect(() => {
    if (isLogin) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLogin]);

  //상품 세개 띄워주기
  const getThreeItems = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_URL_API}/api/get/threeitem`
      );
      if (response.status === 200) {
        const data: Item[] = await response.json();
        setItemsData(data);
      } else {
        setResponse("서버 오류");
      }
    } catch (error) {
      console.error("fetch 에러", error);
      setResponse("fetch 에러");
    } finally {
      setIsLoading(false); // 데이터 로딩 완료 후 로딩 상태 해제
    }
  };

  const handleLeftArrowClick = () => {
    // num을 1씩 감소시키면서 순환되도록 설정
    setNum((prevNum) => (prevNum === 0 ? 2 : prevNum - 1));
    setSpecialProductIndex((prevSpecialProductIndex) =>
      prevSpecialProductIndex === 2 ? 0 : prevSpecialProductIndex + 1
    );
  };

  const getProductTransform1 = (index: number) => {
    // index에 따라 변환 값을 계산
    switch (index) {
      case 0:
        return `translateX(${num * (isMobile ? 40 : 28)}vw)`;
    }
  };

  const getProductTransform2 = (index: number) => {
    // index에 따라 변환 값을 계산
    switch (index) {
      case 0:
        if (num == 0) return `translateX(${num * (isMobile ? 40 : 28)}vw)`;
        else if (num == 2)
          return `translateX(${(num - 1) * -1 * (isMobile ? 40 : 28)}vw)`;
        else if (num == 1) return `translateX(${num * (isMobile ? 40 : 28)}vw)`;
    }
  };

  const getProductTransform3 = (index: number) => {
    // index에 따라 변환 값을 계산
    switch (index) {
      case 0:
        if (num == 1) return `translateX(${num * (isMobile ? 40 : 28) * -2}vw)`;
        else if (num == 2)
          return `translateX(${(num - 1) * -1 * (isMobile ? 40 : 28)}vw)`;
        else if (num == 0) return `translateX(${num * (isMobile ? 40 : 28)}vw)`;
    }
  };

  const handleRightArrowClick = () => {
    setNum((prevNum) => (prevNum === 2 ? 0 : prevNum + 1));
    setSpecialProductIndex((prevSpecialProductIndex) =>
      prevSpecialProductIndex === 0 ? 2 : prevSpecialProductIndex - 1
    );
  };

  return (
    <>
      <link
        href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css"
        rel="stylesheet"
      />

      <div className={styles.main_black}>
        <div className={styles.main_content}>
          <div className={styles.main}>
            <p className={styles.mainText}>
              지금 금연하지 않는다면 <br />
              <span>당신의 폐</span>는 망가집니다.
            </p>
            <br />
            <p className={styles.subText}>당신의 폐는 건강하십니까?</p>
            {isLogin ? (
              <Link to="/introduction" className={styles.mainButton}>
                <span>더 알아보기</span> <span>&gt;</span>
              </Link>
            ) : (
              <Link to="/login" className={styles.mainButton}>
                <span>더 알아보기</span> <span>&gt;</span>
              </Link>
            )}
          </div>
          <div className={styles.main_smoke}></div>
        </div>
        {isLogin && (
          <div className={styles.bottom}>
            <img src={belowArrow} alt="Arrow" />
          </div>
        )}
      </div>

      <div className={styles.select_background}>
        <div className={styles.main_temp}>
          <h1>smokEnd는 이런 서비스에요</h1>
          {/* container_temp 요소에 fadeIn 클래스를 동적으로 추가 */}
          <div
            ref={containerRef}
            className={`${styles.container_temp} ${isVisible ? styles.fadeIn : ""}`}
          >
            {/* 컨텐츠 */}
          </div>
          <br />
          <br />
          <p>
            <h1>
              내 흡연 통계가 궁금하다면?{" "}
              <a href="/analyze" style={{ color: "red" }}>
                진단 결과 보러 가기 <span>&gt;</span>
              </a>
            </h1>
          </p>
        </div>
      </div>

      <div className={styles.main_white}>
        <div className={styles.main_product}>
          <div className={styles.main_product_text}>
            <p className={styles.main_product_title}>
              당신의 <span>금연</span>을 <br />
              도와줄 제품
            </p>
            <br />
            <p className={styles.main_product_sub}>
              금연에 도움이 될 수 있는 제품을
              <br />
              마일리지, 현금으로, 구매할 수 있습니다.
            </p>
            <Link to="/shop" className={styles.Link}>
              <div className={styles.main_product_button}>
                <span>스토어</span> <span>&gt;</span>
              </div>
            </Link>
          </div>
          <div className={styles.mainProduct}>
            <div className={styles.leftArrow} onClick={handleLeftArrowClick} />

            {isLoading ? (
              <p>로딩 중...</p> // 로딩 중일 때 표시할 내용
            ) : (
              <>
                <div
                  className={`${styles.product} ${
                    specialProductIndex === 0 ? styles.specialProduct : ""
                  }`}
                  style={{ transform: getProductTransform1(0) }}
                >
                  <Link to="/shop">
                    <div
                      className={styles.product_img}
                      style={{ backgroundImage: `url(${itemsData[0].image})` }}
                    ></div>
                  </Link>

                  {specialProductIndex === 0 && (
                    <div className={styles.product_des}>
                      <p className={styles.product_title}>
                        {itemsData[0].name}
                      </p>
                      <p className={styles.product_sub}>
                        {itemsData[0].price.toLocaleString()} 원
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className={`${styles.product} ${
                    specialProductIndex === 1 ? styles.specialProduct : ""
                  }`}
                  style={{ transform: getProductTransform2(0) }}
                >
                  <Link to="/shop">
                    <div
                      className={styles.product_img}
                      style={{ backgroundImage: `url(${itemsData[1].image})` }}
                    ></div>
                  </Link>
                  {specialProductIndex === 1 && (
                    <div className={styles.product_des}>
                      <p className={styles.product_title}>
                        {itemsData[1].name}
                      </p>
                      <p className={styles.product_sub}>
                        {itemsData[1].price.toLocaleString()} 원
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className={`${styles.product} ${
                    specialProductIndex === 2 ? styles.specialProduct : ""
                  }`}
                  style={{ transform: getProductTransform3(0) }}
                >
                  <Link to="/shop">
                    <div
                      className={styles.product_img}
                      style={{ backgroundImage: `url(${itemsData[2].image})` }}
                    ></div>
                  </Link>

                  {specialProductIndex === 2 && (
                    <div className={styles.product_des}>
                      <p className={styles.product_title}>
                        {itemsData[2].name}
                      </p>
                      <p className={styles.product_sub}>
                        {itemsData[2].price.toLocaleString()} 원
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            <div
              className={styles.rightArrow}
              onClick={handleRightArrowClick}
            />
          </div>
        </div>
      </div>
      <div className={styles.select_background}>
        <p className={styles.main_select_title}>
          <span>금연</span>을 위한 최고의 선택
        </p>
        <div className={styles.select_content}>
          <div className={styles.self_check}>
            <div>
              <p className={styles.content_title}>자가진단</p>
              <p className={styles.content_des}>
                금연을 위해서는 현재 본인의 상태
                <br />
                제대로 아는것이 우선입니다.
              </p>
              <br />
              <br />
              <Link to="/selfAssessment/nicotine" className={styles.Link}>
                <div className={styles.self_check_button}>
                  <span>바로가기</span> <span>&gt;</span>
                </div>
              </Link>
              <div className={styles.self_check_img}></div>
            </div>
          </div>

          <div className={styles.campaign}>
            <div>
              <p className={styles.content_title}>금연 지도</p>
              <p className={styles.content_des}>
                SmokEnd가 당신의 건강을 위해
                <br />
                함께합니다.
              </p>
              <br />
              <br />
              <Link to="/noSmokingArea" className={styles.Link}>
                <div className={styles.campaign_button}>
                  <span>바로가기</span> <span>&gt;</span>
                </div>
              </Link>
              <div className={styles.campaign_img}></div>
            </div>
          </div>
        </div>
      </div>
      {/* {!isMobile ? (
        <div className={styles.smoke_write}>
          <div className={styles.write}>
            <div>
              <p className={styles.write_category}>금연의 필요성</p>
              <p className={styles.write_title}>
                금연을 실천해야 하는 104가지 이유
              </p>
              <p className={styles.write_date}>2021-03-19</p>
            </div>
          </div>
          <div className={styles.write}>
            <div>
              <p className={styles.write_category}>흡연의 위험성</p>
              <p className={styles.write_title}>흡연과 암</p>
              <p className={styles.write_date}>2021-03-19</p>
            </div>
          </div>
          <div className={styles.write}>
            <div>
              <p className={styles.write_category}>금연의 필요성</p>
              <p className={styles.write_title}>금연의 경제적 이득</p>
              <p className={styles.write_date}>2021-03-19</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className={styles.mobile_title}>
            당신의 <span>금연</span> 시작을 위해
          </p>
          <div className={styles.smoke_write}>
            <div className={styles.write}>
              <div>
                <p className={styles.write_category}>금연의 필요성</p>
                <p className={styles.write_title}>
                  금연을 실천해야 하는 104가지 이유
                </p>
                <p className={styles.write_date}>2021-03-19</p>
              </div>
            </div>

            <div className={styles.write}>
              <div>
                <p className={styles.write_category}>금연의 필요성</p>
                <p className={styles.write_title}>
                  금연을 실천해야 하는 104가지 이유
                </p>
                <p className={styles.write_date}>2021-03-19</p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Main;
