import { useEffect, useState } from "react";
import styles from "../styles/Purchase.module.css";
import DaumPostcode from 'react-daum-postcode';
import styled from "styled-components";
import product from "../assets/main/data1.png";
import one from "../assets/payment/1.png";
import two from "../assets/payment/2.png";
import three from "../assets/payment/3.png";
import four from "../assets/payment/4.png";
import five from "../assets/payment/5.png";
import six from "../assets/payment/6.png";
import seven from "../assets/payment/7.png";
import eight from "../assets/payment/8.png";
import nine from "../assets/payment/9.png";
import ten from "../assets/payment/10.png";
import eleven from "../assets/payment/11.png";
import twelve from "../assets/payment/12.png";
import thirteen from "../assets/payment/13.png";
import fourteen from "../assets/payment/14.png";
import fifteen from "../assets/payment/15.png";

import bank1 from "../assets/payment/bank/1.png"
import bank2 from "../assets/payment/bank/2.png"
import bank3 from "../assets/payment/bank/3.png"
import bank4 from "../assets/payment/bank/4.png"
import bank5 from "../assets/payment/bank/5.png"
import bank6 from "../assets/payment/bank/6.png"
import bank7 from "../assets/payment/bank/7.png"
import bank8 from "../assets/payment/bank/8.png"
import bank9 from "../assets/payment/bank/9.png"
import bank10 from "../assets/payment/bank/10.png"
import bank11 from "../assets/payment/bank/11.png"



interface FormData {
    orderName: string;
    orderPhone: string;
    orderPassword: string;
    passwordCheck: string;

    shippingName: string;
    shippingPhone: string;
    shippingRequest: string;

    addressZonecode: string;
    address: string;
    addressDetail: string;

