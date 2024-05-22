import { useEffect, useState } from "react";
import styles from "../styles/Purchase.module.css";
import DaumPostcode from 'react-daum-postcode';
import styled from "styled-components";
import product from "../assets/main/data1.png";

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
        addressDetail: ''
    });
    const { orderName, orderPhone, orderPassword, passwordCheck,
        shippingName, shippingPhone, shippingRequest,
        addressZonecode, address, addressDetail
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
        if (allAgreement == false){
            alert("팔수 약관 동의를 선택해주세요.");
            return;
        }
            

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
