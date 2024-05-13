import { useState } from "react";
import styles from "../styles/Findpw.module.css";
import styled from "styled-components";
import NaverLogo from "../assets/logo/naverLogo.jpeg";
import KakaoLogo from "../assets/logo/kakaoLogo.png";
import GoogleLogo from "../assets/logo/googleLogo.png";
import { Link } from "react-router-dom";

const SocialLogo = styled.div`
        width:4vw;
        height:4vw;
        margin: 0 4vw;
        border-radius: 50%;
        background-size:cover;
        background-repeat: no-repeat;
        background-position: center;
        @media (max-width: 768px) {
            width:8vw;
            height:8vw;
            margin: 0 6vw;
        }
    `;
interface FormData {
    email: string;
}
function Findpw() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
    });
    const [response, setResponse] = useState('');
    const {email} = formData;
    const [emailError, setEmailError] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === "email") {
            validateEmail(value);
        } else {
            // 다른 input 필드의 값이 변경될 때, 이전에 표시된 에러 메시지를 숨깁니다.
            setEmailError("");
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            setEmailError("유효한 이메일을 입력하세요.");
            return;
        }

        await fetch(`https://express-e76gdpmm5q-uc.a.run.app/resetpw?email=${formData.email}`)
            .then(async response => {
                if (response.status === 200) {
                    // 성공시 동작
                    const resData = await response.text();
                    setResponse(resData);
                    alert('비밀번호 재설정 메일이 전송되었습니다.');
                    window.location.href = '/login';
                } else if (response.status === 404) {
                    // 가입된 메일없음
                    const resData = await response.text();
                    setResponse(resData);
                    alert('가입된 메일이 없습니다.');
                } else if (response.status === 500) {
                    const resData = await response.text();
                    setResponse(resData);
                    console.log("서버 에러");
                }
            });
    }

    const validateEmail = (email: string): boolean => {
        // 간단한 이메일 형식 유효성 검사를 수행하는 정규 표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <>
            <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css" rel="stylesheet" />
            <div className={styles.MainContent}>
                <div className={styles.findpw}>
                    <div className={styles.logo}>
                        <Link to="/" className={styles.Link}><p>Smok<span>E</span>nd</p></Link>
                    </div>
                    <div className={styles.findpwForm}>
                        <form onSubmit={onSubmit}>
                            <input className={styles.input} type="text" name="email" value={email} onChange={onChange} placeholder="이메일을 입력하세요" required />
                            {emailError && <p className={styles.emailError}>{emailError}</p>}
                            <button>비밀번호 찾기</button>
                            <div className={styles.loginOrSignup}>
                                <span><Link to="/login" className={styles.Link}>로그인</Link></span>|<span><Link to="/signup" className={styles.Link}>회원가입</Link></span>
                            </div>
                        </form>

                    </div>
                    <div className={styles.social}>
                        <div className={styles.social_name}>간편 로그인</div>

                    </div>
                    <div className={styles.social_Login}>
                        <SocialLogo style={{ backgroundImage: `url(${NaverLogo})` }} />
                        <SocialLogo style={{ backgroundImage: `url(${KakaoLogo})` }} />
                        <SocialLogo style={{ backgroundImage: `url(${GoogleLogo})` }} />
                    </div>
                </div>

            </div>
        </>
    );
}

export default Findpw;