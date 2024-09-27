import React, { useState, useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "../styles/SmokeText.module.css";
import textwrite from "../assets/SmokeText/textwrite.png";
import dompurify from "dompurify";
import test from "../assets/SmokeText/test.jpg";
import SmokeTextById from "./SmokeTextById";

interface board {
  title: string;
  content: string;
}

const SmokeText: React.FC = () => {
  const [itemsData, setItemsData] = useState<board>();
  const isMobile = window.innerWidth <= 768;
  const [searchParams] = useSearchParams();
  var id = searchParams.get("id");
  const [category, setCategory] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { tab } = useParams();
  const navigate = useNavigate();
  const sanitizer = dompurify.sanitize;

  const clickId = "1";
  const title = "두경부암";
  const content =
    "<p>두경부암은 뇌, 뇌신경, 눈, 식도 등을 제외한 머리와 목 부위에 발생하는 암을 합쳐서 부르는 말로, 후두암, 인두암, 구강암, 비부비동암, 침샘암 등이 있으며, 이 중 흡연이 가장 확실한 발암 원인으로 꼽히는 암이 후두암, 구강암, 인두암입니다.</p><p>일본인 대상의 흡연과 두경부암 발병 및 사망률 관련 체계적 문헌고찰 및 메타분석 연구 결과에 따르면, 두경부암 발생과 사망 위험이 비흡연자 대비 흡연 경험자 2.4배, 현재 흡연자 2.7배, 과거 흡연자 1.5배 증가하였습니다. 또 다른 체계적 문헌고찰 연구에서는 전자담배와 두경부암 발병의 연관성을 확인할 수 있었으며, 이 연구에서 전자담배가 DNA 이중 가닥 파손 위험을 높이고 산화 스트레스를 포함한 시험관 내 손상을 유발할 수 있다는 증거를 제한적이나마 찾을 수 있었습니다.</p><p><br></p><p>한편, 음주 역시 두경부암의 대표적인 발병 원인으로, 음주와 흡연을 동시에 하는 경우 상승작용을 일으켜 암 발생 위험을 더욱 높입니다. 또한 일부 연구에서는 음주와 담배종류별 동반 사용에 대한 암 발생 위험을 확인하였으며, 음주와 일반담배(궐련) 및 무연담배 사용 시 암 발생위험이 16.2배로 가장 높았고, 음주와 무연담배 사용이 7.8배, 음주와 일반담배(궐련) 4.7배 순으로 나타났습니다.</p><p>금연은 가장 확실한 두경부암 예방책입니다. 금연을 하는 경우 두경부암의 발생 위험과 치료 및 예후에서 긍정적인 결과를 기대할 수 있습니다. 금연한 지 16년 지난 후부터는 후두암 발생 위험이 절반 수준으로 감소하며, 두경부암 환자가 금연하는 경우 치료 전, 치료 중 및 치료 후의 전 과정에 걸쳐 전체 생존율을 높이고 재발률을 줄이는 것으로 알려져 있습니다.</p><p><br></p>";
  const imgSrc =
    '<img src="data:image/jpeg;base64,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">';
  const sanitizedContent = sanitizer(content);
  const maxLength = 250;

  const displayContent =
    sanitizedContent.length > maxLength
      ? sanitizedContent.slice(0, maxLength) + "..."
      : sanitizedContent;

  useEffect(() => {
    if (tab !== undefined) {
      setCategory(tab);
    }

    const user = document.cookie.replace(
      /(?:(?:^|.*;\s*)userStats\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (user != "") {
      const userStats = JSON.parse(user);
      setIsAdmin(userStats.isAdmin);
      // setIsAdmin(false);
    }
  }, []);

  const clickBoard = () => {
    id = clickId!;
    navigate(`/smokeText/${category}?id=${id}`);
  };

  const scrollBoxRef = useRef<HTMLDivElement>(null); // 스크롤 박스의 ref

  // 각 탭을 클릭했을 때 호출되는 함수
  const handleTabClick = (category: string) => {
    navigate(`/smokeText/${category}`);
    setCategory(category);
  };

  //스크롤 박스가 항상 아래로 스크롤되도록 설정
  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, []);

  const TabContent: React.FC = () => {
    return (
      <div>
        <div className={styles.but}>
          {/* <button className={styles.noButtonStyle} onClick={addNewPost}> */}
          {isAdmin == true ? (
            <Link to={`/textWrite/${category}`}>
              <button className={styles.noButtonStyle}>
                <img src={textwrite} />
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.scrollBox} ref={scrollBoxRef}>
          {/* <div className={styles.post} /> */}
          <div className={styles.textBox}>
            <div className={styles.leftContainer} onClick={clickBoard}>
              <div className={styles.NickName}>관리자</div>
              <div className={styles.date}>2024년 05월 10일</div>
              <div className={styles.Name}>{title}</div>
              <div
                className={styles.NickName}
                dangerouslySetInnerHTML={{ __html: sanitizer(displayContent) }}
              ></div>
            </div>
            <div className={styles.imageContainer}>
              {/* <div
                className={styles.imageContainer_img}
                dangerouslySetInnerHTML={{ __html: sanitizer(imgSrc) }}
              ></div> */}
              <img src={test} />
            </div>
          </div>
          <div className={styles.textBox}>
            <div className={styles.leftContainer}>
              <div className={styles.NickName}>관리자</div>
              <div className={styles.date}>2024년 05월 10일</div>
              <div className={styles.Name}>{title}</div>
              <div
                className={styles.NickName}
                dangerouslySetInnerHTML={{ __html: sanitizer(displayContent) }}
              ></div>
            </div>
            <div className={styles.imageContainer}>
              <div
                className={styles.imageContainer_img}
                dangerouslySetInnerHTML={{ __html: sanitizer(imgSrc) }}
              ></div>
            </div>
          </div>
          ''
        </div>
      </div>
    );
  };

  return (
    <>
      {id !== null ? (
        <SmokeTextById />
      ) : (
        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.bigBox}>
              <p className={styles.pageName}>담배</p>
              <p className={styles.p}>담배에 대해 얼마나 아십니까?</p>
            </div>
            <div className={styles.container}>
              <div
                className={`${styles.box} ${
                  category === "risk" ? styles.active : ""
                }`}
                onClick={() => handleTabClick("risk")}
              >
                <div className={styles.text}>흡연의 위험성</div>
              </div>

              <div
                className={`${styles.box} ${
                  category === "necessity" ? styles.active : ""
                }`}
                onClick={() => handleTabClick("necessity")}
              >
                <div className={styles.text}>금연의 필요성</div>
              </div>
            </div>
            <TabContent />
          </div>
        </div>
      )}
    </>
  );
};

export default SmokeText;
