import React, { useState, useEffect } from "react";
import styles from "../styles/Shop.module.css";
import CASE from "../assets/Introduction/case.png";

interface Product {
  name: string;
  price: string;
  points: string;
}

interface HoverOption {
  text: string;
  url: string;
}

interface ShopComponentProps {
  hoverOptions: HoverOption[];
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
              <a href={option.url} className={styles.hoverText}>
                {option.text}
              </a>
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

  // 더미 데이터 (데이터베이스에서 가져올 경우 주석 해제)
  const dummyData: ShopComponentProps = {
    hoverOptions: [
      {
        text: "현금 구매",
        url: "https://www.coupang.com/vp/products/7872543388?itemId=21509565790&vendorItemId=88563074966&sourceType=srp_product_ads&clickEventId=fbd544b0-22f3-11ef-8d5e-079ba51d28c4&korePlacement=15&koreSubPlacement=1&q=%EA%B8%88%EC%97%B0%EC%A0%9C%ED%92%88&itemsCount=36&searchId=da4b82249098446ea43c9f921020461a&rank=0&isAddedCart=",
      },
      { text: "마일리지 구매", url: "/mileagePurchase" },
    ],
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
  const [products, setProducts] = useState<ShopComponentProps[]>([]); // 상품 상태

  useEffect(() => {
    // 데이터베이스에서 상품을 가져오는 로직 (나중에 주석 해제)
    // const fetchProducts = async () => {
    //   const response = await fetch("API_ENDPOINT");
    //   const data = await response.json();
    //   setProducts(data);
    // };
    // fetchProducts();

    // 현재는 더미 데이터를 사용
    setProducts(Array(totalItems).fill(dummyData));
  }, []);

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
          {products.slice(startIndex, endIndex).map((product, index) => (
            <div className={styles.dummyDataItem} key={index}>
              <ShopComponent
                hoverOptions={product.hoverOptions}
                product={product.product}
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
