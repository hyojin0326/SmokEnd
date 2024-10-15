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
  review: Review; // 리뷰 데이터 추가
}

interface Review {
  _id: string;
  uid: string;
  timeStamp: string;
  stars: number | string;
  text: string;
  imageUrl: string | null;
  userInfo: {
    name: string;
    profileImage: string;
  };
}

function SmokEndCase() {
  const isMobile = window.innerWidth <= 768;
  const [showReviewComponent, setShowReviewComponent] = useState(false);
  const [number, setNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(20000);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  
  window.addEventListener("scroll", handleScroll);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://${import.meta.env.VITE_URL_API}/api/get/review`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("리뷰를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById("reviews");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReviewButtonClick = () => {
    setShowReviewComponent(true);
  };

  const upClick = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };
  const downClick = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  useEffect(() => {
    const newTotalPrice = number * 20000 + 3000; 
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

  const ReviewImg: React.FC<ReviewProps> = ({ isMobile, review }) => (
    review.imageUrl ? (
      <div
        style={{
          width: isMobile ? "15vw" : "6vw",
          height: isMobile ? "15vw" : "6vw",
          backgroundImage: `url(${review.imageUrl})`,
          marginRight: isMobile ? "1.5vw" : "0.5vw",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    ) : null
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
                  &nbsp;&nbsp;&nbsp;{reviews.length}개의 상품평&nbsp;&nbsp;&gt;
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
        <div className={styles.underline}/>
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

        {reviews.map((review) => (
          <div className={styles.reviewContent} key={review._id}>
            <div className={styles.reviewUser}>
              <div className={styles.userProfile} style={{ backgroundImage: `url(${review.userInfo.profileImage})` }}></div>
              <div className={styles.userInfo}>
                <div className={styles.nickName}>{review.userInfo.name}</div>
                <div className={styles.star}>
                  {[...Array(5)].map((_, index) => (
                    <Star_review
                      key={index}
                      isMobile={isMobile}
                      image={index < Number(review.stars) ? star2 : star}
                    />
                  ))}
                  <span> {review.timeStamp.split(" ")[0]}</span>
                </div>
              </div>
            </div>
            <div className={styles.reviewtitle}>SmokEnd 케이스</div>
            {review.imageUrl && <div className={styles.reviewImgs}>
              <ReviewImg isMobile={isMobile} review={review} />
            </div>}
            <div className={styles.reviewDes}>
              {review.text}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SmokEndCase;