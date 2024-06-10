import styles from "../styles/SmokEndCase.module.css";
import star from "../assets/Review/star.png";
import star2 from "../assets/Review/star2.png";
import data1 from "../assets/Introduction/case_background.png";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ReviewPopup from "../components/ReviewPopup";

interface StarProps {
  isMobile: boolean;
  image: string;
}

interface ReviewProps {
  isMobile: boolean;
}
function SmokEndCase() {
  const isMobile = window.innerWidth <= 768;
  const [showReviewComponent, setShowReviewComponent] = useState(false);
  //갯수
  const [number, setNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(20000);
  //스크롤시 맨위로 올라갈 버튼
  const [showScrollButton, setShowScrollButton] = useState(false);
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  //~개의 상품평 부분 클릭시 리뷰창으로 스크롤
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById("reviews");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  //맨위로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  //리뷰 팝업 띄우기
  const handleReviewButtonClick = () => {
    setShowReviewComponent(true);
  };

  //상품 수 조절
  const upClick = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };
  const downClick = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };
  //상품수 변화에 따른 총금액 변화
  useEffect(() => {
    const newTotalPrice = number * 20000 + 3000; // 예시로 상품 단가를 20000으로 가정
    setTotalPrice(newTotalPrice);
  }, [number]);

  const Star: React.FC<StarProps> = ({ isMobile, image }) => (
    <div
      style={{
        width: isMobile ? "6vw" : "2vw",
        height: isMobile ? "6vw" : "2vw",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );

  const Star_review: React.FC<StarProps> = ({ isMobile, image }) => (
    <div
      style={{
        width: isMobile ? "4vw" : "1.5vw",
        height: isMobile ? "4vw" : "1.5vw",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );

  const ReviewImg: React.FC<ReviewProps> = ({ isMobile }) => (
    <div
      style={{
        width: isMobile ? "15vw" : "6vw",
        height: isMobile ? "15vw" : "6vw",
        backgroundImage: `url(${data1})`,
        marginRight: isMobile ? "1.5vw" : "0.5vw",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );

  return (
    <>
      <div className={styles.content}>
        {showScrollButton && (
          <div className={styles.scrollToTopButton} onClick={scrollToTop}></div>
        )}
        <div className={styles.box}>
          <div className={styles.picture}></div>
          <div className={styles.detailContent}>
            <div>
              <p className={styles.title}>
                Smok<span>E</span>nd 케이스
              </p>
              <p className={styles.subTitle}>당신의 금연 친구</p>
              <div className={styles.review}>
                <Star isMobile={isMobile} image={star2} />
                <Star isMobile={isMobile} image={star2} />
                <Star isMobile={isMobile} image={star2} />
                <Star isMobile={isMobile} image={star2} />
                <Star isMobile={isMobile} image={star} />
                <p onClick={scrollToReviews}>
                  &nbsp;&nbsp;&nbsp;100개의 상품평&nbsp;&nbsp;&gt;
                </p>
              </div>
              <div className={styles.money}>
                <p className={styles.case}>20,000₩</p>
                <div className={styles.delivery}>
                  <div className={styles.deliveryFee}>
                    <span>배송비</span> <span>3,000 ₩</span>
                  </div>
                  <div className={styles.count}>
                    <div className={styles.countValue}>{number}</div>
                    <div className={styles.countNumber}>
                      <div className={styles.upNumber} onClick={upClick}>
                        ∧
                      </div>
                      <div className={styles.downNumber} onClick={downClick}>
                        ∨
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.total}>
                <span>총 결제금액</span>
                <span className={styles.totalMoney}>{totalPrice}</span>
              </div>
              <div className={styles.button}>구매하기</div>
              <div className={styles.bottom}>size | 2000 * 5000</div>
            </div>
          </div>
        </div>
        <div className={styles.underline} />
        <div className={styles.des}></div>
        <div className={styles.underline} id="reviews" />
        {/* 리뷰 컨텐츠 부분 */}
        <p className={styles.reviewTop}>
          <span>최신순 | 오래된순</span>
          <span onClick={handleReviewButtonClick}>리뷰 쓰러가기 &gt;</span>
        </p>
        {showReviewComponent && (
          <ReviewPopup
            isOpen={showReviewComponent}
            setIsOpen={setShowReviewComponent}
          />
        )}

        <div className={styles.reviewContent}>
          <div className={styles.reviewUser}>
            <div className={styles.userProfile}></div>
            <div className={styles.userInfo}>
              <div className={styles.nickName}>동짱이</div>
              <div className={styles.star}>
                <Star_review isMobile={isMobile} image={star2} />
                <Star_review isMobile={isMobile} image={star2} />
                <Star_review isMobile={isMobile} image={star2} />
                <Star_review isMobile={isMobile} image={star2} />
                <Star_review isMobile={isMobile} image={star} />
                <span> 2023.11.20</span>
              </div>
            </div>
          </div>
          <div className={styles.reviewtitle}>SmokEnd 케이스</div>
          <div className={styles.reviewImgs}>
            <ReviewImg isMobile={isMobile} />
            <ReviewImg isMobile={isMobile} />
          </div>
          <div className={styles.reviewDes}>
            처음 롤앤롤 라벤더 화장지를 사용했을 때 가장 인상적이었던 것은 바로
            부드러운 사용감과 매력적인 라벤더 향이었습니다. 화장지가 얼굴을 만질
            때 부드러운 스킨케어 제품을 사용하는 것 같은 느낌이었고, 라벤더 향은
            섬세하고 달콤하여 화장실 공간을 한층 더 편안하게 만들어 주었습니다.
            특히 저는 피부가 민감한 편이지만 롤앤롤 라벤더 화장지를 사용해도
            전혀 자극이 없어서 매우 만족했습니다.
          </div>
        </div>

        <div className={styles.reviewContent}>
          <div className={styles.reviewUser}>
            <div className={styles.userProfile}></div>
            <div className={styles.userInfo}>
              <div className={styles.nickName}>동짱이</div>
              <div className={styles.star}>
                <Star_review isMobile={isMobile} image={star2} />
                <Star_review isMobile={isMobile} image={star2} />
                <Star_review isMobile={isMobile} image={star2} />
                <Star_review isMobile={isMobile} image={star2} />
                <Star_review isMobile={isMobile} image={star} />
                <span> 2023.11.20</span>
              </div>
            </div>
          </div>
          <div className={styles.reviewtitle}>SmokEnd 케이스</div>
          <div className={styles.reviewImgs}>
            <ReviewImg isMobile={isMobile} />
            <ReviewImg isMobile={isMobile} />
          </div>
          <div className={styles.reviewDes}>
            처음 롤앤롤 라벤더 화장지를 사용했을 때 가장 인상적이었던 것은 바로
            부드러운 사용감과 매력적인 라벤더 향이었습니다. 화장지가 얼굴을 만질
            때 부드러운 스킨케어 제품을 사용하는 것 같은 느낌이었고, 라벤더 향은
            섬세하고 달콤하여 화장실 공간을 한층 더 편안하게 만들어 주었습니다.
            특히 저는 피부가 민감한 편이지만 롤앤롤 라벤더 화장지를 사용해도
            전혀 자극이 없어서 매우 만족했습니다.
          </div>
        </div>
      </div>
    </>
  );
}

export default SmokEndCase;
