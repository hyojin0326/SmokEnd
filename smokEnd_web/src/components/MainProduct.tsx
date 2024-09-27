// import React from "react";
// import styles from "../styles/Main.module.css";

// function MainProduct() {
//   return (
//     <>
//       <div
//         className={`${styles.product} ${
//           specialProductIndex === 0 ? styles.specialProduct : ""
//         }`}
//         style={{ transform: getProductTransform1(0) }}
//       >
//         <Link to="/smokEndCase">
//           <Image></Image>
//         </Link>
//         {specialProductIndex === 0 && (
//           <div className={styles.product_des}>
//             <p className={styles.product_title}>SomkEnd 담배 케이스</p>
//             <p className={styles.product_sub}>
//               당신의 금연을 도와줄 수 있습니다.
//             </p>
//           </div>
//         )}
//       </div>
//       <div
//         className={`${styles.product} ${
//           specialProductIndex === 1 ? styles.specialProduct : ""
//         }`}
//         style={{ transform: getProductTransform2(0) }}
//       >
//         <div
//           className={styles.product_img}
//           style={{ backgroundImage: `url(${itemsData[0].url})` }}
//         ></div>
//         {specialProductIndex === 1 && (
//           <div className={styles.product_des}>
//             <p className={styles.product_title}>특별한 경우 2</p>
//             <p className={styles.product_sub}>
//               이 제품은 특별한 경우에만 보입니다.
//             </p>
//           </div>
//         )}
//       </div>
//       <div
//         className={`${styles.product} ${
//           specialProductIndex === 2 ? styles.specialProduct : ""
//         }`}
//         style={{ transform: getProductTransform3(0) }}
//       >
//         <Image></Image>
//         {specialProductIndex === 2 && (
//           <div className={styles.product_des}>
//             <p className={styles.product_title}>특별한 경우 3</p>
//             <p className={styles.product_sub}>
//               이 제품은 특별한 경우에만 보입니다.
//             </p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default MainProduct;
