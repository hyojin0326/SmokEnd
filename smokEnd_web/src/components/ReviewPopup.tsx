import React, { useState, useEffect } from "react";
import styles from "../styles/ReviewPopup.module.css";
import pick from "../assets/Review/pick.png";
import star from "../assets/Review/star.png";
import star2 from "../assets/Review/star2.png";

interface ReviewPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ isOpen, setIsOpen }) => {
  const [stars, setStars] = useState([star, star, star, star, star]);
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 선택한 이미지를 저장할 상태
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (isOpen) {
      setStars([star, star, star, star, star]);
      setText("");
      setSelectedImage(null); // 팝업 열릴 때 이미지 초기화
    }
  }, [isOpen]);

  const toggleStar = (index: number) => {
    const newStars = stars.map((_, i) => (i <= index ? star2 : star));
    setStars(newStars);
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log(
      "만족도 별 갯수:",
      stars.filter((starImg) => starImg === star2).length
    );
    console.log("상세 글:", text);
    setIsOpen(false); // 팝업창 닫기

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    const formData = new FormData();
    formData.append("token", token);
    formData.append(
      "stars",
      stars.filter((starImg) => starImg === star2).length.toString()
    );
    formData.append("text", text);

    if (selectedImage) {
      formData.append("image", selectedImage); // 선택한 이미지가 있을 경우 추가
    }

    await fetch(
      `http://${import.meta.env.VITE_URL_API}/api/handle/postReview`,
      {
        method: "POST",
        body: formData, // FormData로 전송
      }
    ).then(async (response) => {
      const resData = await response.text();
      alert(resData);
    });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]); // 선택한 이미지 저장
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles["popup-background"]}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={styles["popup-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.bigbigBox}>
          <div className={styles.bigBox}>
            <div className={styles.p}>상세 사진</div>
            <div className={styles.pick}>
              <div className={styles.pickAlign}>
                <label htmlFor="image-upload">
                  <img src={pick} alt="pick" />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange} // 이미지 선택 이벤트 핸들러
                />
              </div>
            </div>
            {selectedImage && (
                <>
                  <br />
                  <p>선택된 파일: {selectedImage.name}</p>
                </>
                )}

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
  );
};

export default ReviewPopup;