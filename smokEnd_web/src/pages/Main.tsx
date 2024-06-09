import styles from "../styles/Main.module.css";
import Header from "../components/Header";
import belowArrow from "../assets/main/belowArrow_white.png";
import { useEffect, useState } from "react";
import data1Image from "../assets/Introduction/case.png";
import styled from "styled-components";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Image = styled.div`
  width: 25vw;
  height: 26vw;
  border-radius: 2vw;
  background-image: url(${data1Image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 768px) {
    width: 35vw;
    height: 36vw;
  }
`;

function Main() {
  //const [scrollPosition, setScrollPosition] = useState(0);
  const [num, setNum] = useState<number>(0);
  const [specialProductIndex, setSpecialProductIndex] = useState<number>(0);
  const isMobile = window.innerWidth <= 768;
  const [isLogin, setIsLogin] = useState(false);

  //로그인 상태에 따라
  useEffect(() => {
    const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');
    setIsLogin(!!sessionId);
  }, []);
  //스크롤 가능, 불가능
  useEffect(() => {
    if (isLogin) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLogin]);

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
            <div
              className={`${styles.product} ${specialProductIndex === 0 ? styles.specialProduct : ""
                }`}
              style={{ transform: getProductTransform1(0) }}
            >
              <Link to="/smokEndCase">
              <Image></Image>
              </Link>
              {specialProductIndex === 0 && (
                <div className={styles.product_des}>
                  <p className={styles.product_title}>SomkEnd 담배 케이스</p>
                  <p className={styles.product_sub}>
                    당신의 금연을 도와줄 수 있습니다.
                  </p>
                </div>
              )}
            </div>
            <div
              className={`${styles.product} ${specialProductIndex === 1 ? styles.specialProduct : ""
                }`}
              style={{ transform: getProductTransform2(0) }}
            >
              <div className={styles.product_img}></div>
              {specialProductIndex === 1 && (
                <div className={styles.product_des}>
                  <p className={styles.product_title}>특별한 경우 2</p>
                  <p className={styles.product_sub}>
                    이 제품은 특별한 경우에만 보입니다.
                  </p>
                </div>
              )}
            </div>
            <div
              className={`${styles.product} ${specialProductIndex === 2 ? styles.specialProduct : ""
                }`}
              style={{ transform: getProductTransform3(0) }}
            >
              <Image></Image>
              {specialProductIndex === 2 && (
                <div className={styles.product_des}>
                  <p className={styles.product_title}>특별한 경우 3</p>
                  <p className={styles.product_sub}>
                    이 제품은 특별한 경우에만 보입니다.
                  </p>
                </div>
              )}
            </div>

            <div
              className={styles.rightArrow}
              onClick={handleRightArrowClick}
            />
          </div>
        </div>

        <div className={styles.select}>
          <p className={styles.main_product_title}>
            <span>금연</span>을 위한 최고의 선택
          </p>
          <div className={styles.select_content}>
            <div className={styles.self_check}>
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
            <div className={styles.campaign}>
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

        <div className={styles.smoke_write}>
          <div className={styles.write}>
            <p className={styles.write_category}>금연의 필요성</p>
            <p className={styles.write_title}>
              금연을 실천해야 하는 104가지 이유
            </p>
            <p className={styles.write_date}>2021-03-19</p>
          </div>
          <div className={styles.write}>
            <p className={styles.write_category}>흡연의 위험성</p>
            <p className={styles.write_title}>흡연과 암</p>
            <p className={styles.write_date}>2021-03-19</p>
          </div>
          <div className={styles.write}>
            <p className={styles.write_category}>금연의 필요성</p>
            <p className={styles.write_title}>금연의 경제적 이득</p>
            <p className={styles.write_date}>2021-03-19</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
