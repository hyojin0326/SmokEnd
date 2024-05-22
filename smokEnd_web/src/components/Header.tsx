import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import menu from "../assets/mobile_menu.png";
import menuWhite from "../assets/mobile_menu_white.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

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
                        <p className={styles.loggedInli}>
                          <Link to="/SmokeText" className={styles.Link}>
                            흡연의 위험성
                          </Link>
                        </p>
                        <br />
                        <p className={styles.loggedInli}>
                          <Link to="/SmokeText" className={styles.Link}>
                            금연의 필요성
                          </Link>
                        </p>
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
      <div></div>
    </nav>
  );

  const MobileloggedInHeader = (
    <nav>
      <div className={styles.MobileloggedInHeader}>
        <div className={styles.menu} onClick={handleMenuClick}>
          <img src={menu} />
        </div>
        <div className={styles.loggedInheaderleft}>
          <div className={styles.loggedInlogo}>
            Smok<div className={styles.loggedInlogo2}>E</div>nd
          </div>
        </div>
        {menuOpen && (
          <>
            <div
              className={styles.menuOpenBackground}
              onClick={handleMenuClick}
            >
              <div className={styles.menuOpenContent}>
                <div className={styles.MobileBox}>
                  <p className={styles.MobileloggedInli}>소개</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>SmokEnd 소개</p>
                  <br />
                  <p className={styles.MobileloggedInli}>금연</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>금연 지도</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>
                    <Link to="/SmokeText" className={styles.Link}>
                      흡연의 위험성
                    </Link>
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli2}>
                    <Link to="/SmokeText" className={styles.Link}>
                      금연의 필요성
                    </Link>
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli}>상품</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>담배 케이스</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>금연 상품</p>
                  <br />
                  <p className={styles.MobileloggedInli}>자가진단</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>니코틴 의존도 진단</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>나의 흡연습관 평가</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>흡연 상식 점검</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>나의 신체상태 진단</p>
                  <br />
                  <div>
                    <a className={styles.MobileloggedInli4}>DUDIN</a>
                    <a className={styles.MobileloggedInli3}>29 p</a>
                    <a className={styles.MobileloggedInli3}>/</a>
                    <a
                      className={styles.MobileloggedInli3}
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
                      <p className={styles.loggedInli}>
                        <Link to="/SmokeText" className={styles.Link1}>
                          흡연의 위험성
                        </Link>
                      </p>
                      <br />
                      <p className={styles.loggedInli}>
                        <Link to="/SmokeText" className={styles.Link1}>
                          금연의 필요성
                        </Link>
                      </p>
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
                    <Link to="/login" className={styles.Link1}>
                      Login
                    </Link>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  const MobileloggedOutHeader = (
    <nav>
      <div className={styles.MobileloggedOutHeader}>
        <div className={styles.menu} onClick={handleMenuClick}>
          <img src={menuWhite} />
        </div>
        <div className={styles.loggedOutheaderleft}>
          <div className={styles.loggedOutlogo}>
            Smok<div className={styles.loggedOutlogo2}>E</div>nd
          </div>
        </div>
        {menuOpen && (
          <>
            <div
              className={styles.menuOpenBackground}
              onClick={handleMenuClick}
            >
              <div className={styles.menuOpenContent}>
                <div className={styles.MobileBox}>
                  <p className={styles.MobileloggedInli}>소개</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>SmokEnd 소개</p>
                  <br />
                  <p className={styles.MobileloggedInli}>금연</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>금연 지도</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>
                    <Link to="/SmokeText" className={styles.Link}>
                      흡연의 위험성
                    </Link>
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli2}>
                    <Link to="/SmokeText" className={styles.Link}>
                      금연의 필요성
                    </Link>
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli}>상품</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>담배 케이스</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>금연 상품</p>
                  <br />
                  <p className={styles.MobileloggedInli}>자가진단</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>니코틴 의존도 진단</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>나의 흡연습관 평가</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>흡연 상식 점검</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>나의 신체상태 진단</p>
                  <br />
                  <div>
                    <p
                      className={styles.MobileloggedInli4}
                      onClick={handleLogin}
                    >
                      <Link to="/login" className={styles.Link}>
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
  return isLoggedIn
    ? isMobile
      ? MobileloggedInHeader
      : loggedInHeader
    : isMobile
    ? MobileloggedOutHeader
    : loggedOutHeader;
}

export default Header;
