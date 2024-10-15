/**
 * AI 분석 결과를 표시합니다
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import styles from "../styles/Ai.module.css";
import AishopComponent from "../components/AishopComponent";

const AiAnalyze = () => {
  const [value, setValue] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState<string>(""); // 하나씩 출력되는 텍스트
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );
        const response = await axios.get(
          `http://localhost:8080/api/analyze/ai/${token}`
        );
        setValue(response.data);
      } catch (err) {
        console.error("데이터 가져오기 오류:", err);
        setError("자가진단을 진행해 주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect로 글자 순차 출력 로직 추가
  useEffect(() => {
    if (value) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex < value.length) {
          const currentChar =
            value[currentIndex] !== undefined ? value[currentIndex] : ""; // undefined 방지
          setDisplayText((prev) => prev + currentChar);
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setSuccess(true); // 글자가 모두 렌더링되면 success 상태를 true로 설정
        }
      }, 30); // 30ms 간격으로 글자 표시

      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }
  }, [value]);
  if (loading) return <p>분석 결과를 기다리는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className={styles.Ai}>
        <MDEditor.Markdown
          source={displayText ? displayText : "분석결과없음"}
          style={{ backgroundColor: "#f8f8f8", color: "#333" }}
        />
      </div>
      {success ? <AishopComponent /> : <></>}
    </>
  );
};

export default AiAnalyze;
