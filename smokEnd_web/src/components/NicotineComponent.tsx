import { useState } from "react";
import styles from "../styles/SelfAssessmentComponent.module.css";
import { useNavigate } from "react-router-dom";

function NicotionComponent() {
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
    });
    const navigate = useNavigate();

    const handleAnswerChange = (question:string, value:number) => {
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
        const allAnswered = Object.values(selectedAnswers).every(answer => answer !== null);
    
        if (allAnswered) {
            setIsLoading(true);
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

            await fetch(`http://${import.meta.env.VITE_URL_API}/api/diagnosis/nicotine`, {
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
                    console.log(resData);
                    navigate('/selfAssessment/result?type=Nicotine', { state: { response_Nicotine: resData } });
        
                } else if(response.status === 500) { // 서버 에러
        
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
                <p className={styles.title}>니코틴 의존도 평가</p>
                <p className={styles.description}>담배를 끊기 어려운 이유는 니코틴에 이미 중독되었기 때문입니다. 흡연기간과 흡연량에 따라 정도의 차이는 있겠지만, 다음 평가로 니코틴 의존 정도를 점검해 보세요.</p>
                <p className={styles.note}>* 전체 질문에 답변을 체크해야 결과를 볼 수 있습니다.</p>

                <table>
                    <thead>
                        <tr>
                            <th>질문</th>
                            <th>응답범주</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td className={styles.left}>⑴ 하루에 보통 몇 개비나 피우십니까?</td>
                            <td className={styles.right}>
                                <input type="radio" id="q1_1" name="q1" onChange={() => handleAnswerChange("q1", 0)}/>
                                <label htmlFor="q1_1">10개비 이하</label>
                                <input type="radio" id="q1_2" name="q1" onChange={() => handleAnswerChange("q1", 1)}/>
                                <label htmlFor="q1_2">11~20개비</label><br/>
                                <input type="radio" id="q1_3" name="q1" onChange={() => handleAnswerChange("q1", 2)}/>
                                <label htmlFor="q1_3">21~30개비</label>
                                <input type="radio" id="q1_4" name="q1" onChange={() => handleAnswerChange("q1", 3)} />
                                <label htmlFor="q1_4">31개비 이상</label>
                            </td>
                        </tr>
                        <tr>
                            <td>⑵ 아침에 일어나서 얼마 만에 첫 담배를 피우십니까?</td>
                            <td>
                                <input type="radio" id="q2_1" name="q2" onChange={() => handleAnswerChange("q2", 0)}/>
                                <label htmlFor="q2_1">1시간 이후</label>
                                <input type="radio" id="q2_2" name="q2" onChange={() => handleAnswerChange("q2", 1)}/>
                                <label htmlFor="q2_2">31분~1시간 사이</label><br/>
                                <input type="radio" id="q2_3" name="q2" onChange={() => handleAnswerChange("q2", 2)}/>
                                <label htmlFor="q2_3">6~30분 사이</label>
                                <input type="radio" id="q2_4" name="q2" onChange={() => handleAnswerChange("q2", 3)}/>
                                <label htmlFor="q2_4">5분 이내</label>
                            </td>
                        </tr>
                        <tr>
                            <td>⑶ 금연구역(도서관, 극장, 병원 등)에서 담배를 참기가 어렵습니까?</td>
                            <td>
                                <input type="radio" id="q3_1" name="q3" onChange={() => handleAnswerChange("q3", 1)}/>
                                <label htmlFor="q3_1">예</label>
                                <input type="radio" id="q3_2" name="q3" onChange={() => handleAnswerChange("q3", 0)}/>
                                <label htmlFor="q3_2">아니오</label><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>⑷ 하루 중 담배 맛이 가장 좋은 때는 언제입니까?</td>
                            <td>
                                <input type="radio" id="q4_1" name="q4" onChange={() => handleAnswerChange("q4", 1)}/>
                                <label htmlFor="q4_1">아침 첫 담배</label>
                                <input type="radio" id="q4_2" name="q4" onChange={() => handleAnswerChange("q4", 0)}/>
                                <label htmlFor="q4_2">그 외의 담배</label><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>⑸ 오후와 저녁시간보다 오전 중에 담배를 더 자주 피우십니까?</td>
                            <td>
                                <input type="radio" id="q5_1" name="q5" onChange={() => handleAnswerChange("q5", 1)}/>
                                <label htmlFor="q5_1">예</label>
                                <input type="radio" id="q5_2" name="q5" onChange={() => handleAnswerChange("q5", 0)} />
                                <label htmlFor="q5_2">아니오</label><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>⑹ 몸이 아파 하루 종일 누워있을 때에도 담배를 피우십니까?</td>
                            <td>
                                <input type="radio" id="q6_1" name="q6" onChange={() => handleAnswerChange("q6", 1)}/>
                                <label htmlFor="q6_1">예</label>
                                <input type="radio" id="q6_2" name="q6" onChange={() => handleAnswerChange("q6", 0)} />
                                <label htmlFor="q6_2">아니오</label><br/>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <p className={styles.source}>&lt; 출처 &gt;</p>
                <p className={styles.source}>- FTND－K(Fagerstrom Test for Nicotine Dependence).</p>
                <div className={styles.button}>
                    <button onClick={handleEvaluate} className={`${styles.evaluateButton} ${isMobile ? 'active' : ''}`}>평가하기</button>
                </div>
                

            </div>
        </>
    );
}

export default NicotionComponent;