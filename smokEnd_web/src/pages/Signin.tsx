import { useState } from "react";
import styles from "../styles/Signin.module.css";
import styled from "styled-components";
import NaverLogo from "../assets/logo/naverLogo.jpeg";
import KakaoLogo from "../assets/logo/kakaoLogo.png";
import GoogleLogo from "../assets/logo/googleLogo.png";

interface FormData {
    email: string;
    password: string;
    remember_me: boolean;
  }

function Signin(){
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        remember_me: false,
    });

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
    
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            setEmailError("유효한 이메일을 입력하세요.");
        return;
        }

        try {
            // form 데이터를 서버로 보내는 로직
            console.log(formData);
        } catch (e) {
            // 에러 처리
        }
    }

  const validateEmail = (email: string): boolean => {
    // 간단한 이메일 형식 유효성 검사를 수행하는 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    return(
        <>
         <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css" rel="stylesheet" />
        <div className={styles.MainContent}>
            <div className={styles.signin}>
                <div className={styles.logo}>
                    <p>Smok<span>E</span>nd</p>
                </div>
                <div className={styles.login}>
                    <form onSubmit={onSubmit}>
                        <input className={styles.input} type="text" name="email" value={email} onChange={onChange} placeholder="이메일을 입력하세요" required/>
                        {emailError && <p className={styles.emailError}>{emailError}</p>}
                        <input className={styles.input} type="password" name="password" value={password}  onChange={onChange} placeholder="비밀번호를 입력하세요" required/>
                        <label htmlFor="chk" className={styles.check_p}>
                        <input type="checkbox" id="chk" className={styles.check} name="remember_me" checked={remember_me} onChange={onChange}/>
                        로그인 유지
                        </label>
                        <button>로그인</button>
                        <div className={styles.joinOrfind}>
                            <span>회원가입</span>|<span>비밀번호 찾기</span>
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