    accountName: string;
    accountNumber: string;
}
interface AgreementCheckboxes {
    one: boolean;
    two: boolean;
    three: boolean;
    four: boolean;
    five: boolean;
}
const Orderinfo_img = styled.div`
    width:6vw;
    height:100%;
    background-size:cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 1vw;
    @media (max-width: 768px) {
        width:20vw;
        border-radius: 2vw;
    }
`;
const Bank = styled.div`
    width: 24%;
    height: 5vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center; 
    display: inline-block;
    border-radius: 0.5vw;
    margin-left: 0.5%;
    @media (max-width: 768px) {
        width: 24%;
        height: 12vw;
        border-radius: 1vw;
    }
`;
function Purchase() {
    const isMobile = window.innerWidth <= 768;
    const [showPostcode, setShowPostcode] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        orderName: '',
        orderPhone: '',
        orderPassword: '',
        passwordCheck: '',
        shippingName: '',
        shippingPhone: '',
        shippingRequest: '',
        addressZonecode: '',
        address: '',
        addressDetail: '',
        accountName: '',
        accountNumber: ''
    });
    const { orderName, orderPhone, orderPassword, passwordCheck,
        shippingName, shippingPhone, shippingRequest,
        addressZonecode, address, addressDetail,
        accountName, accountNumber
    } = formData;

    const handleAddressButtonClick = () => {
        setShowPostcode(true);
    };

    const handleModalBackgroundClick = () => {
        setShowPostcode(false);
    };

    const handleCompletePost = (data: any) => {
        console.log(data);
        setShowPostcode(false);
        setFormData(prevFormData => ({
            ...prevFormData,
            addressZonecode: data.zonecode,
            address: data.address
        }));

    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }


    const sameInfo = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            shippingName: orderName,
            shippingPhone: orderPhone
        }));
    };
    const [selectedOption, setSelectedOption] = useState("신용/체크카드");
    const [selectedPayment, setSelectedPayment] = useState("");

    const handleOptionClick = (option: string) => {
        setSelectedOption((prevOption) => (prevOption === option ? "" : option));
    };
    const handlePaymentClick = (payment: string) => {
        setSelectedPayment((prev) => (prev === payment ? "" : payment));
    }
    const handleAccountButtonClick = () => {
        if (accountNumber && accountName) {
            // 값이 존재한다면 알림 띄우기
            alert('계좌번호와 예금주명이 확인되었습니다.');
        } else {
            // 값이 존재하지 않는다면 알림 띄우기
            alert('계좌번호 또는 예금주명을 입력해주세요.');
        }
    };
    const [agreementCheckboxes, setAgreementCheckboxes] = useState<AgreementCheckboxes>({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false
    });
    const [allAgreement, setAllAgreement] = useState(false);

    useEffect(() => {
        const allChecked = Object.values(agreementCheckboxes).every(value => value);
        setAllAgreement(allChecked);
    }, [agreementCheckboxes]);

    const handleCheckboxChangeAll = () => {
        const allChecked = !allAgreement;
        setAgreementCheckboxes({
            one: allChecked,
            two: allChecked,
            three: allChecked,
            four: allChecked,
            five: allChecked
        });
    };

    const handleCheckboxChange = (checkboxName: keyof AgreementCheckboxes) => {
        setAgreementCheckboxes(prevState => ({
            ...prevState,
            [checkboxName]: !prevState[checkboxName]
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼의 기본 동작(페이지 새로고침)을 막습니다.

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
        if (!passwordRegex.test(orderPassword)) {
            alert('주문 비밀번호는 6~10자의 영문자와 숫자를 적어도 하나 이상 포함해야 합니다.');
            return; // 함수 실행 중지
        }
        // 주문 비밀번호와 비밀번호 확인 값이 일치하는지 확인
        if (orderPassword !== passwordCheck) {
            alert('주문 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return; // 함수 실행 중지
        }
        // 폼 데이터의 유효성 검사
        if (!orderName || !orderPhone || !orderPassword || !passwordCheck ||
            !shippingName || !shippingPhone || !addressZonecode || !address || !addressDetail) {
            // 필수 항목 중 하나라도 누락된 경우
            alert('모든 항목을 입력해주세요.');
            return; // 함수 실행 중지
        }
        if (selectedOption === "신용/체크카드" && selectedPayment === "") {
            alert("결제할 카드를 선택해주세요.");
        }
        if (selectedOption === "무통장 입금" && selectedPayment === "") {
            alert("결제할 은행을 선택해주세요.");
        }

        if (allAgreement == false)
            alert("팔수 약관 동의를 선택해주세요.");

        //서버 기능

    }


    return (
        <>
            <div className={styles.content}>
                <p className={styles.pageName}>주문결제</p>
                <form onSubmit={onSubmit}>
                    <div className={styles.mainContent}>
                        <div className={styles.row1}>
                            <div className={styles.box}>
                                <div className={styles.contentMargin}>
                                    <div>
                                        <p className={styles.name}>주문자 정보</p>
                                        <p className={styles.label}><span>주문자</span><input type="text" className={styles.input} name="orderName" value={orderName} onChange={onChange} placeholder="이름을 입력해주세요." required></input></p>
                                        <p className={styles.label}><span>연락처</span><input type="text" className={styles.input} name="orderPhone" value={orderPhone} onChange={onChange} placeholder='"-" 없이 입력해 주세요' required></input></p>
                                        <p className={styles.label}><span>주문 비밀번호</span><input type="password" className={styles.input} name="orderPassword" value={orderPassword} onChange={onChange} placeholder="6~10자의 영문자, 숫자포함" required></input></p>
                                        <p className={styles.label}><span>비밀번호 확인</span><input type="password" className={styles.input} name="passwordCheck" value={passwordCheck} onChange={onChange} placeholder="주문 비밀번호와 동일" required></input></p>

                                    </div>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.contentMargin}>
                                    <div>
                                        <p className={styles.name}>배송지 정보</p>
                                        <label className={styles.checkbox}><input type="checkbox" className={styles.input_check} onClick={sameInfo} />  주문자 정보와 동일</label>
                                        <p className={styles.label}><span>이름</span><input type="text" className={styles.input} name="shippingName" value={shippingName} onChange={onChange} placeholder="이름을 입력해주세요." required></input></p>
                                        <p className={styles.label}><span>연락처</span><input type="text" className={styles.input} name="shippingPhone" value={shippingPhone} onChange={onChange} placeholder='"-" 없이 입력해 주세요' required></input></p>
                                        <p className={styles.label}><span>주소</span><input type="text" className={styles.input_address} name="addressZonecode" value={addressZonecode} placeholder="우편번호" required></input><div className={styles.input_address_button} onClick={handleAddressButtonClick}>주소찾기</div></p>
                                        {showPostcode && (
                                            <div className={styles.modalBackground} onClick={handleModalBackgroundClick}>
                                                <div className={styles.modalContent}>
                                                    <DaumPostcode
                                                        onComplete={handleCompletePost}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <p className={styles.label}><span></span><input type="text" className={styles.input} name="address" value={address} placeholder="주소" required></input></p>
                                        <p className={styles.label}><span></span><input type="text" className={styles.input} name="addressDetail" value={addressDetail} placeholder="상세주소" onChange={onChange} required></input></p>
                                        <p className={styles.label}><span>요청사항</span>
                                            <select className={styles.select} name="shippingRequest" value={shippingRequest} onChange={onChangeSelect} required>
                                                <option value="" disabled hidden>배송시 요청사항을 선택해 주세요.</option>
                                                <option value="01">직접 수령하겠습니다.</option>
                                                <option value="02">배송 전 연락바랍니다.</option>
                                                <option value="03">부재 시 경비실에 맡겨주세요.</option>
                                                <option value="04">부재 시 문앞에 놓아주세요.</option>
                                                <option value="05">부재 시 택배함에 놓아주세요.</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.contentMargin}>
                                    <div>
                                        <p className={styles.name}>결제수단</p>
                                        <div className={styles.underline} />
                                        <label style={{ fontSize: isMobile ? '3vw' : '1.2vw' , paddingTop: isMobile? '2vw':'', paddingBottom: isMobile? '2vw':''}}><input type="radio" id="pay" name="pay" checked />일반결제</label>
                                        <div className={styles.payment}>
                                            <div className={styles.payment_select}>
                                                <div
                                                    className={`${selectedOption === "신용/체크카드" ? styles.selectPay_click : styles.selectPay
                                                        }`}
                                                    onClick={() => handleOptionClick("신용/체크카드")}
                                                >
                                                    신용/체크카드
                                                </div>
                                                <div
                                                    className={`${selectedOption === "무통장 입금" ? styles.selectPay_click : styles.selectPay
                                                        }`}
                                                    onClick={() => handleOptionClick("무통장 입금")}
                                                >
                                                    무통장 입금
                                                </div>
                                            </div>
                                            <div className={styles.payment_content}>
                                                {selectedOption === "신용/체크카드" && (
                                                    <div>
                                                        <Bank style={{ backgroundImage: `url(${one})`, border: selectedPayment === "현대카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("현대카드")} />
                                                        <Bank style={{ backgroundImage: `url(${two})`, border: selectedPayment === "KB국민카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("KB국민카드")} />
                                                        <Bank style={{ backgroundImage: `url(${three})`, border: selectedPayment === "신한카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("신한카드")} />
                                                        <Bank style={{ backgroundImage: `url(${four})`, border: selectedPayment === "삼성카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("삼성카드")} />
                                                        <Bank style={{ backgroundImage: `url(${five})`, border: selectedPayment === "롯데카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("롯데카드")} />
                                                        <Bank style={{ backgroundImage: `url(${six})`, border: selectedPayment === "우리BC카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("우리BC카드")} />
                                                        <Bank style={{ backgroundImage: `url(${seven})`, border: selectedPayment === "우리카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("우리카드")} />
                                                        <Bank style={{ backgroundImage: `url(${eight})`, border: selectedPayment === "하나카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("하나카드")} />
                                                        <Bank style={{ backgroundImage: `url(${nine})`, border: selectedPayment === "비씨카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("비씨카드")} />
                                                        <Bank style={{ backgroundImage: `url(${ten})`, border: selectedPayment === "NH농협카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("NH농협카드")} />
                                                        <Bank style={{ backgroundImage: `url(${eleven})`, border: selectedPayment === "씨티카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("씨티카드")} />
                                                        <Bank style={{ backgroundImage: `url(${twelve})`, border: selectedPayment === "G+하나카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("하나카드")} />
                                                        <Bank style={{ backgroundImage: `url(${thirteen})`, border: selectedPayment === "G+우리e카드" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("G+우리e카드")} />
                                                        <Bank style={{ backgroundImage: `url(${fourteen})`, border: selectedPayment === "카카오뱅크" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("카카오뱅크")} />
                                                        <div className={styles.underline} style={{ backgroundColor: "#8f8f8f" }} />
                                                        <div className={styles.payment_bottom}>
                                                            <p style={{ color: "blue", fontSize: isMobile ? '2.2vw' : '1vw'}}>법인카드 결제 시 일시불만 가능</p>
                                                            <p style={{ fontSize: isMobile ? '2vw' : '0.8vw' }}>무이자 할부 안내</p>
                                                        </div>
                                                        <select className={styles.select_payment} value="일시불">
                                                            <option value="01">일시불</option>
                                                        </select>
                                                    </div>
                                                )}
                                                {selectedOption === "무통장 입금" && (
                                                    <div>
                                                        <Bank style={{ backgroundImage: `url(${bank1})`, border: selectedPayment === "우리은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("우리은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank2})`, border: selectedPayment === "신한은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("신한은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank3})`, border: selectedPayment === "하나은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("하나은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank4})`, border: selectedPayment === "SC은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("SC은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank5})`, border: selectedPayment === "국민은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("국민은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank6})`, border: selectedPayment === "우체국" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("우체국")} />
                                                        <Bank style={{ backgroundImage: `url(${bank7})`, border: selectedPayment === "기업은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("기업은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank8})`, border: selectedPayment === "농협은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("농협은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank9})`, border: selectedPayment === "외환은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("외환은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank10})`, border: selectedPayment === "부산은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("부산은행")} />
                                                        <Bank style={{ backgroundImage: `url(${bank11})`, border: selectedPayment === "씨티은행" ? (isMobile ? "0.3vw solid blue" : "0.1vw solid blue") : "none" }}
                                                            onClick={() => handlePaymentClick("씨티은행")} />

                                                        <div className={styles.bank_bottom}>
                                                            <p style={{ color: "blue", fontSize: isMobile ? '2.5vw' : '1vw', paddingBottom: isMobile ? '1vw' : '0.5vw'}}>ATM기기로 현금 입금은 우리, 기업, 하나은행만 가능합니다. (은행창구, 인터넷뱅킹은 전 은행 이용가능)</p>
                                                            <p style={{ fontSize: isMobile ? '2.2vw' : '0.8vw', paddingBottom: isMobile ? '1vw' : '0.5vw' }}>비회원 주문건 현금영수증은 국세청 홈택스에서 직접 발급 해 주세요.</p>
                                                            <div className={styles.underline} style={{ backgroundColor: "#8f8f8f" }} />
                                                            <p style={{ fontSize: isMobile ? '2.5vw' : '1vw', paddingTop: isMobile ? '1vw' : '0.5vw' }}>환불계좌 등록</p>
                                                            <ul>
                                                                <li>주문취소 및 반품 시 환불받으실 계좌를 입력해 주세요.</li>
                                                                <li>환불계좌는 예금주와 주문자명이 반드시 동일해야 합니다.</li>
                                                                <li style={{ paddingBottom: isMobile ? '1vw' : '0.5vw' }}>계좌로 환불이 어려운 경우, 사유에 따라 계좌정보 변경 후 다시 환불 신청하실 수 있습니다.</li>
                                                            </ul>
                                                            <div className={styles.mobileBank}>
                                                            <p className={styles.label}><span>은행명</span><input type="text" className={styles.input} style={{ color: "8f8f8f" }} name="payment" value={selectedPayment} required></input></p>
                                                            <p className={styles.label}><span>계좌번호</span><input type="text" className={styles.input} name="accountNumber" value={accountNumber} onChange={onChange} placeholder='"-"없이 입력해 주세요.' required></input></p>
                                                            <p className={styles.label}><span>예금주명</span><input type="text" className={styles.input_address} name="accountName" value={accountName} onChange={onChange} placeholder={isMobile? '':'예금주 명을 입력해 주세요.'} required></input><div className={styles.input_address_button} onClick={handleAccountButtonClick}>계좌확인</div></p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.row2}>
                            <div className={styles.box}>
                                <div className={styles.contentMargin}>
                                    <div style={{ fontSize: isMobile ? '3vw' : '1vw' }}>
                                        <p className={styles.name}>주문상품</p>
                                        <div className={styles.underline} />
                                        <div className={styles.orderInfo}>
                                            <Orderinfo_img style={{ backgroundImage: `url(${product})` }} />
                                            <div className={styles.orderInfo_info}>
                                                <p className={styles.top_text}>자체 제작 담배 케이스</p>
                                                <p className={styles.bottom_text}>2,000 원 / 1개</p>
                                            </div>
                                        </div>
                                        <div className={styles.underline} />
                                        <div className={styles.orderPay}>
                                            <p>상품금액<span>2,000P</span></p>
                                            <p>배송비 <span style={{ color: "green" }}>0P</span></p>
                                        </div>
                                        <div className={styles.underline} />
                                        <div className={styles.orderTotal}>
                                            <p>총 결제금액<span>2,000P</span></p>
                                        </div>
                                        <button className={styles.button}>결제하기</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.contentMargin}>
                                    <div>
                                        <label className={styles.agreement} style={{ color: "blue" }}><input type="checkbox" className={styles.input_check} onChange={handleCheckboxChangeAll} checked={allAgreement} /> 전체동의 <span style={{ color: "#8f8f8f" }}> 서비스 약관에 동의합니다.</span></label>
                                        <div className={styles.underline} style={{ backgroundColor: "#8f8f8f", marginBottom: "1vw" }} />
                                        <label className={styles.agreement} style={{ color: "blue" }}><input type="checkbox" className={styles.input_check} checked={agreementCheckboxes.one} onChange={() => handleCheckboxChange('one')} /> 필수 <span> 만 14세 이상입니다.</span></label>
                                        <label className={styles.agreement} style={{ color: "blue" }}><input type="checkbox" className={styles.input_check} checked={agreementCheckboxes.two} onChange={() => handleCheckboxChange('two')} /> 필수 <span> 개인정보 수집 및 이용동의</span></label>
                                        <label className={styles.agreement} style={{ color: "blue" }}><input type="checkbox" className={styles.input_check} checked={agreementCheckboxes.three} onChange={() => handleCheckboxChange('three')} /> 필수 <span> 개인정보 제3자 제공동의</span></label>
                                        <label className={styles.agreement} style={{ color: "blue" }}><input type="checkbox" className={styles.input_check} checked={agreementCheckboxes.four} onChange={() => handleCheckboxChange('four')} /> 필수 <span> G마켓 구매회원 약관 동의</span></label>
                                        <label className={styles.agreement} style={{ color: "blue" }}><input type="checkbox" className={styles.input_check} checked={agreementCheckboxes.five} onChange={() => handleCheckboxChange('five')} /> 필수 <span> 전자금융거래 약관 동의</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Purchase;
