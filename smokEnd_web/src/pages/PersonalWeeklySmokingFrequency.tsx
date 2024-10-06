/**
 * 로그인한 사용자의 요일별 흡연 현황을 표시합니다
 */
import styles from "../styles/PersonalSmokingTrend.module.css";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 인터페이스 정의
interface ChartResponse {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const PersonalWeeklySmokingFrequency: React.FC = () => {
  const [chartData, setChartData] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );
        const response = await axios.get<ChartResponse>(
          `http://localhost:8080/api/analyze/personal/weeklySmokingFrequency/${token}`
        );
        setChartData(response.data);
      } catch (err) {
        console.error("데이터 가져오기 오류:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 그래프 옵션 설정
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // 범례 위치
        labels: {
          color: "black", // 범례 글자 색상
          font: {
            size: 16, // 범례 글자 크기
          },
        },
      },
      title: {
        display: true,
        text: "요일 별 평균 흡연 횟수", // 그래프 제목
        color: "black", // 제목 글자 색상
        font: {
          size: 17, // 제목 글자 크기
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "요일", // x축 제목
          color: "black", // x축 제목 글자 색상
          font: {
            size: 16, // x축 제목 글자 크기
          },
        },
        ticks: {
          color: "black", // x축 글자 색상
          font: {
            size: 14, // x축 글자 크기
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "평균 흡연 횟수", // y축 제목
          color: "black", // y축 제목 글자 색상
          font: {
            size: 16, // y축 제목 글자 크기
          },
        },
        ticks: {
          stepSize: 1, // y축 간격
          color: "black", // y축 글자 색상
          font: {
            size: 14, // y축 글자 크기
          },
        },
      },
    },
    animation: {
      duration: 1000, // 애니메이션 지속 시간 (ms)
      easing: "easeOutBounce", // 애니메이션 이징 효과
    },
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return chartData ? (
    <div className={styles.chartContainer}>
      <Bar data={chartData} options={options} />
    </div>
  ) : (
    <p>데이터가 없습니다.</p>
  );
};

export default PersonalWeeklySmokingFrequency;
