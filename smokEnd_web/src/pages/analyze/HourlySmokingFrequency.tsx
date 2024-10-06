/**
 * 전체 사용자의 시간대별 흡연 현황을 표시합니다
 */
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { ChartData } from 'chart.js';

// Chart.js에 필요한 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    fill: boolean;
    tension: number;
  }[];
}

const HourlySmokingFrequencyChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ChartResponse>('http://localhost:8080/api/analyze/HourlySomkingFrequency'); // 실제 서버 주소로 변경
        setChartData(response.data);
      } catch (err) {
        console.error('데이터 가져오기 오류:', err);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 그래프 옵션 설정
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // 범례 위치
      },
      title: {
        display: true,
        text: '시간대 별 평균 흡연량 분석', // 그래프 제목
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '시간대', // x축 제목
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '평균 흡연량 (개비)', // y축 제목
        },
        ticks: {
          stepSize: 1, // y축 간격
        },
      },
    },
    animation: {
      duration: 1000, // 애니메이션 지속 시간 (ms)
      easing: 'easeOutBounce', // 애니메이션 이징 효과
    },
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return chartData ? <Line data={chartData} options={options} /> : <p>데이터가 없습니다.</p>;
};

export default HourlySmokingFrequencyChart;
