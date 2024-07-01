import { useEffect, useState } from "react";
import styles from "../styles/SelfAssessmentComponent.module.css";
import { useLocation } from "react-router-dom";

interface ResponseItem {
    no: number;
    answer: string;
    description: string;
}

interface LocationState {
    response: ResponseItem[];
}

const SelfAssessmentResult: React.FC = () => {
    const location = useLocation();
    const state = location.state as LocationState;
    const { response } = state || {};
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    // let name = ""; 

    // useEffect(() => {
    //     if (type == "Knowledge")
    //         name = "흡연 상식 점검";
    // }, [type]);
    return (

        <div className={styles.ContentResult}>
            <div className={styles.top} />

            {type === 'Knowledge' && response.length > 0 ? (
                <div>
                    <p className={styles.title}>평가결과 - 나의 흡연 상식 점검</p>
                    <table style={{ marginBottom: "30vw" }}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>답안</th>
                                <th>설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            {response.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: "center" }}>{item.no}</td>
                                    <td style={{ textAlign: "center", width:"3vw", color: item.answer === "정답" ? "blue" : "red" }}> {item.answer} </td>
                                    <td>{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>정확한 데이터를 제공하지 않습니다.</p>
            )}

        </div>
    );
};
export default SelfAssessmentResult;