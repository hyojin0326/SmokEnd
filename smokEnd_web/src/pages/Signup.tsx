import { useState } from "react";
import styles from "../styles/Signup.module.css";
import { Link } from "react-router-dom";

interface FormData {
    email: string;
    password: string;
    name: string;
    birth: string;
    gender: string;
    passwordCheck: string;
    year: string;
    month: string;
    day: string;
}

function Signup(){
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        name: '',
        birth: '',
        gender: '',
        passwordCheck: '',
        year: '',
        month: '',
        day: ''
    });
    const {email, password, name, birth, gender, passwordCheck, year, month, day } = formData;    
    const [emailError, setEmailError] = useState<string>("");
    const [passwordCheckError, setPasswordCheckError] = useState<string>("");
    const [birthError, setBirthError] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        var dayFormatted = formData.day.length === 1 ? `0${formData.day}` : formData.day;
        const birth = `${formData.year}${formData.month}${dayFormatted}`;

        const dbData = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            birth:birth,
            gender: formData.gender,
            // 나중에 db에 보낼값
        };

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("올바른 이메일을 입력하세요.");
            return;
        } else {
            setEmailError("");
        }

        // 비밀번호 확인
        if (password !== passwordCheck) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
            return;
        } else {
            setPasswordCheckError("");
        }
        // 생년월일 값이 숫자인지 확인
        if (isNaN(parseInt(year)) || isNaN(parseInt(day))) {
            setBirthError("생년월일 값은 숫자여야 합니다.");
            return;
        } else if (parseInt(month) < 1 || parseInt(month) > 12 || parseInt(day) < 1 || parseInt(day) > 31) {
            setBirthError("올바른 일을 입력하세요.");
            return;
        } else if (parseInt(year) < 1900 || parseInt(year) > 2024) {
            setBirthError("올바른 연도를 입력하세요.");
            return;
        }

        // 성인 인증 (20세)
        const currentYear = new Date().getFullYear();
        const adultYear = currentYear - 19;
        if (parseInt(year) > adultYear) { // 수정
            setBirthError("20세 미만은 회원가입할 수 없습니다.");
            return;
        }

        console.log("DB에 보낼 데이터:", dbData);
    };

    return(
        <>
        <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css" rel="stylesheet" />
        <div className={styles.MainContent}>
            <div className={styles.signup}>
                <div className={styles.logo}>
                    <Link to="/" className={styles.Link}><p>Smok<span>E</span>nd</p></Link>
                </div>
                <div className={styles.signupForm}>
                    <form onSubmit={onSubmit}>
                        <p>아이디</p>
                        <input className={styles.input} type="text" name="email" value={email} onChange={onChange} placeholder="이메일을 입력하세요" required/>
                        {emailError && <p className={styles.Error}>{emailError}</p>}
                        <p>비밀번호</p>
                        <input className={styles.input} type="password" name="password" value={password} onChange={onChange} required/>
                        {passwordCheckError && <p className={styles.Error}>{passwordCheckError}</p>}
                        <p>비밀번호 확인</p>
                        <input className={styles.input} type="password" name="passwordCheck" value={passwordCheck} onChange={onChange} required/>
                        <p>닉네임</p>
                        <input className={styles.input} type="text" name="name" value={name} onChange={onChange} required/>
                        <p>생년월일</p>
                        <div className={styles.input_row}>
                            <input className={styles.input_birth} type="text" name="year" value={year} onChange={onChange}  placeholder="년(4자)" required/>
                            <select className={styles.input_birth} name="month"value={month} onChange={onChange}  required>
                                <option value="" disabled hidden>월</option>
                                <option value="01">1월</option>
                                <option value="02">2월</option>
                                <option value="03">3월</option>
                                <option value="04">4월</option>
                                <option value="05">5월</option>
                                <option value="06">6월</option>
                                <option value="07">7월</option>
                                <option value="08">8월</option>
                                <option value="09">9월</option>
                                <option value="10">10월</option>
                                <option value="11">11월</option>
                                <option value="12">12월</option>
                            </select>
                            <input className={styles.input_birth} type="text" name="day"value={day} onChange={onChange}  placeholder="일" required/>
                        </div>
                        {birthError && <p className={styles.Error}>{birthError}</p>}
                        <p>성별</p>
                        <select className={styles.input} name="gender" value={gender} onChange={onChange}  required>
                                <option value="" disabled hidden>성별</option>
                                <option value="male">남자</option>
                                <option value="female">여자</option>
                        </select>
                        <button>회원가입</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Signup;