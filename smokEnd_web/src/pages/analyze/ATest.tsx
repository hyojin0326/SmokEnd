import { useState } from "react";
import GenderTypeChart from "./GenderType";
import GenderKnowledgeChart from "./GenderKnowledge";
import GenderNicotineChart from "./GenderNicotine";
import WeeklySmokingFrequencyChart from "./WeeklySomkingFrequency";
import HourlySmokingFrequencyChart from "./HourlySmokingFrequency";
import PersonalWeeklySmokingFrequency from "../PersonalWeeklySmokingFrequency";
import PersonalHourlySmokingFrequency from "./PersonalHourlySmokingFrequency";
import PersonalSmokingTrend from "../PersonalSmokingTrend";
import AiAnalyze from "../AiAnalyze";

function ATest() {
  return (
    <>
      <br />
      <h1>전체 통계</h1>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>각 성별 별 흡연 습관 분석</h3>
        <GenderTypeChart />
      </div>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>각 성별 별 평균 상식 수준 분석</h3>
        <GenderKnowledgeChart />
      </div>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>각 성별 별 평균 니코틴 의존도 분석</h3>
        <GenderNicotineChart />
      </div>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>전체 사용자의 요일 별 흡연 빈도 분석</h3>
        <WeeklySmokingFrequencyChart />
      </div>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>전체 사용자의 시간대 별 흡연 빈도 분석</h3>
        <HourlySmokingFrequencyChart />
      </div>

      <br />
      <h1>개인 통계</h1>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>로그인 한 사용자의 요일 별 흡연 빈도 분석</h3>
        {/* <PersonalWeeklySmokingFrequency /> */}
      </div>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>로그인 한 사용자의 시간대 별 흡연 빈도 분석</h3>
        <PersonalHourlySmokingFrequency />
      </div>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>로그인 한 사용자의 목표 기간 중 흡연량 변화 추이</h3>
        {/* <PersonalSmokingTrend /> */}
      </div>
      <div style={{ width: "50%", paddingTop: "50px" }}>
        <h3>AI분석</h3>
        <p>
          <i>
            값이 자꾸 튄다는걸 생각해 보면 그냥 참고자료 정도의 위치로 생각하는
            게 좋을 듯
          </i>
        </p>
        {/* <AiAnalyze /> */}
      </div>
    </>
  );
}

export default ATest;
