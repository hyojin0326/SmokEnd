/**
 * AI 분석 결과를 표시합니다
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";

import styles from "../styles/Ai.module.css";

const AiAnalyze = () => {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>분석 결과를 기다리는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className={styles.Ai}>
        <MDEditor.Markdown
          source={value ? value : "분석결과없음"}
          style={{ backgroundColor: "#f8f8f8", color: "#333" }}
        />
      </div>
    </>
  );
};

export default AiAnalyze;
