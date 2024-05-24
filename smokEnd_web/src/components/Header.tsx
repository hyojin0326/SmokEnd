import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import menu from "../assets/mobile_menu.png";
import menuWhite from "../assets/mobile_menu_white.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const [menuOpen, setMenuOpen] = useState(false);
  const isAboutPage = location.pathname === "/Introduction";
  const [response, setResponse] = useState('');

  useEffect(() => {
    const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // setIsLoggedIn(!!sessionId);
    if(sessionId===""){
      setIsLoggedIn(false);
    }
    else{
      setIsLoggedIn(true);
    }
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    // 쿠키에 저장된 값을 참조하는 겁니다. 꼭 있어야 합니다.
    const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');
    
    if (!sessionId) { // 로그인이 필요함을 알려주시면 됩니다
      setResponse('로그인이 필요합니다');
      return;
    }

    await fetch('https://api-e76gdpmm5q-uc.a.run.app/api/auth/w/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId })
    })
      .then(async response => {
        if (response.status === 200) { // 로그아웃 완료

            document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // 쿠키를 삭제합니다
            document.cookie = 'userStats=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            const resData = await response.text();
            setResponse(resData); // response에 메세지가 담깁니다
            console.log('로그아웃:', resData);
            setIsLoggedIn(false);
            alert("로그아웃 성공");
            window.location.href = '/';

        } else if(response.status === 401) { // 세션이 유효하지 않은 경우입니다
            const resData = await response.text();
            setResponse(resData); // response에 메세지가 담깁니다
            console.log('로그아웃 실패(세션 유효):', resData);

        } else if(response.status === 500) { // 서버 문제 입니다
            const resData = await response.text();
            setResponse(resData); // response에 메세지가 담깁니다
            console.log('로그아웃 실패(서버):', resData);
            
        }
      })
    };

    //로그인 안한 상태일때 헤더부분의 내용을 클릭시 
    //로그인이 필요한 서비스입니다. 띄워주고 로그인으로 이동
    const handleProtectedClick = () => {
      if (!isLoggedIn) {
        alert('로그인이 필요한 서비스입니다.');
        //navigate쓰려했는데 왜 안되지
        // window.location.href = '/login';
      } else {
        // 로그인한 경우 수행할 작업
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
                        <p className={styles.loggedInli}><Link to="/introduction" className={styles.Link}>SmokEnd 소개</Link></p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.box}>
                    <div className={styles.linkContainer}>
                      <a className={styles.loggedIna}>금연</a>
                      <div className={styles.subMenu}>
                        <p className={styles.loggedInli}><Link to="/noSmokingArea" className={styles.Link}>금연 지도</Link></p>
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
                        <p className={styles.loggedInli3}><Link to="/selfAssessment/nicotine" className={styles.Link}>니코틴 의존도 진단</Link></p>
                        <br />
                        <p className={styles.loggedInli3}><Link to="/selfAssessment/habit" className={styles.Link}>나의 흡연습관 평가</Link></p>
                        <br />
                        <p className={styles.loggedInli3}><Link to="/selfAssessment/knowledge" className={styles.Link}>흡연 상식 점검</Link></p>
                        <br />
                        <p className={styles.loggedInli3}><Link to="/selfAssessment/condition" className={styles.Link}>나의 신체상태 진단</Link></p>
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
      <div
        className={
          isAboutPage ? styles.MobiledefaultHeader : styles.MobileloggedInHeader
        }
      >
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
                      <p className={styles.loggedInli} onClick={handleProtectedClick}>SmokEnd 소개</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer}>
                    <a className={styles.loggedOuta}>금연</a>
                    <div className={styles.logOutsubMenu}>
                      <p className={styles.loggedInli} onClick={handleProtectedClick}>금연 지도</p>
                      <br />
                      <p className={styles.loggedInli} onClick={handleProtectedClick}>
                        {/* <Link to="/SmokeText" className={styles.Link1}> */}
                          흡연의 위험성
                        {/* </Link> */}
                      </p>
                      <br />
                      <p className={styles.loggedInli} onClick={handleProtectedClick}>
                        {/* <Link to="/SmokeText" className={styles.Link1}> */}
                          금연의 필요성
                        {/* </Link> */}
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
                      <p className={styles.loggedInli} onClick={handleProtectedClick}>담배 케이스</p>
                      <br />
                      <p className={styles.loggedInli} onClick={handleProtectedClick}>금연 상품</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles.li}>
                <div className={styles.box}>
                  <div className={styles.linkContainer2}>
                    <a className={styles.loggedOuta}>자가진단</a>
                    <div className={styles.logOutsubMenu}>
                      <p className={styles.loggedInli3} onClick={handleProtectedClick}>니코틴 의존도 진단</p>
                      <br />
                      <p className={styles.loggedInli3} onClick={handleProtectedClick}>나의 흡연습관 평가</p>
                      <br />
                      <p className={styles.loggedInli3} onClick={handleProtectedClick}>흡연 상식 점검</p>
                      <br />
                      <p className={styles.loggedInli3} onClick={handleProtectedClick}>나의 신체상태 진단</p>
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