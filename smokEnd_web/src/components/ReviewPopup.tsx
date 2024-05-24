import React, { useState } from "react";
import styles from "../styles/ReviewPopup.module.css";
import pick from "../assets/Review/pick.png";
import star from "../assets/Review/star.png";
import star2 from "../assets/Review/star2.png";

function ReviewPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [stars, setStars] = useState([star, star, star, star, star]);
  const [text, setText] = useState("");
  const isMobile = window.innerWidth <= 768;

  const togglePopup = () => {
    if (!isOpen) {
      // 팝업을 열 때 초기화 -> 나중에 초기화 지우기 -> 디비로 넘어가고
      setStars([star, star, star, star, star]);
      setText("");
    }
    setIsOpen(!isOpen);
  };

  const toggleStar = (index: number) => {
    const newStars = stars.map((_, i) => (i <= index ? star2 : star));
    setStars(newStars);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log(
      "만족도 별 갯수:",
      stars.filter((starImg) => starImg === star2).length
    );
    console.log("상세 글:", text);
    setIsOpen(false); // 팝업창 닫기
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <button onClick={togglePopup}>리뷰 쓰기</button>
      {isOpen && (
        <div className={styles["popup-background"]} onClick={togglePopup}>
          <div
            className={styles["popup-content"]}
            // 팝업 내부 클릭시 이벤트 전파 막기
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.bigbigBox}>
              <div className={styles.bigBox}>
                <div className={styles.p}>상세 사진</div>
                <div className={styles.pick}>
                  <div className={styles.pickAlign}>
                    <img src={pick} alt="pick" />
                  </div>
                </div>

                <div className={styles.p}>만족도</div>
                <div className={styles.star}>
                  {stars.map((starImg, index) => (
                    <img
                      key={index}
                      src={starImg}
                      onClick={() => toggleStar(index)}
                    />
                  ))}
                </div>

                <div className={styles.p}>상세 글</div>
                <div>
                  <textarea
                    className={styles.textarea}
                    placeholder="상품에 대해..."
                    value={text}
                    onChange={handleTextChange}
                  />
                </div>
                <button
                  type="button"
                  className={styles.butcss}
                  onClick={handleSubmit}
                >
                  작성하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPopup;
