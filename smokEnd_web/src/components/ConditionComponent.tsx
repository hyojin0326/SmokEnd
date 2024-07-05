import { useState } from "react";
import styles from "../styles/SelfAssessmentComponent.module.css";
import { useNavigate } from "react-router-dom";

function ConditionComponent() {
    const navigate = useNavigate();

    const [selectedAnswers, setSelectedAnswers] = useState({
        q1: null, q2: null, q3: null, q4: null, q5: null,
        q6: null, q7: null
    });

    const handleAnswerChange = (question: string, value: number) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [question]: value,
        });
    };

    const handleEvaluate = () => {
        // 모든 질문에 대한 답변이 선택되었는지 확인
        const allAnswered = Object.values(selectedAnswers).every(answer => answer !== null);

        if (allAnswered) {
            alert("평가가 완료되었습니다!");
            //하나라도 예가 있으면 true, 아니면 false
            const condition = Object.values(selectedAnswers).every(answer => answer !== 1);
            let evaluationResult;
            if(condition){
                evaluationResult = { "value": "매우 활동적인 신체활동을 시작해도 되지만 명심할 것은 시작은 천천히 점진적으로 이루어져야 한다는 것입니다. 그것이 가장 안전하고 쉬운 방법이기 때문입니다.", "title": "평가결과" };
            }
            else{
                evaluationResult = { "value": '매우 활동적인 신체활동을 시작하기 전이나 체력 평가 전에 의사와 전화통화를 하거나 직접 찾아가 위 설문지에 "예"라고 답한 문항에 대해 상의하고 신체활동을 시작해도 좋은지 확인하여 주시기 바랍니다.', "title": "평가결과" };
            }
            

            // 결과와 함께 SelfAssessmentResult 컴포넌트로 이동
            navigate("/selfAssessment/result?type=Condition", { state: { response_Condition: evaluationResult } });
        } else {
            alert("모든 항목에 답변을 선택해주세요.");
        }
    };

    const isMobile = window.innerWidth <= 768;

    return (
        <>
            <div className={styles.Content}>
                <div className={styles.top} />
                <p className={styles.title}>나의 신체 상태 진단</p>
                {/* <p className={styles.description}>흡연에 대해 어떻게 생각하고 계신가요? 우리가 잘못알고 있던 담배, 오해하고 있는 흡연에 관한 상식 문제입니다. 나도 모르고 있던 나의 흡연에 대한 생각을 아래 설문을 통해 평가해보시기 바랍니다. 다음 각 문항 중 맞다고 생각되는 곳(O 혹은 X)에 체크를 해주시기 바랍니다.</p> */}
                <p className={styles.note}>* 전체 질문에 답변을 체크해야 결과를 볼 수 있습니다.</p>

                <table>
                    <thead>
                        <tr>
                            <th>질문</th>
                            <th>예</th>
                            <th>아니요</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.knowledge_left}>1. 귀하는 의사가 권하는 운동만 하라고 들은 적이 있습니까?</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q1_1" name="q1" value="1" onChange={() => handleAnswerChange("q1", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q1_2" name="q1" value="2" onChange={() => handleAnswerChange("q1", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>2. 귀하는 운동을 할 때 가슴에 통증을 느끼십니까?</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q2_1" name="q2" value="1" onChange={() => handleAnswerChange("q2", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q2_2" name="q2" value="2" onChange={() => handleAnswerChange("q2", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>3. 귀하는 지난 한달 동안 운동을 하지 않은 상태에서 가슴에 통증을 느껴보신적이 있습니까?</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q3_1" name="q3" value="1" onChange={() => handleAnswerChange("q3", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q3_2" name="q3" value="2" onChange={() => handleAnswerChange("q3", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>4. 귀하는 현기증 때문에 균형을 잃거나 의식을 잃어본적이 있습니까?</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q4_1" name="q4" value="1" onChange={() => handleAnswerChange("q4", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q4_2" name="q4" value="2" onChange={() => handleAnswerChange("q4", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>5. 귀하는 운동에 장애가 되는 뼈나 관절에 문제가 있습니까?</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q5_1" name="q5" value="1" onChange={() => handleAnswerChange("q5", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q5_2" name="q5" value="2" onChange={() => handleAnswerChange("q5", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>6. 귀하는 현재 혈압이나 심장질환 때문에 의사가 약을 처방하였습니까?</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q6_1" name="q6" value="1" onChange={() => handleAnswerChange("q6", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q6_2" name="q6" value="2" onChange={() => handleAnswerChange("q6", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>7. 그밖의 귀하가 운동을 해서는 안되는 다른 이유가 있습니까?</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q7_1" name="q7" value="1" onChange={() => handleAnswerChange("q7", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q7_2" name="q7" value="2" onChange={() => handleAnswerChange("q7", 2)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className={styles.source}>&lt; 출처 &gt;</p>
                <p className={styles.source}>- Bock B.C., Marcus B.H., King T.K., Borrelli B., Roberts M.R.(1999). Exercise effects on withdrawal and mood among women<br />
                    attempting smoking cessation. Addict Behav, 24: 399-410.</p>
                <p className={styles.source}>- 국민 암예방수칙 실천지침 (신체활동)</p>
                <div className={styles.button}>
                    <button onClick={handleEvaluate} className={`${styles.evaluateButton} ${isMobile ? 'active' : ''}`}>평가하기</button>
                </div>


            </div>
        </>
    );
}

export default ConditionComponent;