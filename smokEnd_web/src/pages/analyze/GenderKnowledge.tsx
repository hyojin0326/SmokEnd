/**
 * 성별 별 평균 지식 수준을 표시합니다
 */
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
import { ChartData } from "chart.js";

// Chart.js에 필요한 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GenderKnowledgeChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<
    "bar",
    number[],
    string
  > | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/analyze/genderKnowledge"
        ); // 실제 서버 주소로 변경
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
      },
      title: {
        display: true,
        text: "각 성별 별 평균 상식 수준", // 그래프 제목
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "상식 수준 (점수)", // y축 제목
        },
        ticks: {
          stepSize: 10, // y축 간격
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
    <Bar data={chartData} options={options} />
  ) : (
    <p>데이터가 없습니다.</p>
  );
};

export default GenderKnowledgeChart;
