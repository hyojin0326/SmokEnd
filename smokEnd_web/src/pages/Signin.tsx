import { useEffect, useState } from "react";
import styles from "../styles/Signin.module.css";
import styled from "styled-components";
import NaverLogo from "../assets/logo/naverLogo.jpeg";
import KakaoLogo from "../assets/logo/kakaoLogo.png";
import GoogleLogo from "../assets/logo/googleLogo.png";
import { Link } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import {
  GoogleAuthProvider,
  User,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

interface FormData {
  email: string;
  password: string;
  remember_me: boolean;
}
const SocialLogo = styled.div`
  width: 4vw;
  height: 4vw;
  margin: 0 4vw;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 768px) {
    width: 8vw;
    height: 8vw;
    margin: 0 6vw;
  }
`;

function Signin() {
  //구글 로그인
  const [userData, setUserData] = useState<User | null>(null);
  //로컬 로그인
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    remember_me: false,
  });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { email, password, remember_me } = formData;
  const [emailError, setEmailError] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
    if (name === "email") {
      validateEmail(value);
    } else {
      // 다른 input 필드의 값이 변경될 때, 이전에 표시된 에러 메시지를 숨깁니다.
      setEmailError("");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setEmailError("유효한 이메일을 입력하세요.");
      return;
    }

    setIsLoading(true);
    if (isLoading) {
      alert("로그인 중입니다.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      ); // 이걸로 로그인
      // if (!userCredential.user.emailVerified) {
      //   alert("이메일 인증이 완료되지 않은 사용자 입니다");
      //   setIsLoading(false);
      //   return;
      // }
      const token = await userCredential.user.getIdToken();
      // 사용자 정보를 받기 위해 서버에 요청을 보냅니다
      await fetch(`http://${import.meta.env.VITE_URL_API}/api/auth/w/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).then(async (response) => {
        setIsLoading(false);
        if (response.status === 200) {
          // 로그인 성공
          const resData = await response.json();
          if (formData.remember_me) {
            const now = new Date();
            const expirationDate = new Date(
              now.getFullYear() + 1,
              now.getMonth(),
              now.getDate()
            );
            document.cookie = `token=${token}; expires=${expirationDate.toUTCString()};`;
            document.cookie = `userStats=${JSON.stringify(
              resData
            )}; expires=${expirationDate.toUTCString()};`;

            localStorage.setItem('Expiration', expirationDate.toUTCString());
          } else {
            document.cookie = `token=${token};`;
            document.cookie = `userStats=${JSON.stringify(resData)};`;
          }
          window.location.href = "/";
        } else if (response.status === 401) {
          // 토큰이 유효하지 않음
          const resData = await response.text();
          console.log("로그인 실패: ", resData);
          alert(resData);
          return;
        } else {
          // 서버 에러
          const resData = await response.text();
          console.log("로그인 실패: ", resData);
          alert(resData);
          return;
        }
      });
    } catch {
      alert("해당 이메일을 가진 사용자가 없거나 비밀번호가 일치하지 않습니다");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      await fetch(`http://${import.meta.env.VITE_URL_API}/api/auth/w/glogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).then(async (response) => {
        if (response.status === 200) {
          // 로그인 성공. 쿠키 만들면 됨
          const resData = await response.json();
          document.cookie = `token=${token};`;
          document.cookie = `userStats=${JSON.stringify(resData)};`;
          window.location.href = "/";
        } else if (response.status === 401) {
          // 토큰 오류
        } else if (response.status === 404) {
          // 회원가입 해야 됨
          document.cookie = `type=google`;
          document.cookie = `token=${token};`;
          window.location.href = "/SocialSignup";
        } else {
          // 에러남
        }
      });
    } catch (error) {
      alert("error");
    }
  };

  const handleKakaoLogin = async () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=dfc81385849e19dc0b2d855a6ccaf98c&redirect_uri=http://localhost:5173/oAuthkakao&response_type=code`;
    window.location.href = kakaoURL;
  };

  const handleNaverLogin = () => {
    //state값 지정해야하는듯?
    const STATE = "false";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      import.meta.env.VITE_NAVER_CLIENT_ID
    }&state=${STATE}&redirect_uri=http://localhost:5173/oAuthNaver`;
    window.location.href = NAVER_AUTH_URL;
    let params = new URL(window.location.href).searchParams;
    let code = params.get("code");
    let state = params.get("state");
  };

  const validateEmail = (email: string): boolean => {
    // 간단한 이메일 형식 유효성 검사를 수행하는 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className={styles.MainContent}>
        <div className={styles.signin}>
          <div className={styles.logo}>
            <Link to="/" className={styles.Link}>
              <p>LOGIN</p>
            </Link>
          </div>
          <div className={styles.login}>
            <form onSubmit={onSubmit}>
              <input
                className={styles.input}
                type="text"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="이메일을 입력하세요"
                required
              />
              {emailError && <p className={styles.emailError}>{emailError}</p>}
              <input
                className={styles.input}
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="비밀번호를 입력하세요"
                required
              />

              <div className={styles.checkBox_findpw}>
                <label htmlFor="chk" className={styles.check_p}>
                  <input
                    type="checkbox"
                    id="chk"
                    className={styles.check}
                    name="remember_me"
                    checked={remember_me}
                    onChange={onChange}
                  />
                  &nbsp; &nbsp;로그인 유지
                </label>
                <span>
                  <Link
                    to="/findpw"
                    className={styles.Link}
                    style={{ color: "#6C6C6C" }}
                  >
                    비밀번호 찾기
                  </Link>
                </span>
              </div>
              <button className={styles.LoginButton}>로그인</button>
              <button
                className={styles.SignUPButton}
                type="button"
                onClick={() => (window.location.href = "/signup")}
              >
                회원가입
              </button>
            </form>
          </div>
          <div className={styles.social}>
            <div className={styles.social_name}>간편 로그인</div>
          </div>
          <div className={styles.social_Login}>
            <SocialLogo
              style={{ backgroundImage: `url(${NaverLogo})` }}
              onClick={handleNaverLogin}
            />
            <SocialLogo
              style={{ backgroundImage: `url(${KakaoLogo})` }}
              onClick={handleKakaoLogin}
            />
            {/* <SocialLogo style={{ backgroundImage: `url(${GoogleLogo})` }} onClick={handleGoogleLogin} /> */}
            <SocialLogo
              style={{ backgroundImage: `url(${GoogleLogo})` }}
              onClick={handleGoogleLogin}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
