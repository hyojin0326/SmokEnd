import React, { useState } from "react";
import styles from "../styles/Shop.module.css";
import CASE from "../assets/Introduction/case.png";

interface Product {
  name: string;
  price: string;
  points: string;
}

interface ShopComponentProps {
  hoverOptions: string[];
  product: Product;
}

const ShopComponent: React.FC<ShopComponentProps> = ({
  hoverOptions,
  product,
}) => {
  return (
    <div className={styles.ShopBigContainer}>
      <div className={styles.hoverBox}>
        <div className={styles.hoverCenter}>
          {hoverOptions.map((option, index) => (
            <div className={styles.hoverTextBox} key={index}>
              <div className={styles.hoverText}>{option}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.ShopContainer}>
        <div className={styles.ShopContainerimg}></div>
        <div className={styles.ShopTextBox}>
          <p className={styles.ShopTextB}>{product.name}</p>
          <p className={styles.ShopTextL}>{product.price}</p>
          <p className={styles.ShopTextL}> / </p>
          <p className={styles.ShopTextL}>{product.points}</p>
        </div>
      </div>
    </div>
  );
};

const Shop: React.FC = () => {
  const isMobile = window.innerWidth <= 768;

  const dummyData: ShopComponentProps = {
    hoverOptions: ["현금 구매", "마일리지 구매"],
    product: {
      name: "금연 알약",
      price: "20,000₩",
      points: "200p",
    },
  };

  const pageSize = 12; // 한 페이지에 보여줄 아이템 수
  const totalItems = 50; // 전체 아이템 수
  const totalPages = Math.ceil(totalItems / pageSize); // 전체 페이지 수

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const startIndex = (currentPage - 1) * pageSize; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
  const endIndex = Math.min(startIndex + pageSize, totalItems); // 현재 페이지에서 보여줄 아이템의 끝 인덱스

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.bigBox}>
          <p className={styles.pageName}>금연 상품</p>
          <p className={styles.p}>당신의 금연 친구</p>
        </div>

        <div className={styles.smokShopContainer}>
          <div className={`${styles.smokShopLeft} ${styles.reducedBr}`}>
            <div className={styles.logo}>
              Smok<div className={styles.logo2}>E</div>nd 케이스
            </div>
            <br />
            <div className={styles.text}>당신의 눈을 즐겁게, 폐를 건강하게</div>
            <div className={styles.text}>SmokEnd가 함께 합니다.</div>
          </div>
          <div className={styles.smokShopRight}>
            <img src={CASE} alt="Case" />
          </div>
        </div>
        {/* 더미 데이터 부분 */}
        <div className={styles.dummyDataContainer}>
          {[...Array(totalItems).keys()]
            .slice(startIndex, endIndex)
            .map((index) => (
              <div className={styles.dummyDataItem} key={index}>
                <ShopComponent
                  hoverOptions={dummyData.hoverOptions}
                  product={dummyData.product}
                />
              </div>
            ))}
        </div>
        {/* 더미 데이터 부분 */}
        {/* 페이지네이션 부분 */}
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={currentPage === page + 1 ? styles.activePage : ""}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
        {/* 페이지네이션 부분 */}
      </div>
    </div>
  );
};

export default Shop;
