# 사용 가이드
- URL까지 그냥 써 놨으니까 그대로 복사해서 수정/추가 해 주시면 됩니다
- 에러 발생하면 말씀해 주세요
<br />

# 뭐 바꿈
- URL + 요청메소드 + 엔드포인트 + 응답코드
<br />

## 사용자 인증
### 회원가입 (method : POST | Functions : api | endpoint : /api/auth/join)
```
// 서버로 데이터 전송
    fetch('https://api-e76gdpmm5q-uc.a.run.app/api/auth/join', {
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
await fetch('https://api-e76gdpmm5q-uc.a.run.app/api/auth/w/login', {
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

    await fetch(`https://api-e76gdpmm5q-uc.a.run.app/api/auth/w/delete/${sessionId}`, {
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
await fetch(`https://api-e76gdpmm5q-uc.a.run.app/api/auth/resetpw?email=${formData.email}`)
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
