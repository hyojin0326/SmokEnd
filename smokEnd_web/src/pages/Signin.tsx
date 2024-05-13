import { useState } from "react";
import styles from "../styles/Signin.module.css";
import styled from "styled-components";
import NaverLogo from "../assets/logo/naverLogo.jpeg";
import KakaoLogo from "../assets/logo/kakaoLogo.png";
import GoogleLogo from "../assets/logo/googleLogo.png";
import { Link } from "react-router-dom";

interface FormData {
    email: string;
    password: string;
    remember_me: boolean;
}
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

function Signin() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        remember_me: false,
    });
    const [response, setResponse] = useState('');

    const { email, password, remember_me } = formData;
    const [emailError, setEmailError] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
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

        await fetch('https://express-e76gdpmm5q-uc.a.run.app/w/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(async response => {
            if (response.status === 200) {
                // 로그인 성공
                const resData = await response.json();
                setResponse(JSON.stringify(resData));
                console.log('로그인 성공:', resData);
                alert("로그인 성공");
                window.location.href = '/';
                return resData;

            } else if (response.status === 403) {
                // 이메일 인증 안함 OR 비밀번호 다름
                const resData = await response.text();
                setResponse(resData);
                console.log('로그인 실패:', resData);
                alert(resData);
                return response.text();

            } else if (response.status === 404) {
                // 가입된 메일 없음
                const resData = await response.text();
                setResponse(resData);
                console.log('로그인 실패:', resData);
                alert(resData);
                return response.text();

            } else if (response.status === 500) {
                // 에러
                const resData = await response.text();
                setResponse(resData);
                console.log('서버 에러:', resData);
                return response.text();

            } else {
                // 여기 있는거 실행되면 매우 큰 문제가 있는거임
                console.log('???');

            }
        }).then(result => {
            // 쿠키 만들기
            if (result && result.sessionId) {
                console.log("쿠키생성");
                if (result.remember_me) {
                    // remember_me가 true이면 쿠키의 유효기간을 더 길게 설정
                    const now = new Date();
                    const expirationDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
                    document.cookie = `sessionId=${result.sessionId}; expires=${expirationDate.toUTCString()};`;
                } else {
                    document.cookie = `sessionId=${result.sessionId}`;
                }
            } else {
                // 로그인 실패시 동작
                console.log('로그인 실패')
            }
        }).catch(err => {

        })
    };

    const validateEmail = (email: string): boolean => {
        // 간단한 이메일 형식 유효성 검사를 수행하는 정규 표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <>
            <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css" rel="stylesheet" />
            <div className={styles.MainContent}>
                <div className={styles.signin}>
                    <div className={styles.logo}>
                        <Link to="/" className={styles.Link}><p>Smok<span>E</span>nd</p></Link>
                    </div>
                    <div className={styles.login}>
                        <form onSubmit={onSubmit}>
                            <input className={styles.input} type="text" name="email" value={email} onChange={onChange} placeholder="이메일을 입력하세요" required />
                            {emailError && <p className={styles.emailError}>{emailError}</p>}
                            <input className={styles.input} type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호를 입력하세요" required />
                            <label htmlFor="chk" className={styles.check_p}>
                                <input type="checkbox" id="chk" className={styles.check} name="remember_me" checked={remember_me} onChange={onChange} />
                                로그인 유지
                            </label>
                            <button>로그인</button>
                            <div className={styles.joinOrfind}>
                                <span><Link to="/signup" className={styles.Link}>회원가입</Link></span>|<span><Link to="/findpw" className={styles.Link}>비밀번호 찾기</Link></span>
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

export default Signin;