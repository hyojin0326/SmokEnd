import React, { useState } from "react";
import styles from "../styles/Header.module.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const loggedInHeader = (
    <nav>
      <div className={styles.loggedInheader}>
        <div className={styles.loggedInheaderleft}>
          <div className={styles.loggedInlogo}>
            Smok<div className={styles.loggedInlogo2}>E</div>nd
          </div>
        </div>
        <div className={styles.loggedInheaderright}>
          <div className={styles.dropdownContainer}>
            <ul>
              <div className={styles.loggedInText}>
                <li className={styles.li}>
                  <div className={styles.box}>
                    <div className={styles.linkContainer}>
                      <a className={styles.loggedIna}>소개</a>
                      <div className={styles.subMenu}>
                        <p className={styles.loggedInli}>SmokEnd 소개</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.box}>
                    <div className={styles.linkContainer}>
                      <a className={styles.loggedIna}>금연</a>
                      <div className={styles.subMenu}>
                        <p className={styles.loggedInli}>금연 지도</p>
                        <br />
                        <p className={styles.loggedInli}>흡연의 위험성</p>
                        <br />
                        <p className={styles.loggedInli}>금연의 필요성</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.box}>
                    <div className={styles.linkContainer}>
                      <a className={styles.loggedIna}>상품</a>
                      <div className={styles.subMenu}>
                        <p className={styles.loggedInli}>담배 케이스</p>
                        <br />
                        <p className={styles.loggedInli}>금연 상품</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.box}>
                    <div className={styles.linkContainer2}>
                      <a className={styles.loggedIna}>자가진단</a>
                      <div className={styles.subMenu}>
                        <p className={styles.loggedInli3}>니코틴 의존도 진단</p>
                        <br />
                        <p className={styles.loggedInli3}>나의 흡연습관 평가</p>
                        <br />
                        <p className={styles.loggedInli3}>흡연 상식 점검</p>
                        <br />
                        <p className={styles.loggedInli3}>나의 신체상태 진단</p>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
              <li className={styles.li}>
                <div className={styles.box2}>
                  <div className={styles.linkContainer3}>
                    <div className={styles.loggedIna}>
                      DUDIN<div className={styles.margin}></div>
                      <a>29 p</a>
                    </div>

                    <div className={styles.subMenu}>
                      <p className={styles.loggedInli2} onClick={handleLogout}>
                        LOGOUT
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );

  const loggedOutHeader = (
    <nav>
      <div className={styles.loggedOutheader}>
        <div className={styles.loggedOutheaderleft}>
          <div className={styles.loggedOutlogo}>
            Smok<div className={styles.loggedOutlogo2}>E</div>nd
          </div>
        </div>
        <div className={styles.loggedOutheaderright}>
          <ul>
            <div className={styles.loggedInText}>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer}>
                    <a className={styles.loggedOuta}>소개</a>
                    <div className={styles.logOutsubMenu}>
                      <p className={styles.loggedInli}>SmokEnd 소개</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer}>
                    <a className={styles.loggedOuta}>금연</a>
                    <div className={styles.logOutsubMenu}>
                      <p className={styles.loggedInli}>금연 지도</p>
                      <br />
                      <p className={styles.loggedInli}>흡연의 위험성</p>
                      <br />
                      <p className={styles.loggedInli}>금연의 필요성</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer}>
                    <a className={styles.loggedOuta}>상품</a>
                    <div className={styles.logOutsubMenu}>
                      <p className={styles.loggedInli}>담배 케이스</p>
                      <br />
                      <p className={styles.loggedInli}>금연 상품</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer2}>
                    <a className={styles.loggedOuta}>자가진단</a>
                    <div className={styles.logOutsubMenu}>
                      <p className={styles.loggedInli3}>니코틴 의존도 진단</p>
                      <br />
                      <p className={styles.loggedInli3}>나의 흡연습관 평가</p>
                      <br />
                      <p className={styles.loggedInli3}>흡연 상식 점검</p>
                      <br />
                      <p className={styles.loggedInli3}>나의 신체상태 진단</p>
                    </div>
                  </div>
                </div>
              </li>
            </div>
            <li className={styles.li}>
              <div className={styles.box}>
                <div className={styles.linkContainer4}>
                  <a className={styles.loggedOuta2} onClick={handleLogin}>
                    Login
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  return isLoggedIn ? loggedInHeader : loggedOutHeader;
}

export default Header;
