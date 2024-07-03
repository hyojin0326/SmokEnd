# 사용 가이드
- URL을 환경변수로 대체합니다
- 에러 발생하면 말씀해 주세요

Q. 서버에서 데이터 받아오는데 시간이 너무 오래걸려요 <br />
A. 서버 코드에 await가 많아서 그런가 싶긴 한데, 해결하려고 노력중이니까 기다려주세요
<br />

# 뭐 바꿈
- URL + 요청메소드 + 엔드포인트 + 응답코드
<br />

## 사용자 인증
### 회원가입 (method : POST | Functions : api | endpoint : /api/auth/join)
```
// 서버로 데이터 전송
    fetch(`${import.meta.env.VITE_URL_API}/api/auth/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dbData)
    })
        .then(response => {
            if(response.status === 201) {

                // 회원가입이 정상적으로 이루어진 경우의 동작
                console.log(response.text());
                window.location.href = '/';
        
              } else if(response.status === 500) {
        
                // 회원가입이 정상적으로 이루어지지 않은 경우의 동작
                console.log(response.text());
        
              } else {
        
                // 여기 있는거 실행되면 매우 큰 문제가 있는거임
                console.log('???');
                
              }
            }).catch(err => {
              // fetch호출 자체가 실패한 경우
              console.log("fetch err");
            })
};
```
<br />

### 로그인 (method : POST | Functions : api | endpoint : /api/auth/w/login)
- 헤더에 표시되는 사용자의 이름과 마일리지 + 관리자 여부를 쿠키로 저장합니다
```
await fetch(`${import.meta.env.VITE_URL_API}/api/auth/w/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(async response => {
            if (response.status === 200) {
                // 로그인 성공
                const resData = await response.json();
                setResponse(JSON.stringify(resData));
                console.log('로그인 성공:', resData);
                alert("로그인 성공");
                window.location.href = '/';
                return resData;

            } else if (response.status === 401) {
                // 이메일 인증 안함 OR 비밀번호 다름
                const resData = await response.text();
                setResponse(resData);
                console.log('로그인 실패:', resData);
                alert(resData);
                return resData;

            } else if (response.status === 404) {
                // 가입된 메일 없음
                const resData = await response.text();
                setResponse(resData);
                console.log('로그인 실패:', resData);
                alert(resData);
                return resData;

            } else if (response.status === 500) {
                // 에러
                const resData = await response.text();
                setResponse(resData);
                console.log('서버 에러:', resData);
                return resData;

            } else {
                // 여기 있는거 실행되면 매우 큰 문제가 있는거임
                console.log('???');

            }
        }).then(result => {
            // 쿠키 만들기
            if (result && result.sessionId) {
                console.log("쿠키생성");
                if (result.remember_me) {
                    // remember_me가 true이면 쿠키의 유효기간을 더 길게 설정
                    const now = new Date();
                    const expirationDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
                    document.cookie = `sessionId=${result.sessionId}; expires=${expirationDate.toUTCString()};`;
                    document.cookie = `userStats=${JSON.stringify({name: result.name, mileage:result.mileage, isAdmin:result.isAdmin})}; expires=${expirationDate.toUTCString()};`;
                } else {
                    document.cookie = `sessionId=${result.sessionId}`;
                    document.cookie = `userStats=${JSON.stringify({name: result.name, mileage:result.mileage, isAdmin:result.isAdmin})}`
                }
            } else {
                // 로그인 실패시 동작
                console.log('로그인 실패')
            }
        }).catch(err => {

        })
```
<br />

### 로그아웃 (method : POST | Functions : api | endpoint : /api/auth/w/logout)
```
const handleLogout = async () => {
    // 쿠키에 저장된 값을 참조하는 겁니다. 꼭 있어야 합니다.
    const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');
    
    if (!sessionId) { // 로그인이 필요함을 알려주시면 됩니다
      setResponse('로그인이 필요합니다');
      return;
    }

    await fetch(`${import.meta.env.VITE_URL_API}/api/auth/w/logout`, {
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

        } else if(response.status === 401) { // 세션이 유효하지 않은 경우입니다

            const resData = await response.text();
            setResponse(resData); // response에 메세지가 담깁니다

        } else if(response.status === 500) { // 서버 문제 입니다
          
            const resData = await response.text();
            setResponse(resData); // response에 메세지가 담깁니다
            
        }
      })
  };
```
<br />

### 회원탈퇴 (method : DELETE | Functions : api | endpoint : /api/auth/w/delete/:sessionId)
```
const handleQuit = async () => {
    // 쿠키에 저장된 값을 참조하는 겁니다. 꼭 있어야 합니다.
    const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');
    
    if (!sessionId) { // 로그인이 필요함을 알려주시면 됩니다
      setResponse('로그인이 필요합니다'); 
      return;
    }

    await fetch(`${import.meta.env.VITE_URL_API}/api/auth/w/delete/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId })
    })
      .then(async response => {
        if (response.status === 200) { // 회원탈퇴 완료

            document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // 쿠키를 삭제합니다
            document.cookie = 'userStats=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            const resData = await response.text();
            setResponse(resData); // response에 메세지가 담깁니다
            
        } else if(response.status === 401) { // 세션이 유효하지 않은 경우입니다

            const resData = await response.text();
            setResponse(resData); // response에 메세지가 담깁니다

        } else if(response.status === 500) { // 서버 문제 입니다

            const resData = await response.text();
            setResponse(resData); // response에 메세지가 담깁니다
            
        }
      });
  };
