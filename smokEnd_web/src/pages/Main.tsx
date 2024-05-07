import styles from "../styles/Main.module.css";
import Header from "../components/Header";
import belowArrow from "../assets/belowArrow_white.png";
import { useState } from "react";
function Main() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleLeftArrowClick = () => {
    setScrollPosition(prevPosition => prevPosition - 393);
  };

  const getProductTransform = (index: number) => {
    switch (index) {
      case 0:
        return `translateX(${scrollPosition}px)`;
      case 1:
        return `translateX(${scrollPosition}px)`;
      case 2:
        return `translateX(${scrollPosition}px)`;
      default:
        return `translateX(${scrollPosition}px)`;
    }
  };

  return (
    <>

      <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css" rel="stylesheet" />
      {/* 헤더 컴포넌트 불러오기 */}
      <Header />
      <div className={styles.main_black}>
        <div className={styles.main_content}>
          <div className={styles.main} >
            <p className={styles.mainText}>지금 금연하지 않는다면 <br /><span>당신의 폐</span>는 망가집니다.</p>
            <br />
            <p className={styles.subText}>당신의 폐는 건강하십니까?</p>
            <div className={styles.mainButton}>
              <p>더 알아보기     <span>&gt;</span></p>
            </div>
          </div>
          <div className={styles.main_smoke}>
          </div>
        </div>
        <div className={styles.bottom}>
          <img src={belowArrow}></img>
        </div>
      </div>
      <div className={styles.main_white}>
        <div className={styles.main_product}>
          <div className={styles.main_product_text}>
            <p className={styles.main_product_title}>당신의 <span>금연</span>을 <br />도와줄 제품</p>
            <br />
            <p className={styles.main_product_sub}>금연에 도움이 될 수 있는 제품을<br />마일리지, 현금으로, 구매할 수 있습니다.</p>
            <div className={styles.main_product_button}>
              <span>스토어</span> <span>&gt;</span>
            </div>
          </div>
          <div className={styles.mainProduct}>
            <div className={styles.leftArrow} onClick={handleLeftArrowClick}/>
            <div className={styles.product} style={{ transform: getProductTransform(0) }}>
              <div className={styles.produnct_img}></div>
              <div className={styles.product_des}>
                <p className={styles.product_title}>SmokEnd 담배 케이스</p>
                <p className={styles.product_sub}>당신의 금연을 도와줄 수 있습니다.</p>
              </div>
            </div>
            <div className={styles.product} style={{ transform: getProductTransform(1) }}>
              <div className={styles.produnct_img}></div>
              
            </div>
            <div className={styles.product} style={{ transform: getProductTransform(2) }}>
              <div className={styles.produnct_img}></div>
              
            </div>
            {/* <div className={styles.product}>
              <div className={styles.produnct_img}></div>
              <div className={styles.product_des}>
                <p className={styles.product_title}>SmokEnd 담배 케이스</p>
                <p className={styles.product_sub}>당신의 금연을 도와줄 수 있습니다.</p>
              </div>
            </div>
            <div className={styles.product}>
              <div className={styles.produnct_img}></div>
              
            </div>
            <div className={styles.product}>
              <div className={styles.produnct_img}></div>
            </div>
            <div className={styles.product}>
              <div className={styles.produnct_img}></div>
            </div> */}
            
            <div className={styles.rightArrow}/>
          </div>
          

          
        </div>

      </div>
    </>
  )
}

export default Main
