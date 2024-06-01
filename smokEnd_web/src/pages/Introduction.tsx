import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Introduction.module.css";
import background1 from "../assets/Introduction/background1.png";
import background2 from "../assets/Introduction/background2.png";
import Header from "../components/Header";
import phone1 from "../assets/Introduction/phone1.png";
import phone2 from "../assets/Introduction/phone2.png";
import phone3 from "../assets/Introduction/phone3.png";
import web from "../assets/Introduction/web.png";
import circle from "../assets/Introduction/circle.png";
import caseImage from "../assets/Introduction/case.png";

function Introduction() {
  const phoneRef1 = useRef<HTMLImageElement>(document.createElement("img"));
  const phoneRef2 = useRef<HTMLImageElement>(document.createElement("img"));
  const caseRef = useRef<HTMLImageElement>(document.createElement("img"));

  const [phone1Loaded, setPhone1Loaded] = useState(false);
  const [phone2Loaded, setPhone2Loaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (phone1Loaded && phone2Loaded && caseRef.current) {
        const caseImageElement = caseRef.current;
        const caseOffsetTop = caseImageElement.offsetTop;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        // 페이지의 아래로 스크롤하여 이미지 부분으로 도달하면 애니메이션 실행
        if (scrollTop + window.innerHeight >= caseOffsetTop) {
          caseImageElement.classList.add(styles.animateUp);
          phoneRef2.current.classList.add(styles.animateUp);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [phone1Loaded, phone2Loaded]);

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
          <div className={styles.phone1}>
            <img
              src={phone1}
              alt="phone1"
              className={styles.phoneImage}
              onLoad={() => setPhone1Loaded(true)}
              ref={phoneRef1}
            />
            <div className={styles.rightBox}>
              <div className={styles.logo}>
                Smok<div className={styles.logo2}>E</div>nd
              </div>
              <p className={styles.p}>에 오신 걸 환영 합니다.</p>
              <br />
              <br />
              <p className={styles.p}>지금 부터</p>
              <div className={styles.logo}>
                Smok<div className={styles.logo2}>E</div>nd
              </div>
              <p className={styles.p}>의 이야기를 시작합니다.</p>
            </div>
          </div>
        </div>

        <div className={styles.background}>
          <img
            src={background2}
            alt="background2"
            className={styles.backgroundImage2}
          />
          <div className={styles.phone2}>
            <img
              src={phone2}
              alt="phone2"
              className={styles.phoneImage2}
              onLoad={() => setPhone2Loaded(true)}
              ref={phoneRef2}
            />
            <div className={styles.leftBox}>
              <div className={styles.Fname}>함께, </div>
              <br />
              <div className={styles.Grey}>
                <div className={styles.logo}>
                  Smok<div className={styles.logo2}>E</div>nd
                </div>
                <p className={styles.p}>는 금연을 필요로하는</p>
                <br />
                <br />
                <p className={styles.p}>
                  흡연자를 위한 앱과 웹페이지, 스마트 담배갑
                </p>
                <br />
                <br />
                <p className={styles.p}>
                  그리고 건강하고 새로운 시작을 지원합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.background}>
            {/* <img
              src={background2}
              alt="background2"
              className={styles.backgroundImage2}
            /> */}
            <div className={styles.phone1}>
              <img
                src={phone1}
                alt="phone1"
                className={styles.phoneImage}
                onLoad={() => setPhone1Loaded(true)}
                ref={phoneRef1}
              />
              <div className={styles.rightBox}>
                <div className={styles.Fname}>조금씩, 하지만 확실하게.</div>
                <br />
                <div className={styles.Grey}>
                  <p className={styles.p}>선택한 기간동안의 하루 목표치를</p>
                  <br />
                  <br />
                  <p className={styles.p}>평소 내가 피우던 양에 기반하여</p>
                  <br />
                  <br />
                  <p className={styles.p}>자동으로 설정합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.background}>
        <img
          src={background2}
          alt="background2"
          className={styles.backgroundImage2}
        />
        <div className={styles.phone2}>
          <img
            src={phone2}
            alt="phone2"
            className={styles.phoneImage2}
            onLoad={() => setPhone2Loaded(true)}
            ref={phoneRef2}
          />
          <div className={styles.leftBox}>
            <div className={styles.Fname}>함께, </div>
            <br />
            <div className={styles.Grey}>
              <div className={styles.logo}>
                Smok<div className={styles.logo2}>E</div>nd
              </div>
              <p className={styles.p}>는 금연을 필요로하는</p>
              <br />
              <br />
              <p className={styles.p}>
                흡연자를 위한 앱과 웹페이지, 스마트 담배갑
              </p>
              <br />
              <br />
              <p className={styles.p}>
                그리고 건강하고 새로운 시작을 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.centerCircleContainer}>
        <img src={circle} className={styles.circle} />
      </div>
    </>
  );
}

export default Introduction;