```
<br />

### 비밀번호 찾기 (method : GET | Functions : api | endpoint : /api/auth/resetpw)
```
await fetch(`${import.meta.env.VITE_URL_API}/api/auth/resetpw?email=${formData.email}`)
            .then(async response => {
                if (response.status === 200) {
                    // 성공시 동작
                    const resData = await response.text();
                    setResponse(resData);
                    alert('비밀번호 재설정 메일이 전송되었습니다.');
                    window.location.href = '/login';
                } else if (response.status === 404) {
                    // 가입된 메일없음
                    const resData = await response.text();
                    setResponse(resData);
                    alert('가입된 메일이 없습니다.');
                } else if (response.status === 500) {
                    const resData = await response.text();
                    setResponse(resData);
                    console.log("서버 에러");
                }
            });
```
<br />

## 데이터 가져오기
### 보건소 데이터 가져오기 (method : GET | Functions : api | endpoint : /api/get/location/:city/:district)
- ```/api/get/location/강원/강릉시```같은 형식으로 요청하는 겁니다
- 서버는 요렇게 생긴 데이터(가 담긴 배열)를 반환해 줍니다
```
[
    {
        "name":"강릉시보건소",
        "address":"강원 강릉시 남부로17번길 38 강릉시보건소",
        "geo":{"_latitude":37.7428443073466,"_longitude":128.88276932466}
    }
]
```
- 참고로 지금은 강원도지역의 데이터만 가져올 수 있습니다. 데이터를 직접 찾아서 넣어야 하는데 지역이 많아서 다른거까지 다 넣기엔 빡셉니다
<br />

코드
```
const [locationData, setLocationData] = useState([]);
const getLocation = async () => {
    await fetch(`${import.meta.env.VITE_URL_API}/api/get/location/${selectedRegion}/${selectedDistrict}`)
      .then(async response => {
        if (response.status === 200) { // 성공

            const resData = await response.json();
            setLocationData(resData);

        } else if(response.status === 404) { // 저장된거 없음

            const resData = await response.text();
            setResponse(resData);

        } else if(response.status === 500) { // 서버 에러

            const resData = await response.text();
            setResponse(resData);
        }
      })
      .catch(error => {
        console.log('fetch에러');
      });
  };
