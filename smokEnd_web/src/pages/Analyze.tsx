import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "../styles/Analyze.module.css";
import AnalyzeHeader from "../components/analyzeHeader";
import PersonalSmokingTrend from "./PersonalSmokingTrend";
import PersonalWeeklySmokingFrequency from "./PersonalWeeklySmokingFrequency";
import AiAnalyze from "./AiAnalyze";

function Analyze() {
  const [isAiAnalyzeVisible, setAiAnalyzeVisible] = useState(false);

  const toggleAiAnalyze = () => {
    setAiAnalyzeVisible(!isAiAnalyzeVisible);
  };

  return (
    <>
      <div className={styles.momBox}>
        <div className={styles.left}>
          <AnalyzeHeader />
        </div>
        <div className={styles.rightBox}>
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
                    <div className={styles.cahrName}>
                      나의 요일 별 흡연 빈도
                    </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analyze;
