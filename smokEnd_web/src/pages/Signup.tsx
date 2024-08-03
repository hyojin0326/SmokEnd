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

function Signup() {
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
    const { email, password, name, birth, gender, passwordCheck, year, month, day } = formData;
    const [emailError, setEmailError] = useState<string>("");
    const [passwordCheckError, setPasswordCheckError] = useState<string>("");
    const [birthError, setBirthError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        var dayFormatted = formData.day.length === 1 ? `0${formData.day}` : formData.day;
        const birth = `${formData.year}-${formData.month}-${dayFormatted}`;

        const dbData = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            birth: birth,
            gender: formData.gender,
        };

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("올바른 이메일을 입력하세요.");
            return;
        } else {
            setEmailError("");
        }
        if (formData.password.length < 6) {
            setPasswordCheckError("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        } else {
            setPasswordCheckError("");
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
        
        setIsLoading(true);
        if (isLoading) {
            alert("회원가입 중입니다.");
            return;
        }

        // 서버로 데이터 전송
        await fetch(`http://${import.meta.env.VITE_URL_API}/api/auth/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbData)
        })
            .then(response => {
                setIsLoading(false);
                if(response.status === 201) {
                    // 회원가입이 정상적으로 이루어진 경우의 동작
                    console.log(response.text());
                    window.location.href = '/login';
            
                  } else if(response.status === 500) {
                    // 회원가입이 정상적으로 이루어지지 않은 경우의 동작
                    console.log(response.text());
            
                  } else {
                    // 여기 있는거 실행되면 매우 큰 문제가 있는거임
                    console.log('???');
                    
                  }
                }).catch(err => {
                  // fetch호출 자체가 실패한 경우
                  console.log("fetch err");
                })
    };

    return (
        <>
            <div className={styles.MainContent}>
                <div className={styles.signup}>
                    <div className={styles.logo}>
                        <Link to="/" className={styles.Link}><p>회원가입</p></Link>
                    </div>
                    <div className={styles.signupForm}>
                        <form onSubmit={onSubmit}>
                            <div className={styles.id_pw_des}><p>사용할 아이디와 비밀번호를 입력해주세요.</p></div>
                            <input className={styles.input} type="text" name="email" value={email} onChange={onChange} placeholder="이메일" required />
                            {emailError && <p className={styles.Error}>{emailError}</p>}
                            <input className={styles.input} type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"required />
                            {passwordCheckError && <p className={styles.Error}>{passwordCheckError}</p>}
                            <input className={styles.input} type="password" name="passwordCheck" value={passwordCheck} onChange={onChange} placeholder="비밀번호 확인" required />
                            <p className={styles.pwAlert}>비밀번호는 영문, 숫자, 특수문자 포함 6자 이상으로 선정해주세요.</p>
                            
                            <div className={styles.name_birth_gender_des}><p>사용할 닉네임과 생년월일, 성별을 입력해주세요.</p></div>
                            <input className={styles.input} type="text" name="name" value={name} onChange={onChange} placeholder="닉네임"required />
                            <p className={styles.birthAlert}>생년월일</p>
                            <div className={styles.input_row}>
                                <input className={styles.input_birth} type="text" name="year" value={year} onChange={onChange} placeholder="년(4자)" required />
                                <select className={styles.input_birth} name="month" value={month} onChange={onChange} required>
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
                                <input className={styles.input_birth} type="text" name="day" value={day} onChange={onChange} placeholder="일" required />
                            </div>
                            {birthError && <p className={styles.Error}>{birthError}</p>}
                            <select className={styles.input} name="gender" value={gender} onChange={onChange} required>
                                <option value="" disabled hidden>성별</option>
                                <option value="male">남자</option>
                                <option value="female">여자</option>
                            </select>
                            <button className={styles.SignupButton}>가입하기</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;