```

참고로 전 이렇게 참조를 했습니다
```
<h2>응답 데이터</h2>
{locationData && locationData.map((it, index) => (
<div key={index}>
  <p>이름 : {it.name} </p>
  <p>주소 : {it.address} </p>
  <p>좌표 : {it.geo._latitude}, {it.geo._longitude} </p>
</div>
))}<br />
```
<br />

### 판매 상품 데이터 가져오기 (method : GET | Functions : api | endpoint : /api/get/item)
- 금연관련상품들, 알약이나 금연껌 같은 상품들 입니다
- 다음과 같은 데이터를 가져옵니다
```
[
    {
        "id" : 구분용 아이디입니다. 1,2,3,4,5 같은 식으로 되어 있습니다
        "image" : 상품 이미지입니다.
        "name" : 이름입니다
        "price" : 현금가격입니다
        "m_price" : 마일리지 가격입니다
        "url" : 그 상품 팔고있는 페이지입니다(쿠팡)
    }
]
```
```
const [itemData, setItemData] = useState([]);
const getItem = async () => {
    await fetch(`${import.meta.env.VITE_URL_API}/api/get/item`)
      .then(async response => {

        if (response.status === 200) { // 성공
            
            const resData = await response.json(); // item데이터가 json형태로 담깁니다
            setItemData(resData);
            setResponse('ok');

        } else if(response.status === 404) { // 저장된거 없음

            const resData = await response.text();
            setResponse(resData);

        } else if(response.status === 500) { // 서버 에러

            const resData = await response.text();
            setResponse(resData);
        }
      });
  };
```

참고로 전 이렇게 참조를 했습니다
```
{itemData.map(item => (
      <div key={item.id} className="card">
        <img src={item.image} alt={item.name} />
        <div>
          <h3>{item.name}</h3>
          <p>ID: {item.id}</p>
          <p>가격: {item.price}</p>
          <p>마일리지 가격: {item.m_price}</p>
        </div>
      </div>
))}
```

## 자가진단
### 흡연에 대한 상식 점검 (method : POST | Functions : api | endpoint : /api/diagnosis/knowledge)
- 기존에 만들어 두신 state를 그대로 사용합니다
- 서버는 다음과 같은 데이터(배열)를 반환합니다
```
[
    {
        no : 문제번호입니다
        answer : 내가 쓴 답이 정답인지 오답인지를 표시합니다. (정답/오답 의 데이터를 가집니다)
        description : 그 문제에 대한 설명입니다
    }
]
```
```
const [response, setResponse] = useState('');
  
  const [selectedAnswers, setSelectedAnswers] = useState({ //1이 O, 2가 X라고 생각하겠습니다
    q1: 1,q2: 1, q3: 1, q4: 1, q5: 1,
    q6: 1,q7: 1, q8: 1, q9: 1, q10: 1,
    q11: 1,q12: 1, q13: 1, q14: 1, q15: 1,
    q16: 1,q17: 1, q18: 1, q19: 1, q20: 1,
    q21: 1,q22: 1, q23: 1, q24: 1, q25: 1
});

const handle = async () => {
    let sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if(!sessionId) sessionId=''; //  자가진단이 로그인을 강제할 이유는 없으니, 비 로그인시에는 빈 값을 전달합니다

    await fetch(`${import.meta.env.VITE_URL_API}/api/diagnosis/knowledge`, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: sessionId,
                selectedAnswers: selectedAnswers // state그대로 집어 넣으시는 겁니다
            })
    }).then(async response => {
        if (response.status === 200) { // 성공

            const resData = await response.json(); // 데이터가 json형태로 답깁니다
            setResponse(resData);

        } else if(response.status === 500) { // 서버 에러

            const resData = await response.text();
            setResponse(resData);
        }
      })
      .catch(error => {
        console.log('fetch에러');
      });
  };
```
참조는 다음과 같이 했습니다
```
<h2>응답 내용</h2>
{response && response.map((it, index) => (
    <div key={index}>
      <p>번호 : {it.no} </p>
      <p>정답 : {it.answer} </p>
      <p>설명 : {it.description}</p>
    </div>
))}<br />
```
<br />

### 니코틴 의존도 검사 (method : POST | Functions : api | endpoint : /api/diagnosis/nicotine)
- 위와 마찬가지로, 기존에 만드신 state를 그대로 씁니다
- 서버는 다음과 같은 JSON 데이터를 반환합니다. <b>배열 아니니까 주의합시다</b>
```
{
    title: '높은 의존도' || '중간 정도의 의존도' || '낮은 의존도'
    value: 그 의존도에 대한 설명(사이트에 있던거 그대로 가져다 씀)
}
```
```
const [response, setResponse] = useState('');
const [selectedAnswers, setSelectedAnswers] = useState({ // 다 더하면 0점 ~ 10점 사이의 값이 됩니다
    q1: 1,
    q2: 1,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
});
const handle = async () => {
    let sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if(!sessionId) sessionId=''; //  자가진단이 로그인을 강제할 이유는 없으니, 비 로그인시에는 빈 값을 전달합니다

    await fetch(`${import.meta.env.VITE_URL_API}/api/diagnosis/nicotine`, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: sessionId,
                selectedAnswers: selectedAnswers
            })
    }).then(async response => {
        if (response.status === 200) { // 성공

            const resData = await response.json(); // 데이터가 json형태로 답깁니다
            setResponse(resData);

        } else if(response.status === 500) { // 서버 에러

            const resData = await response.text();
            setResponse(resData);
        }
      })
      .catch(error => {
        console.log('fetch에러');
      });
  };
