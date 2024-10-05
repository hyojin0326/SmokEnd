import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
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
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
}

const Image = styled.div`
  width: 15vw;
  height: 15vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SmokeText: React.FC = () => {
  const [boardData, setBoardData] = useState<board[]>([]);
  const isMobile = window.innerWidth <= 768;
  const [searchParams] = useSearchParams();
  var paramId = searchParams.get("id");
  const [category, setCategory] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { tab } = useParams();
  const navigate = useNavigate();
  const sanitizer = dompurify.sanitize;

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

  useEffect(() => {
    if (category) {
      fetchData(category);
    }
  }, [category]);

  const clickBoard = (id: string) => {
    paramId = id!;
    navigate(`/smokeText/${category}?id=${paramId}`);
  };

  const scrollBoxRef = useRef<HTMLDivElement>(null); // 스크롤 박스의 ref

  // 각 탭을 클릭했을 때 호출되는 함수
  const handleTabClick = (category: string) => {
    window.location.href = `/smokeText/${category}`;
    // navigate(`/smokeText/${category}`);
    setCategory(category);
  };

  //스크롤 박스가 항상 아래로 스크롤되도록 설정
  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, []);

  // 서버에서 데이터 받아오기
  const fetchData = async (category: string) => {
    console.log("시작");
    const response = await fetch(
      `http://${import.meta.env.VITE_URL_API}/api/get/article/${category}`
    );
    if (response.status == 200) {
      // 데이터 가져옴
      /**
       * 데이터 예시
       * [
          {
            "_id": "66ff9602a6ac75f6f330d03a", // mongodb의 고유 아이디, 고려하지 말것
            "id": "91406b29-7036-49cf-a29b-f632b169769e", // 해당 글의 id
            "category": "necessity", // 해당 글의 카테고리
            "title": "제목", // 해당 글의 제목 
            "content": "작성한 내용",
            "thumbnail": "썸네일 이미지 url",
            "createdAt": "2024년 10월 04일" // text형식
          }
        ]
       */
      const data: board[] = await response.json();
      setBoardData(data);
      const maxLength = 250;
      for (var i = 0; i < data.length; i++) {
        const sanitizedContent = sanitizer(data[i].content);
        // DOMParser를 이용하여 HTML 파싱
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitizedContent, "text/html");

        // img 태그 제거
        const images = doc.querySelectorAll("img");
        images.forEach((img) => img.remove());

        // 텍스트만 추출
        var cleanedContent = doc.body.textContent || "";

        const referenceIndex = cleanedContent.indexOf("<출처>");

        if (referenceIndex !== -1) {
          cleanedContent = cleanedContent.slice(0, referenceIndex); // 참고문헌 앞까지만 자름
        }

        // 길이 제한 후 저장
        data[i].content =
          cleanedContent.length > maxLength
            ? cleanedContent.slice(0, maxLength) + "..."
            : cleanedContent;

        console.log(data[0].content);
      }
    } else {
      // 작성된 글 없음
      console.log("데이터 없음");
    }
  };

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
          {boardData.length > 0 ? (
            boardData.map((item) => (
              <div className={styles.textBox} key={item.id}>
                <div
                  className={styles.leftContainer}
                  onClick={() => clickBoard(item.id)}
                >
                  <div className={styles.NickName}>관리자</div>
                  <div className={styles.date}>{item.createdAt}</div>
                  <div className={styles.Name}>{item.title}</div>
                  <div className={styles.NickName}>
                    {sanitizer(item.content)}
                  </div>
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  ></Image>
                </div>
              </div>
            ))
          ) : (
            <p>데이터를 불러오는 중입니다...</p>
          )}
          .
        </div>
      </div>
    );
  };

  return (
    <>
      {paramId !== null ? (
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
