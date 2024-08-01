import { useState } from "react";
import styles from "../styles/SelfAssessmentComponent.module.css";
import { useNavigate } from "react-router-dom";

function HabitComponent() {
    const [response, setResponse] = useState('');

    const [selectedAnswers, setSelectedAnswers] = useState({
        q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0,
        q7: 0, q8: 0, q9: 0, q10: 0, q11: 0, q12: 0,
        q13: 0, q14: 0, q15: 0, q16: 0, q17: 0, q18: 0,
        q19: 0, q20: 0, q21: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleAnswerChange = (question: string, value: number) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [question]: value,
        });
    };

    const handleEvaluate = async() => {
        if (isLoading) {
            alert("평가 중입니다.");
            return;
        }
        // 모든 질문에 대한 답변이 선택되었는지 확인
        const allAnswered = Object.values(selectedAnswers).every(answer => answer !== 0);

        if (allAnswered) {
            setIsLoading(true);
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

            await fetch(`http://${import.meta.env.VITE_URL_API}/api/diagnosis/habit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    selectedAnswers: selectedAnswers
                })
            }).then(async response => {
                if (response.status === 200) { // 성공

                    const resData = await response.json(); // 데이터가 json형태로 답깁니다
                    setResponse(resData);
                    alert("평가가 완료되었습니다.")

                    navigate('/selfAssessment/result?type=Habit', { state: { response_Habit: resData } });

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
                <p className={styles.title}>나의 흡연습관 평가</p>
                <p className={styles.description}>모두 동일한 담배를 피우고 있기는 하지만 담배를 피워서 얻고자 하는 효과는 흡연자마다 다릅니다. 지금 당신이 담배를 피우고 있는 이유는 무엇일까요? 나도 모르고 있는 나의 흡연습관을 다음의 평가를 통해서 알려드립니다.<br />
                    다음 질문에 답한 후 A~G의 그룹별로 점수를 합산합니다. 각 항목 중 총점이 10점 이상인 그룹이 내가 해당하는 흡연유형이므로 어떤 습관과 유형을 가지는지 알아봅시다.</p>
                <p className={styles.note}>* 전체 질문에 답변을 체크해야 결과를 볼 수 있습니다.</p>

                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2}>흡연<br />유형</th>
                            <th rowSpan={2}>질문</th>
                            <th>매우<br />그렇지<br />않다</th>
                            <th>그렇지<br />않다</th>
                            <th>보통이다</th>
                            <th>그렇다</th>
                            <th>매우<br />그렇다</th>
                        </tr>
                        <tr>
                            <th className={styles.habit_top}>1점</th>
                            <th className={styles.habit_top}>2점</th>
                            <th className={styles.habit_top}>3점</th>
                            <th className={styles.habit_top}>4점</th>
                            <th className={styles.habit_top}>5점</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th rowSpan={3} className={styles.habit_left}>A</th>
                            <td className={styles.habit_center}>마음이 조급할 때 여유를 가지기 위해 피운다.</td>
                            <td className={styles.habit_right}>
                                <input type="radio" name="q1" value="1" onChange={() => handleAnswerChange("q1", 1)} />
                            </td>
                            <td className={styles.habit_right}>
                                <input type="radio" name="q1" value="2" onChange={() => handleAnswerChange("q1", 2)} />
                            </td>
                            <td className={styles.habit_right}>
                                <input type="radio" name="q1" value="3" onChange={() => handleAnswerChange("q1", 3)} />
                            </td>
                            <td className={styles.habit_right}>
                                <input type="radio" name="q1" value="4" onChange={() => handleAnswerChange("q1", 4)} />
                            </td>
                            <td className={styles.habit_right}>
                                <input type="radio" name="q1" value="5" onChange={() => handleAnswerChange("q1", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>능률을 높이기 위해 피운다.</td>
                            <td>
                                <input type="radio" name="q2" value="1" onChange={() => handleAnswerChange("q2", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q2" value="2" onChange={() => handleAnswerChange("q2", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q2" value="3" onChange={() => handleAnswerChange("q2", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q2" value="4" onChange={() => handleAnswerChange("q2", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q2" value="5" onChange={() => handleAnswerChange("q2", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>기분전환을 하려고 피운다.</td>
                            <td>
                                <input type="radio" name="q3" value="1" onChange={() => handleAnswerChange("q3", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q3" value="2" onChange={() => handleAnswerChange("q3", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q3" value="3" onChange={() => handleAnswerChange("q3", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q3" value="4" onChange={() => handleAnswerChange("q3", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q3" value="5" onChange={() => handleAnswerChange("q3", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3} className={styles.habit_left}>B</th>
                            <td className={styles.habit_center}>담배, 라이터, 성냥 등을 만지작거리는 버릇이 있다.</td>
                            <td>
                                <input type="radio" name="q4" value="1" onChange={() => handleAnswerChange("q4", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q4" value="2" onChange={() => handleAnswerChange("q4", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q4" value="3" onChange={() => handleAnswerChange("q4", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q4" value="4" onChange={() => handleAnswerChange("q4", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q4" value="5" onChange={() => handleAnswerChange("q4", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>담배를 꺼내 불을 붙이고 연기를 들여마셨다가 내뿜고 재떨이에 비벼 끄는 과정 자체가 좋다.</td>
                            <td>
                                <input type="radio" name="q5" value="1" onChange={() => handleAnswerChange("q5", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q5" value="2" onChange={() => handleAnswerChange("q5", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q5" value="3" onChange={() => handleAnswerChange("q5", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q5" value="4" onChange={() => handleAnswerChange("q5", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q5" value="5" onChange={() => handleAnswerChange("q5", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>담배 연기로 모양을 만드는 것을 좋아한다.</td>
                            <td>
                                <input type="radio" name="q6" value="1" onChange={() => handleAnswerChange("q6", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q6" value="2" onChange={() => handleAnswerChange("q6", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q6" value="3" onChange={() => handleAnswerChange("q6", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q6" value="4" onChange={() => handleAnswerChange("q6", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q6" value="5" onChange={() => handleAnswerChange("q6", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3} className={styles.habit_left}>C</th>
                            <td className={styles.habit_center}>담배를 피우면 마음이 가라앉는다.</td>
                            <td>
                                <input type="radio" name="q7" value="1" onChange={() => handleAnswerChange("q7", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q7" value="2" onChange={() => handleAnswerChange("q7", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q7" value="3" onChange={() => handleAnswerChange("q7", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q7" value="4" onChange={() => handleAnswerChange("q7", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q7" value="5" onChange={() => handleAnswerChange("q7", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>담배 연기를 내뿜으면 나른한 행복감을 느낄 수 있다.</td>
                            <td>
                                <input type="radio" name="q8" value="1" onChange={() => handleAnswerChange("q8", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q8" value="2" onChange={() => handleAnswerChange("q8", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q8" value="3" onChange={() => handleAnswerChange("q8", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q8" value="4" onChange={() => handleAnswerChange("q8", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q8" value="5" onChange={() => handleAnswerChange("q8", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>마음이 편안할 때면 담배 생각이 더 난다.</td>
                            <td>
                                <input type="radio" name="q9" value="1" onChange={() => handleAnswerChange("q9", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q9" value="2" onChange={() => handleAnswerChange("q9", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q9" value="3" onChange={() => handleAnswerChange("q9", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q9" value="4" onChange={() => handleAnswerChange("q9", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q9" value="5" onChange={() => handleAnswerChange("q9", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3} className={styles.habit_left}>D</th>
                            <td className={styles.habit_center}>흥분하거나 화가 났을 때 담배를 찾게 된다.</td>
                            <td>
                                <input type="radio" name="q10" value="1" onChange={() => handleAnswerChange("q10", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q10" value="2" onChange={() => handleAnswerChange("q10", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q10" value="3" onChange={() => handleAnswerChange("q10", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q10" value="4" onChange={() => handleAnswerChange("q10", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q10" value="5" onChange={() => handleAnswerChange("q10", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>불안하고 긴장되면 담배를 피우게 된다.</td>
                            <td>
                                <input type="radio" name="q11" value="1" onChange={() => handleAnswerChange("q11", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q11" value="2" onChange={() => handleAnswerChange("q11", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q11" value="3" onChange={() => handleAnswerChange("q11", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q11" value="4" onChange={() => handleAnswerChange("q11", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q11" value="5" onChange={() => handleAnswerChange("q11", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>마음이 울적하거나 걱정거리가 있을 때 담배를 피운다.</td>
                            <td>
                                <input type="radio" name="q12" value="1" onChange={() => handleAnswerChange("q12", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q12" value="2" onChange={() => handleAnswerChange("q12", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q12" value="3" onChange={() => handleAnswerChange("q12", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q12" value="4" onChange={() => handleAnswerChange("q12", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q12" value="5" onChange={() => handleAnswerChange("q12", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3} className={styles.habit_left}>E</th>
                            <td className={styles.habit_center}>담배가 떨어지면 안절부절못한다.</td>
                            <td>
                                <input type="radio" name="q13" value="1" onChange={() => handleAnswerChange("q13", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q13" value="2" onChange={() => handleAnswerChange("q13", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q13" value="3" onChange={() => handleAnswerChange("q13", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q13" value="4" onChange={() => handleAnswerChange("q13", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q13" value="5" onChange={() => handleAnswerChange("q13", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>아무리 바빠도 담배를 거르면 마음 한구석에 담배 생각이 난다.</td>
                            <td>
                                <input type="radio" name="q14" value="1" onChange={() => handleAnswerChange("q14", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q14" value="2" onChange={() => handleAnswerChange("q14", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q14" value="3" onChange={() => handleAnswerChange("q14", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q14" value="4" onChange={() => handleAnswerChange("q14", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q14" value="5" onChange={() => handleAnswerChange("q14", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>오랫동안 안 피우다가 한 대 피우면 그 순간 불안했던 마음이 사라진다.</td>
                            <td>
                                <input type="radio" name="q15" value="1" onChange={() => handleAnswerChange("q15", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q15" value="2" onChange={() => handleAnswerChange("q15", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q15" value="3" onChange={() => handleAnswerChange("q15", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q15" value="4" onChange={() => handleAnswerChange("q15", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q15" value="5" onChange={() => handleAnswerChange("q15", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3} className={styles.habit_left}>F</th>
                            <td className={styles.habit_center}>자신도 모르는 사이에 담배를 물고 있는 것을 발견하곤 한다.</td>
                            <td>
                                <input type="radio" name="q16" value="1" onChange={() => handleAnswerChange("q16", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q16" value="2" onChange={() => handleAnswerChange("q16", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q16" value="3" onChange={() => handleAnswerChange("q16", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q16" value="4" onChange={() => handleAnswerChange("q16", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q16" value="5" onChange={() => handleAnswerChange("q16", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>특정한 장소(화장실 등)에서는 담배가 당기지 않는데도 흡연하게 된다.</td>
                            <td>
                                <input type="radio" name="q17" value="1" onChange={() => handleAnswerChange("q17", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q17" value="2" onChange={() => handleAnswerChange("q17", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q17" value="3" onChange={() => handleAnswerChange("q17", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q17" value="4" onChange={() => handleAnswerChange("q17", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q17" value="5" onChange={() => handleAnswerChange("q17", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>특정한 상황(식사 후 등)에서는 담배가 당기지 않는데도 흡연하게 된다.</td>
                            <td>
                                <input type="radio" name="q18" value="1" onChange={() => handleAnswerChange("q18", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q18" value="2" onChange={() => handleAnswerChange("q18", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q18" value="3" onChange={() => handleAnswerChange("q18", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q18" value="4" onChange={() => handleAnswerChange("q18", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q18" value="5" onChange={() => handleAnswerChange("q18", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3} className={styles.habit_left}>G</th>
                            <td className={styles.habit_center}>주위 사람들이 흡연하면 나도 담배를 피운다.</td>
                            <td>
                                <input type="radio" name="q19" value="1" onChange={() => handleAnswerChange("q19", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q19" value="2" onChange={() => handleAnswerChange("q19", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q19" value="3" onChange={() => handleAnswerChange("q19", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q19" value="4" onChange={() => handleAnswerChange("q19", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q19" value="5" onChange={() => handleAnswerChange("q19", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>동료/친구들과 함께 흥겨운 시간을 보낼때 흡연하게 된다.</td>
                            <td>
                                <input type="radio" name="q20" value="1" onChange={() => handleAnswerChange("q20", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q20" value="2" onChange={() => handleAnswerChange("q20", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q20" value="3" onChange={() => handleAnswerChange("q20", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q20" value="4" onChange={() => handleAnswerChange("q20", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q20" value="5" onChange={() => handleAnswerChange("q20", 5)} />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.habit_center}>나는 친구들과 회식이나 모임을 할 때 항상 흡연한다.</td>
                            <td>
                                <input type="radio" name="q21" value="1" onChange={() => handleAnswerChange("q21", 1)} />
                            </td>
                            <td>
                                <input type="radio" name="q21" value="2" onChange={() => handleAnswerChange("q21", 2)} />
                            </td>
                            <td>
                                <input type="radio" name="q21" value="3" onChange={() => handleAnswerChange("q21", 3)} />
                            </td>
                            <td>
                                <input type="radio" name="q21" value="4" onChange={() => handleAnswerChange("q21", 4)} />
                            </td>
                            <td>
                                <input type="radio" name="q21" value="5" onChange={() => handleAnswerChange("q21", 5)} />
                            </td>
                        </tr>


                    </tbody>
                </table>
                <p className={styles.source}>&lt; 출처 &gt;</p>
                <p className={styles.source}>- 청소년 금연동기유발프로그램 END, 보건복지부, 한국건강증진재단, p18</p>
                <div className={styles.button}>
                    <button onClick={handleEvaluate} className={`${styles.evaluateButton} ${isMobile ? 'active' : ''}`}>평가하기</button>
                </div>


            </div>
        </>
    );
}

export default HabitComponent;