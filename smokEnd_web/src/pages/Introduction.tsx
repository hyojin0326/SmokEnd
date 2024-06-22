import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Introduction.module.css";
import LOGO9 from "../assets/Introduction/LOGO9.png";
import LOGO12 from "../assets/Introduction/LOGO12.png";
import background1 from "../assets/Introduction/background1.jpg";
import background2 from "../assets/Introduction/background2.png";
import phone1 from "../assets/Introduction/phone1.png";
import phone2 from "../assets/Introduction/phone2.png";
import phone3 from "../assets/Introduction/phone3.png";
import phone4 from "../assets/Introduction/phone4.png";
import phone5 from "../assets/Introduction/phone5.png";
import web from "../assets/Introduction/web.png";
import web2 from "../assets/Introduction/web2.png";
import circle from "../assets/Introduction/circle.png";
import caseImage from "../assets/Introduction/case.png";
import test from "../assets/Introduction/test.jpg";

function Introduction() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <div className={styles.MMOMBox}>
          <div className={styles.MouterContainer}>
            <div className={styles.MinnerContainer}>
              <div className={styles.backgroundImg}>
                <div className={styles.backSize}>
                  <div className={styles.inSide}>
                    <div className={styles.Fp}>금연의 모든 것</div>
                    <br />
                    <br />
                    <div className={styles.Flogo}>
                      Smok<div className={styles.Flogo2}>E</div>nd
                    </div>
                    <div className={styles.Fp}>에서</div> <br />
                    <br />
                    <div className={styles.Fp}> 함께 합니다.</div>
                    {/* <img
                      src={phone1}
                      alt="phone1"
                      className={styles.phoneImage}
                    /> */}
                    <div className={styles.logoContainer}>
                      <img src={LOGO12} alt="phone1" className={styles.LOGO} />
                    </div>
                    <br />
                  </div>
                </div>
              </div>{" "}
              <div className={styles.backSize2}>
                <div className={styles.inSide2}>
                  <div className={styles.Fname}>함께,</div>
                  <br />
                  <img
                    src={phone2}
                    alt="phone2"
                    className={styles.phoneImage2}
                  />
                  <br />{" "}
                  <div className={styles.Grey}>
                    <div className={styles.logo}>
                      Smok<div className={styles.logo2}>E</div>nd
                    </div>
                    <div className={styles.p}>는 금연을 필요로하는 </div>
                    <br />
                    <div className={styles.p}>
                      흡연자를 위한 앱과 웹페이지, 스마트 담배갑
                    </div>
                    <br />
                    <div className={styles.p}>
                      그리고 건강하고 새로운 시작을 지원합니다.
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
              <div className={styles.backgroundC}>
                <div className={styles.backSize2}>
                  <div className={styles.inSide3}>
                    <div className={styles.Fname}>
                      조금씩, <br />
                      하지만 확실하게.
                    </div>{" "}
                    <br />
                    <img src={phone3} className={styles.phoneImage2} />
                    <br />
                    <div className={styles.Grey}>
                      <div className={styles.p}>
                        선택한 기간동안의 하루 목표치를
                      </div>{" "}
                      <br />
                      <div className={styles.p}>
                        평소 내가 피우던 양에 기반하여
                      </div>{" "}
                      <br />
                      <div className={styles.p}>자동으로 설정합니다.</div>
                      <br />
                    </div>
                  </div>
                </div>
                <br />
                <div className={styles.backSize2}>
                  <div className={styles.inSide2}>
                    <div className={styles.Fname}>기록은 편하게, </div>
                    <br />
                    <img src={caseImage} className={styles.caseImage} />
                    <br />
                    <div className={styles.Grey}>
                      <div className={styles.p}>하루의 흡연 상황을</div> <br />
                      <div className={styles.logo}>
                        Smok<div className={styles.logo2}>E</div>nd
                      </div>
                      <div className={styles.p}>케이스를 통해</div> <br />
                      <div className={styles.p}>자동으로 측정/갱신합니다. </div>
                      <br />
                      <br /> <br />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className={styles.backSize2}>
                <div className={styles.inSide3}>
                  <div className={styles.Fname}>노력의 결실을 한 눈에. </div>
                  <br />
                  <img
                    src={phone4}
                    alt="phone1"
                    className={styles.phoneImage2}
                  />{" "}
                  <br />
                  <div className={styles.Grey}>
                    <div className={styles.p}>캘린더를 통해 나의</div> <br />
                    <div className={styles.p}> 목표달성 현황을 </div>
                    <br />
                    <div className={styles.p}>한 눈에 확인 합니다. </div>
                    <br />
                  </div>
                </div>
              </div>
              <br />
              <div className={styles.backSize2}>
                <div className={styles.inSide2}>
                  <div className={styles.Fname}>남들 보다 더. </div>
                  <br />
                  <img src={phone5} className={styles.phoneImage2} /> <br />
                  <div className={styles.Grey}>
                    <div className={styles.p}>
                      주간 랭킹을 통해 보상을 지급하여
                    </div>{" "}
                    <br />
                    <div className={styles.p}>
                      금연의 또 다른 동기를 부여해 주었습니다.
                    </div>{" "}
                    <br />
                    <div className={styles.p}>자동으로 측정/갱신합니다 </div>
                    <br />
                  </div>
                </div>
              </div>
              <br />
              <div className={styles.backgroundC}>
                <div className={styles.backSize2}>
                  <div className={styles.inSide3}>
                    <div className={styles.Fname}>
                      금연 성공, <br />
                      마일리지로 누리는 혜택
                    </div>
                    <br />
                    <div className={styles.scrollContainer}>
                      <img src={web} className={styles.webImage} />{" "}
                      <img src={web2} className={styles.webImage2} />
                    </div>{" "}
                    <br />
                    <div className={styles.Grey}>
                      <div className={styles.p}>목표를 달성하여 획득한</div>{" "}
                      <br />
                      <div className={styles.p}>마일리지를 통해 </div>
                      <br />
                      <div className={styles.p}>
                        금연에 도움이 되는 여러 상품을
                      </div>{" "}
                      <br />
                      <div className={styles.p}>구매할 수 있습니다. </div>
                      <br />
                      <br /> <br />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className={styles.McenterCircleBigContainer}>
                <div className={styles.McenterCircleContainer}>
                  <img src={circle} className={styles.circle} />
                  <br />
                  <p className={styles.circleP}>
                    개발자들의 이야기가 궁금하다면 <br />
                    스크롤 해주세용 !
                  </p>
                  <br />
                  <img src={circle} className={styles.circle} />
                  <img src={test} className={styles.test} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.MOMBox}>
        <div className={styles.innerContainer}>
          <div className={styles.container}>
            <div className={styles.background}>
              <img
                src={background1}
                alt="background1"
                className={styles.backgroundImage}
              />
              <div className={styles.Incontainer}>
                <div className={styles.phone1}>
                  <img
                    src={phone1}
                    alt="phone1"
                    className={styles.phoneImage}
                  />
                  <div className={styles.rightBox}>
                    <div className={styles.logo}>
                      Smok<div className={styles.logo2}>E</div>nd
                    </div>
                    <p className={styles.p}>에 오신 걸 환영 합니다.</p>
                    <br />
                    <br />
                    <p className={styles.p}>지금 부터</p>
                    <div className={styles.logo}>
                      Smok<div className={styles.logo2}>E</div>nd
                    </div>
                    <p className={styles.p}>의 이야기를 시작합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.innerContainer}>
          <div className={styles.container}>
            <div className={styles.background}>
              <img
                src={background2}
                alt="background2"
                className={styles.backgroundImage2}
              />
              <div className={styles.Incontainer}>
                <div className={styles.phone2}>
                  <img
                    src={phone2}
                    alt="phone2"
                    className={styles.phoneImage2}
                  />
                  <div className={styles.leftBox}>
                    <div className={styles.Fname}>함께, </div>
                    <br />
                    <br />
                    <div className={styles.Grey}>
                      <div className={styles.logo}>
                        Smok<div className={styles.logo2}>E</div>nd
                      </div>
                      <p className={styles.p}>는 금연을 필요로하는</p>
                      <br />
                      <br />
                      <p className={styles.p}>
                        흡연자를 위한 앱과 웹페이지, 스마트 담배갑
                      </p>
                      <br />
                      <br />
                      <p className={styles.p}>
                        그리고 건강하고 새로운 시작을 지원합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.innerContainer}>
          <div className={styles.container}>
            <div className={styles.background}>
              <div className={styles.Incontainer}>
                <div className={styles.phone3}>
                  <img src={phone3} className={styles.phoneImage2} />
                  <div className={styles.rightBox3}>
                    <div className={styles.Fname}>조금씩, 하지만 확실하게.</div>
                    <br />
                    <br />

                    <div className={styles.Grey}>
                      <p className={styles.p}>
                        선택한 기간동안의 하루 목표치를
                      </p>
                      <br />
                      <br />
                      <p className={styles.p}>평소 내가 피우던 양에 기반하여</p>
                      <br />
                      <br />
                      <p className={styles.p}>자동으로 설정합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.innerContainer}>
          <div className={styles.container}>
            <div className={styles.background}>
              <div className={styles.Incontainer}>
                <div className={styles.phone4}>
                  <img src={caseImage} className={styles.caseImage} />
                  <div className={styles.leftBox4}>
                    <div className={styles.Fname}>기록은 편하게, </div>
                    <br />
                    <br />
                    <div className={styles.Grey}>
                      <p className={styles.p}>하루의 흡연 상황을</p>
                      <br />
                      <br />
                      <div className={styles.logo}>
                        Smok<div className={styles.logo2}>E</div>nd
                      </div>
                      <p className={styles.p}> 케이스를 통해</p>
                      <br />
                      <br />
                      <p className={styles.p}>자동으로 측정/갱신합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.innerContainer}>
          <div className={styles.container}>
            <div className={styles.background}>
              <div className={styles.Incontainer}>
                <div className={styles.phone5}>
                  <img
                    src={phone4}
                    alt="phone1"
                    className={styles.phoneImage2}
                  />
                  <div className={styles.rightBox5}>
                    <div className={styles.Fname}>노력의 결실을 한 눈에.</div>
                    <br />
                    <br />

                    <div className={styles.Grey}>
                      <p className={styles.p}>캘린더를 통해 나의</p>
                      <br />
                      <br />
                      <p className={styles.p}>목표달성 현황을</p>
                      <br />
                      <br />
                      <p className={styles.p}>한 눈에 확인 합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.innerContainer}>
          <div className={styles.container}>
            <div className={styles.background}>
              <img
                src={background2}
                alt="background2"
                className={styles.backgroundImage6}
              />
              <div className={styles.Incontainer}>
                <div className={styles.phone6}>
                  <img src={phone5} className={styles.phoneImage2} />
                  <div className={styles.leftBox6}>
                    <div className={styles.Fname}>남들 보다 더. </div>
                    <br />
                    <br />
                    <div className={styles.Grey}>
                      <p className={styles.p}>
                        주간 랭킹을 통해 보상을 지급하여
                      </p>
                      <br />
                      <br />
                      <p className={styles.p}>
                        금연의 또 다른 동기를 부여해 주었습니다.
                      </p>
                      <br />
                      <br />
                      <p className={styles.p}>자동으로 측정/갱신합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.innerContainer}>
          <div className={styles.container}>
            <div className={styles.background}>
              <div className={styles.Incontainer}></div>
              <div className={styles.web}>
                <img src={web} className={styles.webImage} />
                <div className={styles.rightBoxWeb}>
                  <div className={styles.Fname}>
                    금연 성공, 마일리지로 누리는 혜택
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.innerContainer}>
          <div className={styles.container}>
            <div className={styles.background}>
              <div className={styles.Incontainer}></div>
              <div className={styles.web2}>
                <img src={web2} className={styles.webImage} />
                <div className={styles.leftBoxWeb}>
                  <div className={styles.Grey}>
                    <p className={styles.p}>목표를 달성하여 획득한</p>
                    <br />
                    <br />
                    <p className={styles.p}>마일리지를 통해</p>
                    <br />
                    <br />
                    <p className={styles.p}>금연에 도움이 되는 여러 상품을</p>
                    <br />
                    <br />
                    <p className={styles.p}>구매할 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.centerCircleBigContainer}>
          <div className={styles.centerCircleContainer}>
            <img src={circle} className={styles.circle} />
            <br />
            <p className={styles.circleP}>
              개발자들의 이야기가 궁금하다면 스크롤 해주세용 !
            </p>
            <br />
            <img src={circle} className={styles.circle} />
            <img src={test} className={styles.test} />
          </div>
        </div>
      </div>
    </>
  );
}



export default Introduction;
