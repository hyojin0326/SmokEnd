import React, { useState, useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "../styles/SmokeText.module.css";
import textwrite from "../assets/SmokeText/textwrite.png";
import dompurify from "dompurify";
import test from "../assets/SmokeText/test.jpg";
import SmokeTextById from "./SmokeTextById";

interface board {
  title: string;
  content: string;
}

const SmokeText: React.FC = () => {
  const [itemsData, setItemsData] = useState<board>();
  const isMobile = window.innerWidth <= 768;
  const [searchParams] = useSearchParams();
  var id = searchParams.get("id");
  const [category, setCategory] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { tab } = useParams();
  const navigate = useNavigate();
  const sanitizer = dompurify.sanitize;

  const clickId = "1";
  const title = "두경부암";
  const content =
    "<p>두경부암은 뇌, 뇌신경, 눈, 식도 등을 제외한 머리와 목 부위에 발생하는 암을 합쳐서 부르는 말로, 후두암, 인두암, 구강암, 비부비동암, 침샘암 등이 있으며, 이 중 흡연이 가장 확실한 발암 원인으로 꼽히는 암이 후두암, 구강암, 인두암입니다.</p><p>일본인 대상의 흡연과 두경부암 발병 및 사망률 관련 체계적 문헌고찰 및 메타분석 연구 결과에 따르면, 두경부암 발생과 사망 위험이 비흡연자 대비 흡연 경험자 2.4배, 현재 흡연자 2.7배, 과거 흡연자 1.5배 증가하였습니다. 또 다른 체계적 문헌고찰 연구에서는 전자담배와 두경부암 발병의 연관성을 확인할 수 있었으며, 이 연구에서 전자담배가 DNA 이중 가닥 파손 위험을 높이고 산화 스트레스를 포함한 시험관 내 손상을 유발할 수 있다는 증거를 제한적이나마 찾을 수 있었습니다.</p><p><br></p><p>한편, 음주 역시 두경부암의 대표적인 발병 원인으로, 음주와 흡연을 동시에 하는 경우 상승작용을 일으켜 암 발생 위험을 더욱 높입니다. 또한 일부 연구에서는 음주와 담배종류별 동반 사용에 대한 암 발생 위험을 확인하였으며, 음주와 일반담배(궐련) 및 무연담배 사용 시 암 발생위험이 16.2배로 가장 높았고, 음주와 무연담배 사용이 7.8배, 음주와 일반담배(궐련) 4.7배 순으로 나타났습니다.</p><p>금연은 가장 확실한 두경부암 예방책입니다. 금연을 하는 경우 두경부암의 발생 위험과 치료 및 예후에서 긍정적인 결과를 기대할 수 있습니다. 금연한 지 16년 지난 후부터는 후두암 발생 위험이 절반 수준으로 감소하며, 두경부암 환자가 금연하는 경우 치료 전, 치료 중 및 치료 후의 전 과정에 걸쳐 전체 생존율을 높이고 재발률을 줄이는 것으로 알려져 있습니다.</p><p><br></p>";
  const imgSrc =
    '<img src="https://www.nosmokeguide.go.kr/upload/thumb/b9149218-d81c-429e-a8ec-5f044eff175a.png">';

  const clickId2 = "2";
  const title2 = "액상형 전자담배로 인한 중증 폐질환(EVALI)";
  const content2 =
    " <p>2021년 초 의학저널 ‘소아호흡기학(Pediatric Pulmonology)’ 에서 발표된 임상 사례에 따르면, 액상형 전자담배로 인한 중증 폐 손상 의심환자로 보고된 16세 소년은 저산소증과 급성 호흡부전을 주 호소로 병원을 방문하였으며, 진행성 호흡곤란, 마른기침, 피로감, 체중감소, 경미한 객혈(피나 피가 섞인 가래를 기침과 함께 배출해내는 증상) 등의 증상이 추가적으로 보고되었습니다. 당시 지역 획득 폐렴, 코로나 19 바이러스 감염 등이 의심되어 여러 검사가 진행되었으나 모두 원인으로 보기 어려웠고, 결국 이 소년은 Tetrahydrocannaninol(THC, 대마성분)가 포함된 궐련 사용, 전자담배 사용이 원인으로 의심되는 중증 폐 손상으로 분류되었습니다.</p><p>이와 같이 Closed System Vaping(CSV, 폐쇄형 베이핑) 전자담배가 미국에서 선풍적인 인기를 끔과 동시에 액상형 전자담배 사용(이하 베이핑, vaping)으로 인한 폐 손상 사례와 이로 인한 사망이 다수 발생하였으며, 이를 현재는 ‘액상형 전자담배 관련 중증 폐질환(E-cigarette use or Vaping Associated Lung Injury, EVALI)’으로 명명하고 있습니다.</p><p>액상형 전자담배에 대한 더 많은 연구가 필요한 상황이지만, 이번 액상형 전자담배 관련 중증 폐질환(EVALI) 사태와 관련하여 발생현황과 쟁점을 다뤄보면서 그 위험성에 대해 경각심을 가질 필요가 있겠습니다.</p>";

  const imgSrc2 =
    '<img src="https://mblogthumb-phinf.pstatic.net/MjAyMDA4MTFfNjYg/MDAxNTk3MTA5NDUzNzMy.GaLolFSONQqXFXOV0qn1QoIHdbHkISt4U71Ua-3UkVYg.w4Mdio63f-hB_05eeBi02DRlju3bILvH0PtpO7km0rEg.PNG.nosmokeguide9030/02.png?type=w800">';

  const clickId3 = "3";
  const title3 = "두경부암";
  const content3 =
    "<p>흡연자에게 더 위험한 코로나19</p><p>공식적으로 코로나바이러스감염증-19라고 명명된 코로나19는 새로운 코로나바이러스인 SARS-CoV-2에 의해 발생하는 호흡기 감염병입니다. 이 바이러스에 감염되면 무증상부터 중증에 이르기까지 다양한 임상증상이 나타날 수 있습니다. 2019년 12월 중국 우한에서 첫 사례가 보고되었고, 국내에서도 1월 20일 첫 확진자가 발생했습니다.</p><p>코로나19의 치명률은 국가 간 차이가 있지만, 대략 3.4%입니다. 하지만 임신부, 65세 이상 성인, 당뇨병이나 심부전, 만성 호흡기 질환, 암 등을 앓는 만성 질환자들은 중증으로 진행할 확률이 훨씬 높습니다. 질병관리본부는 2020년 4월 4일 흡연자를 고위험군으로 추가했습니다.</p><p>담배를 피우면 코로나19에 더 잘 걸리게 되나요?</p><p>흡연자들은 코로나19에 감염될 가능성이 더 큽니다. 이에 대한 연구 결과는 아직 제한적이지만, 실내외 흡연구역에서 담배를 피우는 경우에 비말을 통한 감염 위험이 커지고, 오염된 손으로 담배를 피우는 행위도 바이러스가 몸으로 들어올 위험을 커지게 합니다. 코로나19 바이러스의 감염 수용체가, 흡연자에서 훨씬 더 많다는 보고도 있습니다. 2020년 8월 발표된 영국인 5만 3천여 명을 분석한 연구에 따르면, 여러 요인을 보정한 후에도 흡연자는 비흡연자에 비해 코로나19에 걸릴 위함이 79% 높았습니다. 마스크와 같이 전염을 막을 수 있는 필수적인 행동들을 흡연자는 30% 정도 덜 하는 것으로 나타났는데, 반면 코로나 19로 인해 심각한 위험이 있을 거란 걱정은 흡연자들이 34% 더 많이 하는 것으로 나타났습니다.</p><p><br></p>";
  const imgSrc3 =
    '<img src="https://www.nosmokeguide.go.kr/upload/thumb/8fe183b0-cb4b-47a6-857c-ed0ec4caa6f8.gif">';
  const sanitizedContent = sanitizer(content);
  const sanitizedContent2 = sanitizer(content2);
  const sanitizedContent3 = sanitizer(content3);
  const maxLength = 250;

  const displayContent =
    sanitizedContent.length > maxLength
      ? sanitizedContent.slice(0, maxLength) + "..."
      : sanitizedContent;
  const displayContent2 =
    sanitizedContent2.length > maxLength
      ? sanitizedContent2.slice(0, maxLength) + "..."
      : sanitizedContent2;
  const displayContent3 =
    sanitizedContent3.length > maxLength
      ? sanitizedContent3.slice(0, maxLength) + "..."
      : sanitizedContent3;

  useEffect(() => {
    if (tab !== undefined) {
      setCategory(tab);
    }

    const user = document.cookie.replace(
      /(?:(?:^|.*;\s*)userStats\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (user != "") {
      const userStats = JSON.parse(user);
      setIsAdmin(userStats.isAdmin);
      // setIsAdmin(false);
    }
  }, []);

  const clickBoard = () => {
    id = clickId!;
    navigate(`/smokeText/${category}?id=${id}`);
  };

  const scrollBoxRef = useRef<HTMLDivElement>(null); // 스크롤 박스의 ref

  // 각 탭을 클릭했을 때 호출되는 함수
  const handleTabClick = (category: string) => {
    navigate(`/smokeText/${category}`);
    setCategory(category);
  };

  //스크롤 박스가 항상 아래로 스크롤되도록 설정
  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, []);

  const TabContent: React.FC = () => {
    return (
      <div>
        <div className={styles.but}>
          {/* <button className={styles.noButtonStyle} onClick={addNewPost}> */}
          {isAdmin == true ? (
            <Link to={`/textWrite/${category}`}>
              <button className={styles.noButtonStyle}>
                <img src={textwrite} />
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.scrollBox} ref={scrollBoxRef}>
          {/* <div className={styles.post} /> */}
          <div className={styles.textBox}>
            <div className={styles.leftContainer} onClick={clickBoard}>
              <div className={styles.NickName}>관리자</div>
              <div className={styles.date}>2024년 05월 10일</div>
              <div className={styles.Name}>{title}</div>
              <div
                className={styles.NickName}
                dangerouslySetInnerHTML={{ __html: sanitizer(displayContent) }}
              ></div>
            </div>
            <div className={styles.imageContainer}>
              <div
                className={styles.imageContainer_img}
                dangerouslySetInnerHTML={{ __html: sanitizer(imgSrc) }}
              ></div>
            </div>
          </div>

          <div className={styles.textBox}>
            <div className={styles.leftContainer}>
              <div className={styles.NickName}>관리자</div>
              <div className={styles.date}>2024년 05월 10일</div>
              <div className={styles.Name}>{title2}</div>
              <div
                className={styles.NickName}
                dangerouslySetInnerHTML={{ __html: sanitizer(displayContent2) }}
              ></div>
            </div>
            <div className={styles.imageContainer}>
              <div
                className={styles.imageContainer_img}
                dangerouslySetInnerHTML={{ __html: sanitizer(imgSrc2) }}
              ></div>
            </div>
          </div>

          <div className={styles.textBox}>
            <div className={styles.leftContainer}>
              <div className={styles.NickName}>관리자</div>
              <div className={styles.date}>2024년 05월 10일</div>
              <div className={styles.Name}>{title3}</div>
              <div
                className={styles.NickName}
                dangerouslySetInnerHTML={{ __html: sanitizer(displayContent3) }}
              ></div>
            </div>
            <div className={styles.imageContainer}>
              <div
                className={styles.imageContainer_img}
                dangerouslySetInnerHTML={{ __html: sanitizer(imgSrc3) }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {id !== null ? (
        <SmokeTextById />
      ) : (
        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.bigBox}>
              <p className={styles.pageName}>담배</p>
              <p className={styles.p}>담배에 대해 얼마나 아십니까?</p>
            </div>
            <div className={styles.container}>
              <div
                className={`${styles.box} ${
                  category === "risk" ? styles.active : ""
                }`}
                onClick={() => handleTabClick("risk")}
              >
                <div className={styles.text}>흡연의 위험성</div>
              </div>

              <div
                className={`${styles.box} ${
                  category === "necessity" ? styles.active : ""
                }`}
                onClick={() => handleTabClick("necessity")}
              >
                <div className={styles.text}>금연의 필요성</div>
              </div>
            </div>
            <TabContent />
          </div>
        </div>
      )}
    </>
  );
};

export default SmokeText;
