import React, { useState } from "react";
import styles from "../styles/Review.module.css";
import pick from "../assets/Review/pick.png";
import star from "../assets/Review/star.png";
import star2 from "../assets/Review/star2.png";

function Review() {
  const [stars, setStars] = useState([star, star, star, star, star]);
  const [text, setText] = useState("");

  const toggleStar = (index: number) => {
    const newStars = stars.map((_, i) => (i <= index ? star2 : star));
    setStars(newStars);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      "만족도 별 갯수:",
      stars.filter((starImg) => starImg === star2).length
    );
    console.log("상세 글:", text);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
            <button type="submit" className={styles.butcss}>
              작성하기
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Review;
