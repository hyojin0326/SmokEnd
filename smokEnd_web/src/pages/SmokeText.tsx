import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styles from "../styles/SmokeText.module.css";
import test from "../assets/SmokeText/test.jpg";
import textwrite from "../assets/SmokeText/textwrite.png";
import Header from "../components/Header";

const SmokeText: React.FC = () => {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: Array<keyof typeof tabNames> = ["risk", "necessity"];
  const tabNames = {
    risk: "흡연의 위험성",
    necessity: "금연의 필요성",
  };
  const currentTab =
    tabs.find((tab) => location.pathname.includes(tab)) || "risk";

  const [selectedTab, setSelectedTab] =
    useState<keyof typeof tabNames>(currentTab);
  const [posts, setPosts] = useState<{
    [key in keyof typeof tabNames]: string[];
  }>({
    risk: [],
    necessity: [],
  }); // 각 탭별 게시물 내용
  const scrollBoxRef = useRef<HTMLDivElement>(null); // 스크롤 박스의 ref

  useEffect(() => {
    setSelectedTab(currentTab);
  }, [currentTab]);

  // 각 탭을 클릭했을 때 호출되는 함수
  const handleTabClick = (tabName: keyof typeof tabNames) => {
    setSelectedTab(tabName);
    navigate(`/smokeText/${tabName}`);
  };

  // 새로운 게시물이 추가될 때 호출되는 함수
  const addNewPost = () => {
    const newPost =
      selectedTab === "risk"
        ? `
        <div class="${styles.textBox}">
          <div class="${styles.leftContainer}">
            <div class="${styles.NickName}">관리자</div>
            <div class="${styles.date}">2024년 05월 10일</div>
            <div class="${styles.Name}">변우석 수진 좋아한다 고백 수진 금연</div>
            <div class="${styles.NickName}">
              흡연의 중요성 글 입니다.
              <br />
              알라딘이다 그래
              <br />
              류선재 사랑해
              <br />
              김석진 전역하면 넌2순위 미안해 ...
            </div>
          </div>
          <div class="${styles.imageContainer}">
            <img src="${test}" />
          </div>
        </div>
      `
        : `
        <div class="${styles.textBox}">
          <div class="${styles.leftContainer}">
            <div class="${styles.NickName}">관리자</div>
            <div class="${styles.date}">2024년 05월 10일</div>
            <div class="${styles.Name}">류선재 수진을 선택했다</div>
            <div class="${styles.NickName}">
              금연의 필요성 글 입니다.
              <br />
              알라딘이다 그래
              <br />
              류선재 사랑해
              <br />
              김석진 전역하면 넌2순위 미안해 ...
            </div>
          </div>
          <div class="${styles.imageContainer}">
            <img src="${test}" />
          </div>
        </div>
      `;
    setPosts((prevPosts) => ({
      ...prevPosts,
      [selectedTab]: [...prevPosts[selectedTab], newPost],
    }));
  };

  // 스크롤 박스가 항상 아래로 스크롤되도록 설정
  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [posts[selectedTab]]);

  const TabContent: React.FC = () => {
    return (
      <div>
        <div className={styles.but}>
          <button className={styles.noButtonStyle} onClick={addNewPost}>
            <img src={textwrite} />
          </button>
        </div>
        <div className={styles.scrollBox} ref={scrollBoxRef}>
          <div className={styles.textBox}>
            {posts[selectedTab].map((post, index) => (
              <div
                key={index}
                className={styles.post}
                dangerouslySetInnerHTML={{ __html: post }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.bigBox}>
            <p className={styles.pageName}>담배</p>
            <p className={styles.p}>담배에 대해 얼마나 아십니까?</p>
          </div>
          <div className={styles.container}>
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`${styles.box} ${
                  selectedTab === tab ? styles.active : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                <div className={styles.text}>{tabNames[tab]}</div>
              </div>
            ))}
          </div>
          <TabContent />
        </div>
      </div>
    </>
  );
};

export default SmokeText;
