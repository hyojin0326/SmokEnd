import Footer from "../components/Footer";
import styles from "../styles/NoSmokingArea.module.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

declare global {
    interface Window {
      kakao: any; // 필요한 경우 더 구체적인 타입을 정의할 수 있습니다.
    }
  }
  
const { kakao } = window;

interface Districts {
    [key: string]: string[];
}
interface MarkerData {
    name: string;
    lat: number;
    lng: number;
    address: string;
    number: string;
}

const districts: Districts = {
    충북: ['충주시', '청주시 흥덕구', '청주시 청원구', '청주시 서원구', '청주시 상당구', '진천군', '증평군', '제천시', '음성군', '옥천군', '영등군', '보은군', '단양군', '괴산군'],
    충남: ['홍성군', '태안군', '청양군', '천안시 서북구', '천안시 동남구', '예산군', '아산시', '서천군', '서산시', '부여군', '보령시', '당진시', '논산시', '금산군', '공주시', '계룡시'],
    제주특별자치도: ['제주시'],
    제주: ['제주시', '서귀포시'],
    전북: ['진안군', '정읍시', '전주시 완산구', '전주시 덕진구', '장수군', '임실군', '익산시', '완주군', '순창군', '부안군', '무주군', '남원시', '김제시', '군산시', '고창군'],
    전남: ['회순군', '해남군', '함평균', '진도군', '장흥군', '장성군', '완도군', '영암군', '영광군', '여수군', '여수시', '신안군', '순천시', '보성군', '무안군', '목포시', '담양군', '나주시', '구례군', '광양시', '곡성군', '고흥군', '강진군'],
    인천: ['중구', '연수구', '서구', '부평구', '마추홀구', '동구', '남동구', '남구', '계양구', '강화군'],
    울산: ['중구', '울주군', '북구', '동구', '남구'],
    세종: ['세종특별시'],
    서울: ['중량구', '중구', '종로구', '은평구', '용산구', '영등포구', '양천구', '송파구', '성북구', '성동구', '서초구', '서대문구', '마포구', '동작구', '동대문구', '도봉구', '노원구', '금천구', '구로구', '광진구', '관악구', '강서구', '강북구', '강동구', '강남구'],
    부산: ['해운대구', '중구', '영도구', '연제구', '수영구', '서구', '사하구', '사상구', '북구', '부산진구', '동래구', '동구', '남구', '기장군', '금정구', '강서구'],
    대전: ['중구', '유성구', '서구', '동구', '대덕구'],
    대구: ['중구', '수성구', '서구', '북구', '동구', '달성구', '달서구', '남구'],
    광주: ['서구', '북구', '동구', '남구', '광산구'],
    경북: ['포항시 남구', '포항시', '칠곡군', '청송군', '청도군', '의성군', '울릉군', '예천군', '영천시', '영주시', '영양군', '영덕군', '안동시', '성주군', '상주시', '봉화군', '문경시', '김천시', '군위군', '구미시', '고령군', '경주시', '경산시'],
    경남: ['합천군', '함양군', '함안군', '하동군', '통영시', '창원시 의창군', '창원시 마산합포구', '창원시', '창녕군', '진주시', '의령군', '양산시', '산청군', '사천시', '밀양시', '남해군', '김해시', '고성군', '거창군', '거제시'],
    경기: ['화성시', '하남시', '포천시', '평택시', '파주시', '이천시', '의정부시', '의왕시', '용인시', '오산시', '연천군', '여주시', '양평군', '양주시', '안양시', '안성시', '안산시 단원구', '안산시', '시흥시', '수원시', '성남시', '부천시', '동두천시', '남양주시', '김포시', '군포시', '구리시', '광주시', '광명시', '과천시', '고양시', '가평군'],
    강원: ['횡성군', '화전군', '홍천군', '평창군', '태백시', '춘천시', '철원군', '정선군', '인제군', '원주시', '영월군', '양양군', '양구군', '속초시', '삼척시', '동해시', '고성군', '강릉시']
};

