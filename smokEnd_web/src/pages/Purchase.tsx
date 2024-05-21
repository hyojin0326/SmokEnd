import { useState } from "react";
import styles from "../styles/Purchase.module.css";
import DaumPostcode from 'react-daum-postcode';
import styled from "styled-components";
import product from "../assets/main/data1.png";
// 주문자 정보: order-info
// 배송지 정보: shipping-info
// 주문상품: order-items
// 결제수단: payment-method
//agreement
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
const Orderinfo_img = styled.div`
    width:6vw;
    height:100%;
    background-color: aquamarine;
    background-size:cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 1vw;
`;
function Purchase() {
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
    });
    const { orderName, orderPhone, orderPassword, passwordCheck,
        shippingName, shippingPhone, shippingRequest,
        addressZonecode, address, addressDetail,
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
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
        });
    }
    const sameInfo = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            shippingName: orderName,
            shippingPhone: orderPhone
        }));
    };

    return (
        <>
            <div className={styles.content}>
                <p className={styles.pageName}>주문결제</p>
                <form>
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
                                        <p className={styles.label}><span>주소</span><input type="text" className={styles.input_address} name="addressZonecode" value={addressZonecode} onChange={onChange} placeholder="우편번호" required></input><div className={styles.input_address_button} onClick={handleAddressButtonClick}>주소찾기</div></p>
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
                                        <p className={styles.label}><span></span><input type="twxt" className={styles.input} name="addressDetail" value={addressDetail} placeholder="상세주소" required></input></p>
                                        <p className={styles.label}><span>요청사항</span>
                                            <select className={styles.select} name="shippingRequest" value={shippingRequest} required>
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
                                        <p className={styles.name}>주문자 정보</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.row2}>
                            <div className={styles.box}>
                                <div className={styles.contentMargin}>
                                    <div>
                                        <p className={styles.name}>주문상품</p>
                                        <div className={styles.underline} />
                                        <div className={styles.orderInfo}>
                                            <Orderinfo_img style={{ backgroundImage: `url(${product})` }}/>
                                            <div className={styles.orderInfo_info}>
                                                <p className={styles.top_text}>자체 제작 담배 케이스</p>
                                                <p className={styles.bottom_text}>2,000 원 / 1개</p>
                                            </div>
                                        </div>
                                        <div className={styles.underline}/>
                                        <div className={styles.orderPay}>
                                            <p>상품금액<span>2,000P</span></p>
                                            <p>배송비 <span style={{color:"green"}}>0P</span></p>
                                        </div>
                                        <div className={styles.underline}/>
                                        <div className={styles.orderTotal}>
                                            <p>총 결제금액<span>2,000P</span></p>
                                        </div>
                                        <div className={styles.button}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.contentMargin}>
                                    <div>
                                        <p className={styles.name}>주문자 정보</p>
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