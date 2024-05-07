# API 가이드
## 중요
1. 모든 요청 허용으로 해 놓긴 했는데...아마 될걸요..?
2. (웹) 클라이언트에서 세션 ID가 담긴 쿠키를 서버로 전송해서 사용자를 식별하는 뭐 그런거 하려고 했는데 젠장할 쿠키 전송이 안됩니다.
3. (웹) axios나 fetch는 서버가 ```400```번이나 ```500```번을 반환하는 경우에는 전부 에러로 처리합니다. try-catch로 처리하면 되겠네요
4. (웹) 요청은 axios나 fetch중 아무거나 써도 됩니다.
<br>

---
## 회원가입 (POST, /signup)
### 응답
- 사용자 생성이 정상적으로 이루어진 경우 ```201```코드를 반환합니다
- firestore에 문서를 저장하던 중 에러가 발생한 경우, 사용자 생성이 이루어지지 않은 경우 ```500```코드를 반환합니다

### 요청
- form에 입력 받는 데이터는 다음과 같이 구성합니다
```
const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
    gender: '',
});
```
- 중요 : **이름(email, password, ...)이 바뀌면 안됩니다**

- 생성이 완료되면 입력한 이메일로 인증 링크를 전송합니다.

<br><br>

---
## 로그인 (POST, /login)
### 응답
- 사용자가 입력한 이메일이 가입이 되어 있지 않은 이메일이라면 ```404```코드를 반환합니다
- 비밀번호가 일치하지 않는 경우 ```401```코드를 반환합니다
- 비밀번호가 일치하더라도, 이메일 인증이 완료되지 않은 경우 ```401```코드를 반환합니다
- 에러가 발생한 경우 ```500```코드를 반환합니다
- 로그인이 성공적으로 이루어진 경우 다음과 같은 JSON 데이터를 반환합니다 (코드는 ```200```)
```
{
  sessionId : 로그인하면 생성되는 고유의 sessionId. 사용자 식별에 사용.
  remember_me : 로그인 유지 여부. boolean타입.
}
```

### 요청
- form에 입력 받는 데이터는 다음과 같이 구성합니다
```
const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: true || false,
});
```
- 중요 : **이름이 바뀌면 안됩니다**
   

### (클라이언트) 쿠키 생성
- 로그인이 완료되면 위에서 받은 데이터를 토대로 쿠키를 생성해야 합니다. 클라이언트에서요.
```
const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            console.log(response.data);
            
            const { sessionId, remember_me } = response.data;
            document.cookie = `session=${sessionId}; path=/`;
            if (remember_me) {
                document.cookie = `session=${sessionId}; path=/; max-age=${365 * 24 * 60 * 60}`;
            }
        } catch (error) {
            console.error(error); // 오류 발생 시 에러 처리
        }
    };
```
- 이렇게 만들어진 쿠키는 로그인한 사용자를 식별하는 데 사용할 겁니다
- 이 쿠키는 서버로 전달되어야 하는 부분이라 axios요청을 보낼 때 ```withCredentials```옵션을 true로 설정해야 하는데, 그게 필요한 부분에 다시 적어둘테니 로그인 만들때는 신경 안써도 됩니다
<br>

---
## 금연지도 - 주변 보건소 위치 가져오기 (GET, /getlocation)
### 응답
- DB에 저장된 데이터가 없다면 ```404```코드를 반환합니다
- 정상적으로 요청이 완료되면 다음과 같은 JSON데이터가 담긴 배열을 반환합니다 (코드는 ```200```)
```
[
  {
    "name": "서구보건소",
    "address": "인천 서구 탁옥로 39",
    "geo": {
      "_latitude": 37.5444,
      "_longitude": 126.674
    }
  },
  {
    "name": "양천구 보건소",
    "address": "서울 양천구 목동서로 339 양천보건소",
    "geo": {
      "_latitude": 37.5176,
      "_longitude": 126.8659
    }
  },
  {
    "name": "구로보건소 금연상담",
    "address": "서울 구로구 구로중앙로28길 66",
    "geo": {
      "_latitude": 37.5002,
      "_longitude": 126.8891
    }
  }
]
```
- 지도 API가 어떤 정보를 필요로 하는지는 모르겠는데, 아마 좌표값이랑 이름같은거만 있어도 표시는 되지 않을까 싶습니다.

### 요청
- 정보를 보낼 필요도 없고, 그냥 GET요청하면 저거 던져줍니다. 받은 결과를 state에 저장하면 됩니다.
<br>

---
## 상품 표시 - 판매 상품 정보 반환 (GET, /getitem)
### 응답
- DB에 저장된 데이터가 없다면 ```404```코드를 반환합니다
- 정상적으로 요청이 완료되면 다음과 같은 JSON데이터가 담긴 배열을 반환합니다 (코드는 ```200```)
```
[
  {
    "id": 1,
    "name": "[알코올&니코틴 배출] 에이빗 니코알 솔루션 특허성분 600mg, 45정, 1박스",
    "image": "이미지 url",
    "price": 27300,
    "m_price": 200,
    "url": "쿠팡 url"
  },
  {
    "id": 2,
    "name": " 금연껌 프레쉬민트 4mg 210개 무설탕 츄잉껌",
    "image": "이미지 url",
    "price": 109800,
    "m_price": 500,
    "url": "쿠팡 url"
  }
]
```
- 따로 넣어둔 데이터가 2개뿐이라 지금은 2개만 반환합니다. 여러개 넣으면 그거 다 반환해줄듯
- 이미지는 Cloud Storage에 저장된 이미지의 다운로드 url입니다 (보안상 이유로 가려놓음). 그래서 이미지를 표시할떄는 대충 이런식으로 표시합니다
```
<ul>
    {itemData.map((item, index) => (
      <li key={index}>
        <p>ID: {item.id}</p>
        <p>Name: {item.name}</p>
        <img src={item.image} alt={item.name} /> 
        <p>Price: {item.price}</p>
        <p>M Price: {item.m_price}</p>
        <p>URL: {item.url}</p>
      </li>
    ))}
</ul>
```
- img태그의 src에 url집어넣으면 표시됩니다

### 요청
- 정보를 보낼 필요도 없고, 그냥 GET요청하면 저거 던져줍니다. 받은 결과를 state에 저장하면 됩니다.