function NoSmokingArea() {
    const isMobile = window.innerWidth <= 768;
    const [markerData, setMarkerData] = useState<MarkerData>({ name: "", lat: 0, lng: 0, address: "", number: "" });
    const [locationBoxes, setLocationBoxes] = useState<JSX.Element[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');

    const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(event.target.value);
        setSelectedDistrict(''); // Reset district selection when region changes
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(event.target.value);
    };
    const handleSearchClick = () => {
        console.log('선택된 지역:', selectedRegion);
        console.log('선택된 구:', selectedDistrict);
        createMap(selectedRegion,selectedDistrict);
    };

    useEffect(() => {
        const container = document.getElementById('map');
        // 지도의 중심을 마커의 위치로 설정
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
            level: 4 // 지도의 레벨(확대, 축소 정도)
        };

        const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    },[]);

    

    const createMap = (seleselectedRegion:string, selectedDistrict: string) => {
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
    };  

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption); 

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(); 

    if(selectedDistrict==""){
        var keyword = seleselectedRegion+" 보건소";
    }
    else{
        var keyword = seleselectedRegion+selectedDistrict+" 보건소";
    }
    
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword, placesSearchCB); 

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data:any, status:any, pagination:any) {
        if (status === kakao.maps.services.Status.OK) {
            var searchData: Array<Map<any, any>>=[];
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                if(selectedDistrict != "" && data[i].place_name.includes(selectedDistrict)){
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    searchData.push(data[i]);
                }
                else if(selectedDistrict == "" && data[i].place_name.includes(selectedRegion)){
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    searchData.push(data[i]);
                }
                
            }       
            //리스트 생성하기 
            updateLocationBoxes(searchData);
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        } 
    }
    const updateLocationBoxes = (data: any) => {
        if (data && data.length > 0) {
            const boxes = renderLocationBoxes(data);
            setLocationBoxes(boxes);
        } else {
            setLocationBoxes([]);
        }
    };

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place:any) {
        
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
};

const handleMarker = (name: string, lat: number, lng: number, address: string, number: string) => () => {
    setMarkerData({ name, lat, lng, address, number });
};


