import { useState } from "react";
import styles from "../styles/SelfAssessmentComponent.module.css"
import { useNavigate } from "react-router-dom";

function KnowledgeComponent() {
    const [response, setResponse] = useState('');
    const [selectedAnswers, setSelectedAnswers] = useState({
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
        q6: 0, q7: 0, q8: 0, q9: 0, q10: 0,
        q11: 0, q12: 0, q13: 0, q14: 0, q15: 0,
        q16: 0, q17: 0, q18: 0, q19: 0, q20: 0,
        q21: 0, q22: 0, q23: 0, q24: 0, q25: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAnswerChange = (question: string, value: number) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [question]: value,
        });
    };

    const handleEvaluate = async () => {
        if (isLoading) {
            alert("평가 중입니다.");
            return;
        }
        // 모든 질문에 대한 답변이 선택되었는지 확인
        const allAnswered = Object.values(selectedAnswers).every(answer => answer !== 0);

        if (allAnswered) {
            setIsLoading(true);
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

            await fetch(`http://${import.meta.env.VITE_URL_API}/api/diagnosis/knowledge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    selectedAnswers: selectedAnswers // state그대로 집어 넣으시는 겁니다
                })
            }).then(async response => {
                if (response.status === 200) { // 성공

                    const resData = await response.json(); // 데이터가 json형태로 답깁니다
                    setResponse(resData);
                    alert("평가가 완료되었습니다.")

                    navigate('/selfAssessment/result?type=Knowledge', { state: { response_Knowledge: resData } });
                } else if (response.status === 500) { // 서버 에러

                    const resData = await response.text();
                    setResponse(resData);
                    console.log(resData);
                }
            })
                .catch(error => {
                    console.log('fetch에러');
                });
        } else {
            setIsLoading(false);
            alert("모든 항목에 답변을 선택해주세요.");
        }
    };

    const isMobile = window.innerWidth <= 768;

    return (
        <>
            <div className={styles.Content}>
                <div className={styles.top} />
                <p className={styles.title}>흡연에 대한 나의 상식점검 평가</p>
                <p className={styles.description}>흡연에 대해 어떻게 생각하고 계신가요? 우리가 잘못알고 있던 담배, 오해하고 있는 흡연에 관한 상식 문제입니다. 나도 모르고 있던 나의 흡연에 대한 생각을 아래 설문을 통해 평가해보시기 바랍니다. 다음 각 문항 중 맞다고 생각되는 곳(O 혹은 X)에 체크를 해주시기 바랍니다.</p>
                <p className={styles.note}>* 전체 질문에 답변을 체크해야 결과를 볼 수 있습니다.</p>

                <table>
                    <thead>
                        <tr>
                            <th>내용</th>
                            <th>O</th>
                            <th>X</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.knowledge_left}>1. 흡연은 건강을 해치는 나쁜 습관이지만 질환은 아니다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q1_1" name="q1" value="1" onChange={() => handleAnswerChange("q1", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q1_2" name="q1" value="2" onChange={() => handleAnswerChange("q1", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>2. 청소년기의 흡연은 성인에 비하여 건강 위해의 심각성을 크게 할 수 있다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q2_1" name="q2" value="1" onChange={() => handleAnswerChange("q2", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q2_2" name="q2" value="2" onChange={() => handleAnswerChange("q2", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>3. 흡연은 폐암을 비롯한 다양한 종류의 암 발생의 원인이 된다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q3_1" name="q3" value="1" onChange={() => handleAnswerChange("q3", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q3_2" name="q3" value="2" onChange={() => handleAnswerChange("q3", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>4. 흡연은 개인에게는 물론 우리 사회의 커다란 경제적 부담을 가져다 준다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q4_1" name="q4" value="1" onChange={() => handleAnswerChange("q4", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q4_2" name="q4" value="2" onChange={() => handleAnswerChange("q4", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>5. 담배와 담배 연기에는 발암물질과 건강에 유해한 화학물질들이 포함되어 있다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q5_1" name="q5" value="1" onChange={() => handleAnswerChange("q5", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q5_2" name="q5" value="2" onChange={() => handleAnswerChange("q5", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>6. 흡연자가 담배 필터를 통해서 들이마시는 연기가 담배가 타들어가면서 나오는 연기보다 더 해롭다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q6_1" name="q6" value="1" onChange={() => handleAnswerChange("q6", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q6_2" name="q6" value="2" onChange={() => handleAnswerChange("q6", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>7. 금연하면 입과 몸에서 나는 나쁜 냄새가 없어지고, 치아가 희고 건강해 진다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q7_1" name="q7" value="1" onChange={() => handleAnswerChange("q7", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q7_2" name="q7" value="2" onChange={() => handleAnswerChange("q7", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>8. 금연한 후 10년이 지나면, 폐암 사망률은 흡연자의 절반 수준이 된다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q8_1" name="q8" value="1" onChange={() => handleAnswerChange("q8", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q8_2" name="q8" value="2" onChange={() => handleAnswerChange("q8", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>9. 간접흡연은 나의 의사와 상관없이 남이 피우는 담배 연기를 들이 마시는 것이다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q9_1" name="q9" value="1" onChange={() => handleAnswerChange("q9", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q9_2" name="q9" value="2" onChange={() => handleAnswerChange("q9", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>10. 간접흡연만으로는 흡연자와 같이 심각한 건강 위해가 발생하지는 않는다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q10_1" name="q10" value="1" onChange={() => handleAnswerChange("q10", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q10_2" name="q10" value="2" onChange={() => handleAnswerChange("q10", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>11. 전자담배는 간접흡연의 피해가 없기 때문에 금연구역에서 피워도 된다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q11_1" name="q11" value="1" onChange={() => handleAnswerChange("q11", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q11_2" name="q11" value="2" onChange={() => handleAnswerChange("q11", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>12. 술자리에서만 가끔씩 흡연하는 것은 니코틴 중독이 아니다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q12_1" name="q12" value="1" onChange={() => handleAnswerChange("q12", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q12_2" name="q12" value="2" onChange={() => handleAnswerChange("q12", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>13. 6개월마다 1개비 정도 흡연하는 것은 금연이다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q13_1" name="q13" value="1" onChange={() => handleAnswerChange("q13", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q13_2" name="q13" value="2" onChange={() => handleAnswerChange("q13", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>14. 흡연은 스트레스 지수를 낮춘다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q14_1" name="q14" value="1" onChange={() => handleAnswerChange("q14", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q14_2" name="q14" value="2" onChange={() => handleAnswerChange("q14", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>15. 금연구역에서 흡연을 하면 5만원의 과태료가 부과된다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q15_1" name="q15" value="1" onChange={() => handleAnswerChange("q15", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q15_2" name="q15" value="2" onChange={() => handleAnswerChange("q15", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>16. 금연실천시 짜고 매운 자극적인 음식을 먹으면 흡연욕구를 완화시켜주는 효과가 있다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q16_1" name="q16" value="1" onChange={() => handleAnswerChange("q16", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q16_2" name="q16" value="2" onChange={() => handleAnswerChange("q16", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>17. 금연한지 하루가 지나면 체내 일산화탄소 수치가 정상으로 낮아지면서 심장마비 가능성도 감소시킨다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q17_1" name="q17" value="1" onChange={() => handleAnswerChange("q17", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q17_2" name="q17" value="2" onChange={() => handleAnswerChange("q17", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>18. 금연을 시작할 때 탄산음료, 커피 등과 같은 카페인이 들어있는 음료를 마시지 않는 것이 좋다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q18_1" name="q18" value="1" onChange={() => handleAnswerChange("q18", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q18_2" name="q18" value="2" onChange={() => handleAnswerChange("q18", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>19. 흡연자의 옷, 피부, 머리카락에 묻어있던 담배의 유해물질도 간접흡연의 영향을 미친다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q19_1" name="q19" value="1" onChange={() => handleAnswerChange("q19", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q19_2" name="q19" value="2" onChange={() => handleAnswerChange("q19", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>20. 부모의 흡연은 자녀의 흡연모델이 될 수 있다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q20_1" name="q20" value="1" onChange={() => handleAnswerChange("q20", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q20_2" name="q20" value="2" onChange={() => handleAnswerChange("q20", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>21. 운동은 금단증상이나 흡연욕구를 완화시키는데 도움이 된다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q21_1" name="q21" value="1" onChange={() => handleAnswerChange("q21", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q21_2" name="q21" value="2" onChange={() => handleAnswerChange("q21", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>22. 니코틴 패치를 붙이면 누구나 쉽게 금연에 성공 할 수 있다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q22_1" name="q22" value="1" onChange={() => handleAnswerChange("q22", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q22_2" name="q22" value="2" onChange={() => handleAnswerChange("q22", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>23. 담배를 한번에 끊는 것보다 천천히 흡연량을 줄여가는 것이 좋다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q23_1" name="q23" value="1" onChange={() => handleAnswerChange("q23", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q23_2" name="q23" value="2" onChange={() => handleAnswerChange("q23", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>24. 가장 좋은 금연방법은 무조건 의지로 참는 것이다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q24_1" name="q24" value="1" onChange={() => handleAnswerChange("q24", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q24_2" name="q24" value="2" onChange={() => handleAnswerChange("q24", 2)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.knowledge_left}>25. 금연실천 시 입이 심심하고 공복감이 느껴질 수 있기 때문에 가능한 좋아하는 음식을 많이 먹는 것이 좋다.</td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q25_1" name="q25" value="1" onChange={() => handleAnswerChange("q25", 1)} />
                            </td>
                            <td className={styles.knowledge_radio}>
                                <input type="radio" id="q25_2" name="q25" value="2" onChange={() => handleAnswerChange("q25", 2)} />
                            </td>
                        </tr>

                    </tbody>
                </table>
                <p className={styles.source}>&lt; 출처 &gt;</p>
                <p className={styles.source}>- ’국민 암예방 수칙“ 실천지침_금연, 보건복지부, 국립암센터, p5</p>
                <div className={styles.button}>
                    <button onClick={handleEvaluate} className={`${styles.evaluateButton} ${isMobile ? 'active' : ''}`}>평가하기</button>
                </div>


            </div>
        </>
    );
}

export default KnowledgeComponent;