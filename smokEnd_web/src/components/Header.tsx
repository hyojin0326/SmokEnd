import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import menu from "../assets/mobile_menu.png";
import menuWhite from "../assets/mobile_menu_white.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const isAboutPage = location.pathname === "/introduction";
  const [response, setResponse] = useState("");

  useEffect(() => {
    const sessionId = document.cookie.replace(
      /(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // setIsLoggedIn(!!sessionId);
    if (sessionId === "") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // const handleMenuClick = () => {
  //   setMenuOpen(!menuOpen);
  // };

  const handleMenuClick = () => {
    //메뉴를 닫는 경우
    if (menuOpen) {
      setSlideIn(false);
      setTimeout(() => {
        setMenuOpen(false);
      }, 500); // 애니메이션 지속 시간 (0.5초)와 일치시킵니다.
    } else {
      //메뉴를 여는 경우
      setMenuOpen(true);
      setSlideIn(true);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    if (isLoading) {
      alert("로그아웃 중입니다.");
      return;
    }
    // 쿠키에 저장된 값을 참조하는 겁니다. 꼭 있어야 합니다.
    const sessionId = document.cookie.replace(
      /(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!sessionId) {
      // 로그인이 필요함을 알려주시면 됩니다
      setResponse("로그인이 필요합니다");
      return;
    }

    await fetch(`${import.meta.env.VITE_URL_API}/api/auth/w/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    }).then(async (response) => {
      if (response.status === 200) {
        // 로그아웃 완료

        document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 쿠키를 삭제합니다
        document.cookie = "userStats=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        const resData = await response.text();
        setResponse(resData); // response에 메세지가 담깁니다
        console.log("로그아웃:", resData);
        alert("로그아웃 성공");
        window.location.href = "/";
      } else if (response.status === 401) {
        // 세션이 유효하지 않은 경우입니다
        const resData = await response.text();
        setResponse(resData); // response에 메세지가 담깁니다
        console.log("로그아웃 실패(세션 유효):", resData);
      } else if (response.status === 500) {
        // 서버 문제 입니다
        const resData = await response.text();
        setResponse(resData); // response에 메세지가 담깁니다
        console.log("로그아웃 실패(서버):", resData);
      }
      setIsLoggedIn(false);
    });
  };

  //로그인 안한 상태일때 헤더부분의 내용을 클릭시
  //로그인이 필요한 서비스입니다. 띄워주고 로그인으로 이동
  const handleProtectedClick = (
    event: React.MouseEvent<HTMLParagraphElement>,
    link: string
  ) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      //navigate쓰려했는데 왜 안되지
      window.location.href = "/login";
    } else {
      // 로그인한 경우 수행할 작업
      window.location.href = link;
    }
  };

  const loggedInHeader = (
    <nav>
      <div
        className={isAboutPage ? styles.defaultHeader : styles.loggedInheader}
      >
        <div className={styles.loggedInheaderleft}>
          <Link to="/" className={styles.Link}>
            <div className={styles.loggedInlogo}>
              Smok<div className={styles.loggedInlogo2}>E</div>nd
            </div>
          </Link>
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
                        <p className={styles.loggedInli}>
                          <Link to="/introduction" className={styles.Link}>
                            SmokEnd 소개
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.box}>
                    <div className={styles.linkContainer}>
                      <a className={styles.loggedIna}>금연</a>
                      <div className={styles.subMenu}>
                        <p
                          className={styles.loggedInli}
                          onClick={(event) =>
                            handleProtectedClick(event, "/noSmokingArea")
                          }
                        >
                          금연 지도
                        </p>
                        <br />
                        <p
                          className={styles.loggedInli}
                          onClick={(event) =>
                            handleProtectedClick(event, "/SmokeText")
                          }
                        >
                          흡연의 위험성
                        </p>
                        <br />
                        <p
                          className={styles.loggedInli}
                          onClick={(event) =>
                            handleProtectedClick(event, "/smokeText")
                          }
                        >
                          금연의 필요성
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
                        <p
                          className={styles.loggedInli}
                          onClick={(event) =>
                            handleProtectedClick(event, "/smokEndCase")
                          }
                        >
                          담배 케이스
                        </p>
                        <br />
                        <p
                          className={styles.loggedInli}
                          onClick={(event) =>
                            handleProtectedClick(event, "/shop")
                          }
                        >
                          금연 상품
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.box}>
                    <div className={styles.linkContainer2}>
                      <a className={styles.loggedIna}>자가진단</a>
                      <div className={styles.subMenu}>
                        <p
                          className={styles.loggedInli3}
                          onClick={(event) =>
                            handleProtectedClick(
                              event,
                              "/selfAssessment/nicotine"
                            )
                          }
                        >
                          니코틴 의존도 진단
                        </p>
                        <br />
                        <p
                          className={styles.loggedInli3}
                          onClick={(event) =>
                            handleProtectedClick(event, "/selfAssessment/habit")
                          }
                        >
                          나의 흡연습관 평가
                        </p>
                        <br />
                        <p
                          className={styles.loggedInli3}
                          onClick={(event) =>
                            handleProtectedClick(
                              event,
                              "/selfAssessment/knowledge"
                            )
                          }
                        >
                          흡연 상식 점검
                        </p>
                        <br />
                        <p
                          className={styles.loggedInli3}
                          onClick={(event) =>
                            handleProtectedClick(
                              event,
                              "/selfAsssessment/condition"
                            )
                          }
                        >
                          나의 신체상태 진단
                        </p>
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

  const MobileloggedInHeader = (
    <nav>
      <div
        className={
          isAboutPage ? styles.MobiledefaultHeader : styles.MobileloggedInHeader
        }
      >
        <div className={styles.menu} onClick={handleMenuClick}>
          <img src={menu} />
        </div>
        <div className={styles.loggedInheaderleft}>
          <Link to="/" className={styles.Link}>
            <div className={styles.loggedInlogo}>
              Smok<div className={styles.loggedInlogo2}>E</div>nd
            </div>
          </Link>
        </div>
        {menuOpen && (
          <>
            <div
              className={styles.menuOpenBackground}
              onClick={handleMenuClick}
            >
              <div
                className={
                  slideIn ? styles.menuOpenContent : styles.menuCloseContent
                }
              >
                <div className={styles.MobileBox}>
                  <p className={styles.MobileloggedInli}>소개</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>
                    <Link to="/introduction" className={styles.Link}>
                      SmokEnd 소개
                    </Link>
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli}>금연</p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/noSmokingArea")
                    }
                  >
                    금연 지도
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/smokeText")
                    }
                  >
                    흡연의 위험성
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/smokeText")
                    }
                  >
                    금연의 필요성
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli}>상품</p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/smokEndCase")
                    }
                  >
                    담배 케이스
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) => handleProtectedClick(event, "/shop")}
                  >
                    금연 상품
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli}>자가진단</p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/selfAssessment/nicotine")
                    }
                  >
                    니코틴 의존도 진단
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/selfAssessment/habit")
                    }
                  >
                    나의 흡연습관 평가
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/selfAssessment/knowledge")
                    }
                  >
                    흡연 상식 점검
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/selfAssessment/condition")
                    }
                  >
                    나의 신체상태 진단
                  </p>
                  <br />
                  <div>
                    <a className={styles.MobileloggedInli4}>DUDIN</a>
                    <a className={styles.MobileloggedInli3}>29 p</a>
                    <a className={styles.MobileloggedInli3}>/</a>
                    <p
                      className={styles.MobileloggedInli3}
                      onClick={handleLogout}
                    >
                      LOGOUT
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

  const loggedOutHeader = (
    <nav>
      <div className={styles.loggedOutheader}>
        <div className={styles.loggedOutheaderleft}>
          <Link to="/" className={styles.Link}>
            <div className={styles.loggedOutlogo}>
              Smok<div className={styles.loggedOutlogo2}>E</div>nd
            </div>
          </Link>
        </div>
        <div className={styles.loggedOutheaderright}>
          <ul>
            <div className={styles.loggedInText}>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer}>
                    <a className={styles.loggedOuta}>소개</a>
                    <div className={styles.logOutsubMenu}>
                      <p className={styles.loggedInli}>
                        <Link
                          to="/introduction"
                          style={{ color: "white" }}
                          className={styles.Link}
                        >
                          SmokEnd 소개
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer}>
                    <a className={styles.loggedOuta}>금연</a>
                    <div className={styles.logOutsubMenu}>
                      <p
                        className={styles.loggedInli}
                        onClick={(event) =>
                          handleProtectedClick(event, "/noSmokingArea")
                        }
                        style={{ color: "white" }}
                      >
                        금연 지도
                      </p>
                      <br />
                      <p
                        className={styles.loggedInli}
                        onClick={(event) =>
                          handleProtectedClick(event, "/smokeText")
                        }
                        style={{ color: "white" }}
                      >
                        흡연의 위험성
                      </p>
                      <br />
                      <p
                        className={styles.loggedInli}
                        onClick={(event) =>
                          handleProtectedClick(event, "/smokeText")
                        }
                        style={{ color: "white" }}
                      >
                        금연의 필요성
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
                      <p
                        className={styles.loggedInli}
                        onClick={(event) =>
                          handleProtectedClick(event, "/smokEndCase")
                        }
                        style={{ color: "white" }}
                      >
                        담배 케이스
                      </p>
                      <br />
                      <p
                        className={styles.loggedInli}
                        onClick={(event) =>
                          handleProtectedClick(event, "/shop")
                        }
                        style={{ color: "white" }}
                      >
                        금연 상품
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer2}>
                    <a className={styles.loggedOuta}>자가진단</a>
                    <div className={styles.logOutsubMenu}>
                      <p
                        className={styles.loggedInli3}
                        onClick={(event) =>
                          handleProtectedClick(
                            event,
                            "/selfAssessment/nicotine"
                          )
                        }
                        style={{ color: "white" }}
                      >
                        니코틴 의존도 진단
                      </p>
                      <br />
                      <p
                        className={styles.loggedInli3}
                        onClick={(event) =>
                          handleProtectedClick(event, "/selfAssessment/habit")
                        }
                        style={{ color: "white" }}
                      >
                        나의 흡연습관 평가
                      </p>
                      <br />
                      <p
                        className={styles.loggedInli3}
                        onClick={(event) =>
                          handleProtectedClick(
                            event,
                            "/selfAssessment/knowledge"
                          )
                        }
                        style={{ color: "white" }}
                      >
                        흡연 상식 점검
                      </p>
                      <br />
                      <p
                        className={styles.loggedInli3}
                        onClick={(event) =>
                          handleProtectedClick(
                            event,
                            "/selfAssessment/condition"
                          )
                        }
                        style={{ color: "white" }}
                      >
                        나의 신체상태 진단
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </div>
            <li className={styles.li}>
              <div className={styles.box}>
                <div className={styles.linkContainer4}>
                  <div className={styles.loggedOuta2} onClick={handleLogin}>
                    <Link to="/login" className={styles.Link1}>
                      Login
                    </Link>
                  </div>
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
          <Link to="/" className={styles.Link}>
            <div className={styles.loggedOutlogo}>
              Smok<div className={styles.loggedOutlogo2}>E</div>nd
            </div>
          </Link>
          `
        </div>
        {menuOpen && (
          <>
            <div
              className={styles.menuOpenBackground}
              onClick={handleMenuClick}
            >
              <div
                className={
                  slideIn ? styles.menuOpenContent : styles.menuCloseContent
                }
              >
                <div className={styles.MobileBox}>
                  <p className={styles.MobileloggedInli}>소개</p>
                  <br />
                  <p className={styles.MobileloggedInli2}>
                    <Link to="/introduction" className={styles.Link}>
                      SmokEnd 소개
                    </Link>
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli}>금연</p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/noSmokingArea")
                    }
                  >
                    금연 지도
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/SmokeText")
                    }
                  >
                    흡연의 위험성
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/SmokeText")
                    }
                  >
                    금연의 필요성
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli}>상품</p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/smokEndCase")
                    }
                  >
                    담배 케이스
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) => handleProtectedClick(event, "/shop")}
                  >
                    금연 상품
                  </p>
                  <br />
                  <p className={styles.MobileloggedInli}>자가진단</p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/selfAssessment/nicotine")
                    }
                  >
                    니코틴 의존도 진단
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/selfAssessment/habit")
                    }
                  >
                    나의 흡연습관 평가
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/selfAssessment/knowledge")
                    }
                  >
                    흡연 상식 점검
                  </p>
                  <br />
                  <p
                    className={styles.MobileloggedInli2}
                    onClick={(event) =>
                      handleProtectedClick(event, "/selfAssessment/condition")
                    }
                  >
                    나의 신체상태 진단
                  </p>
                  <br />
                  <div>
                    <div
                      className={styles.MobileloggedInli4}
                      onClick={handleLogin}
                    >
                      <Link to="/login" className={styles.Link}>
                        Login
                      </Link>
                    </div>
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