const renderLocationBoxes = (data: any) => {
    const rows = [];
    for (let i = 0; i < data.length; i += 2) {
      const firstLocation = data[i];
      const secondLocation = data[i + 1];
      rows.push(
        <div key={`boxContent-${i}`} className={styles.boxContent}>
          <div className={styles.box} style={{ marginRight: '2vw' }}>
            <div className={styles.one}>
              <p>{firstLocation.place_name}</p>
              <p style={{ fontSize: isMobile ? '2.2vw' : '1vw' }}>{firstLocation.address_name}</p>
              <p style={{ fontSize: isMobile ? '2.2vw' : '1vw' }}>연락처: {firstLocation.phone}</p>
            </div>
            <div className={styles.two}>
              <div className={styles.findMap} onClick={handleMarker(firstLocation.place_name, firstLocation.y, firstLocation.x, firstLocation.address_name, firstLocation.phone)}>
                <span>지도찾기</span> <span>&gt;</span>
              </div>
            </div>
          </div>
          {secondLocation && (
            <div className={styles.box} style={{ marginRight: '2vw' }}>
              <div className={styles.one}>
                <p>{secondLocation.place_name}</p>
                <p style={{ fontSize: isMobile ? '2.2vw' : '1vw' }}>{secondLocation.address_name}</p>
                <p style={{ fontSize: isMobile ? '2.2vw' : '1vw' }}>연락처: {secondLocation.phone}</p>
              </div>
              <div className={styles.two}>
                <div className={styles.findMap} onClick={handleMarker(secondLocation.place_name, secondLocation.y, secondLocation.x, secondLocation.address_name, secondLocation.phone)}>
                  <span>지도찾기</span> <span>&gt;</span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return rows;
}

useEffect(() => {
    if (markerData) {
        const { name, lat, lng, address, number } = markerData;
        const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스

        if (markerData.name !== "") {
            // 지도의 중심을 마커의 위치로 설정
            const options = {
                center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표.
                level: 3 // 지도의 레벨(확대, 축소 정도)
            };

            const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴


            // 마커가 표시될 위치입니다 
            const markerPosition = new kakao.maps.LatLng(lat, lng);

            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
                position: markerPosition
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
            // <a href="https://map.kakao.com/link/map/${name},${lat},${lng}" style="color:blue" target="_blank">큰지도보기</a> 
            //     <a href="https://map.kakao.com/link/to/${name},${lat},${lng}" style="color:blue" target="_blank">길찾기</a>
            const iwContent = `
            <div style="width:15vw; padding:1.2vw;">
                <p style="font-size:1.2vw;">${name}</p><br/>
                <p style="font-size:1.0vw;">${address}</p>
                <p style="font-size:1.0vw;">${number}</p><br/>
                <p> 
                <a href="https://map.kakao.com/link/map/${name},${lat},${lng}" style="text-decoration:none; color:black;" target="_blank">
                <span style="padding:0.3vw; font-size:1vw; border:0.1vw solid black">지도보기</span></a>
                <a href="https://map.kakao.com/link/to/${name},${lat},${lng}" style="text-decoration:none; color:black;" target="_blank">
                <span style=" margin: 0.3vw; padding:0.3vw; font-size:1vw; border:0.1vw solid black">길찾기</span></a></p>
            </div>
            `,
                iwPosition = new kakao.maps.LatLng(lat, lng); // 인포윈도우 표시 위치입니다
            const iwContent_mobile = `
                <div style="padding: 1.2vw">
                    <p style="font-size:4.2vw;">${name}</p><br/>
                    <p style="font-size:2.8vw;">${address}</p>
                    <p style="font-size:2.8vw;">${number}</p><br/>
                    <p> 
                    <a href="https://map.kakao.com/link/map/${name},${lat},${lng}" style="text-decoration:none; color:black;" target="_blank">
                    <span style="padding:0.5vw; font-size:3vw; border:0.3vw solid black">지도보기</span></a>
                    <a href="https://map.kakao.com/link/to/${name},${lat},${lng}" style="text-decoration:none; color:black;" target="_blank">
                    <span style=" margin: 0.5vw; padding:0.5vw; font-size:3vw; border:0.3vw solid black">길찾기</span></a></p>
                </div>
                `,
                iwPosition_mobile = new kakao.maps.LatLng(lat, lng); // 인포윈도우 표시 위치입니다

            // 인포윈도우를 생성합니다
            const infowindow = new kakao.maps.InfoWindow({
                position: isMobile ? iwPosition_mobile : iwPosition,
                content: isMobile ? iwContent_mobile : iwContent
            });

            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            infowindow.open(map, marker);
        }
        else {
            // 지도의 중심을 마커의 위치로 설정
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
                level: 3 // 지도의 레벨(확대, 축소 정도)
            };

            const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        }
    }

}, [markerData]);

    return (
        <>
            <div className={styles.content}>
                <p className={styles.pageName}>금연 지도</p>
                <p className={styles.p}>내 지역 보건소 찾기</p>
                <div className={styles.description}>
                    <p>내 지역 보건소를 찾아보세요.</p>
                    <p>(주민등록상 지역주민이 아니더라도 이용자의 접근성과 편의를 고려하여 서비스 제공 기능)</p>
                </div>
                <div className={styles.mapContent}>
                    <div className={styles.search}>
                        <select id="region" className={styles.select} value={selectedRegion} onChange={handleRegionChange}>
                            <option value="">지역 선택</option>
                            {Object.keys(districts).map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>

                        <select id="district" className={styles.select} value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedRegion}>
                            <option value="">구 선택</option>
                            {selectedRegion && districts[selectedRegion].map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                        <div className={styles.searchButton} onClick={handleSearchClick}>검색</div>
                    </div>
                    <div className={styles.kakaoMap} id="map" />

                    {locationBoxes}

                </div>

            </div>
        </>
    );
}

export default NoSmokingArea;