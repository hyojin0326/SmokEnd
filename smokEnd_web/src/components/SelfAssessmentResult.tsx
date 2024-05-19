import { useEffect, useState } from "react";
import styles from "../styles/SelfAssessmentComponent.module.css";
import { useLocation } from "react-router-dom";

interface EvaluationResult {
    value: number;
    head: string;
}

const SelfAssessmentResult: React.FC = () => {
    // useLocation 훅을 사용하여 location 객체를 가져옴
    const location = useLocation();

    // 전달된 평가 결과를 받아옴
    const { evaluationResult } = location.state as { evaluationResult: EvaluationResult };

    // 평가 결과를 콘솔에 출력
    console.log("평가 결과:", evaluationResult);

    return (
        <div className={styles.Content}>
            <div className={styles.top} />
            <p className={styles.title}>평가결과</p>
            <table style={{marginBottom: "10vw"}}>
                <thead>
                    <tr>
                        <th>{evaluationResult.head}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{evaluationResult.value}</td>
                    </tr>

                </tbody>
            </table>

        </div>
    );
  };
export default SelfAssessmentResult;