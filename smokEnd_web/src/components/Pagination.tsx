import React from "react";
import styles from "../styles/Pagination.module.css";

function Pagination({
  postsPerPage,
  totalPosts,
  getCurrentPage,
  activePage,
}: {
  postsPerPage: number;
  totalPosts: number;
  getCurrentPage: (pageNumber: number, type: string) => void;
  activePage: number;
}) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ marginTop: totalPosts < postsPerPage ? "0" : "20px" }}>
      <ul className={styles.pagination}>
        <li className={styles.list}>
          <div
            role="presentation"
            onClick={() => {
              if (activePage > 1) {
                // 현재 페이지가 1보다 클 때만 이전 페이지로 이동
                window.scrollTo(0, 0); // 페이지를 위쪽으로 스크롤
                getCurrentPage(activePage - 1, "prev");
              }
            }}
            className={`page-link ${activePage === 1 ? styles.disabled : ""}`}
          >
            &lt;
          </div>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.list}>
            <div
              role="presentation"
              onClick={() => getCurrentPage(number, "page")}
              className={`page-link ${
                activePage === number ? styles.active : ""
              }`}
            >
              {number}
            </div>
          </li>
        ))}
        <li className={styles.list}>
          <div
            role="presentation"
            onClick={() => {
              if (activePage < totalPages) {
                // 현재 페이지가 마지막 페이지보다 작을 때만 다음 페이지로 이동
                window.scrollTo(0, 0); // 페이지를 위쪽으로 스크롤
                getCurrentPage(activePage + 1, "next");
              }
            }}
            className={`page-link ${
              activePage === totalPages ? styles.disabled : ""
            }`}
          >
            &gt;
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