```
참조는 이렇게 합니다
```
타이틀 : response.title
설명 : response.value
```
<br />

### 나의 흡연 습관 평가 (method : POST | Functions : api | endpoint : /api/diagnosis/habit)
- 위의 니코틴 의존도 검사와 조금도 다르지 않습니다
- 서버는 다음과 같은 JSON 데이터를 반환합니다. <b>배열 아니니까 주의합시다</b>
```
{
    title: "A유형/무슨무슨유형"
    value: "대충 그 유형에 대한 설명"
}
```
```
const [response, setResponse] = useState('');
  
const [selectedAnswers, setSelectedAnswers] = useState({
    q1: 0,q2: 0,q3: 0,q4: 0,q5: 0,q6: 0,
    q7: 0,q8: 0,q9: 0,q10: 0,q11: 0,q12: 0,
    q13: 0,q14: 0,q15: 0,q16: 0,q17: 0,q18: 0,
    q19: 0,q20: 0,q21: 0
});

const handle = async () => {
    let sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if(!sessionId) sessionId=''; // 자가진단이 로그인을 강제할 이유는 없으니, 비 로그인시에는 빈 값을 전달합니다

    await fetch(`${import.meta.env.VITE_URL_API}/api/diagnosis/habit`, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: sessionId,
                selectedAnswers: selectedAnswers
            })
    }).then(async response => {
        if (response.status === 200) { // 성공

            const resData = await response.json(); // 데이터가 json형태로 답깁니다
            setResponse(resData);

        } else if(response.status === 500) { // 서버 에러

            const resData = await response.text();
            setResponse(resData);
        }
      })
      .catch(error => {
        console.log('fetch에러');
      });
  };
```
참조는 이렇게 합니다
```
타이틀 : response.title
설명 : response.value
```
<br />

## DB에 내용 작성
### 리뷰 작성하기 (method : POST | Functions : api | endpoint : /api/handle/postReview) - 미완성
- 클라이언트 측에서 선택한 이미지를 base64로 인코딩해서 인코딩한 문자열을 서버로 전송하는 방식으로 만들고 있습니다
- 사실 다 만들고 테스트도 해 봤는데, 리엑트쪽 코드를 어떻게 작성해야 하는지 몰라서 잠시 보류해 두겠습니다
```
```

<br />

### 현금 상품 구매 (method : POST | Functions : api | endpoint : /api/handle/purchase)
- 우리 사이트에서 실제 현금으로 구매하는건 담배케이스 하나 뿐이기 때문에, 마일리지 구매랑 다르게 따로 아이디 같은걸 전송할 필요는 없습니다
- 그냥 sessionId랑 formData만 보내면 됩니다.
- 보내면 별다른 작업 없이 그대로 저장합니다
```
const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');
    
if (!sessionId) { // 로그인이 필요함을 알려주시면 됩니다
    return;
}

await fetch(`${import.meta.env.VITE_URL_API}/api/handle/purchase`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        formData: formData,
        sessionId: sessionId
    })
})
.then(async response => {
    if (response.status === 201) { // 구매 완료
        const resData = await response.text();
        await setResponse(resData); // response에 메세지가 담깁니다
        console.log(resData);
        
    } else if(response.status === 401) { // 세션이 유효하지 않은 경우입니다

        const resData = await response.text();
        await setResponse(resData); // response에 메세지가 담깁니다
        console.log(resData);

    } else if(response.status === 500) { // 서버 문제 입니다

        const resData = await response.text();
        await setResponse(resData); // response에 메세지가 담깁니다
        console.log(resData);
        
    }
});
```
