import styled from 'styled-components';
import styles from "../styles/Footer.module.css";

const Footers = styled.div`
    width:100vw;
    height:40vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        height: 150px;
    }
`;  
function Footer(){
    return(
        <Footers>
            <div className={styles.mainDiv}>
                <div className={styles.left}>
                    <p>당신의 금연</p>
                    <p style={{lineHeight:2}}>SmokEnd에서 함께 합니다.</p>
                </div>
                <div className={styles.right}>
                    <div className={styles.AppButton}>
                        <p>앱 설치하기</p>
                    </div>
                </div>
            </div>


        </Footers>
    );
}

export default Footer;