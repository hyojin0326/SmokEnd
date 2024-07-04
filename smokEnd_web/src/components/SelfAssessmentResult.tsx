import { useEffect, useState } from "react";
import styles from "../styles/SelfAssessmentComponent.module.css";
import { useLocation } from "react-router-dom";

interface ResponseItem_Knowledge {
    no: number;
    answer: string;
    description: string;
}
// interface ResponseItem_Nicotine {
//     title: string;
//     value: string;
// }

// interface LocationState {
//     response_Knowledge?: ResponseItem_Knowledge[];
//     response_Nicotine?: ResponseItem_Nicotine;
// }

const SelfAssessmentResult: React.FC = () => {
    const location = useLocation();
    const { response_Knowledge, response_Nicotine, response_Habit } = location.state || {};
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

            {type === 'Knowledge' && response_Knowledge && response_Knowledge.length > 0 ? (
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
                            {response_Knowledge.map((item: ResponseItem_Knowledge, index: number) => (
                                <tr key={index}>
                                    <td style={{ textAlign: "center" }}>{item.no}</td>
                                    <td style={{ textAlign: "center", width: "3vw", color: item.answer === "정답" ? "blue" : "red" }}> {item.answer} </td>
                                    <td>{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div></div>
            )}

            {type === 'Nicotine' ? (
                <div>
                    <p className={styles.title}>평가결과 - 니코틴 의존도 진단</p>
                    <table style={{ marginBottom: "30vw" }}>
                        <thead>
                            <tr>
                                <th>{response_Nicotine.title}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{response_Nicotine.value}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            ) : (
                <div></div>
            )}
            {type === 'Habit' ? (
                <div>
                    <p className={styles.title}>평가결과 - 나의 흡연 습관 평가</p>
                    <table style={{ marginBottom: "30vw" }}>
                        <thead>
                            <tr>
                                <th>{response_Habit.title}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{response_Habit.value}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            ) : (
                <div></div>
            )}

        </div>
    );
};
export default SelfAssessmentResult;