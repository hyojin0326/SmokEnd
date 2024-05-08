# 사용 가이드

## Notice
1. CORS의 origin 설정이 '*'로 되어 있습니다. 이게 보안에 문제가 많은건 맞는데 이건 나중에 수정하겠습니다
2. (웹) HTTP요청 헤더에 인증정보(쿠키)가 포함이 안되는 문제가 있는데 브라우저 아니면 구글쪽 문제인것 같아서 일단 쿠키 보내는건 포기해야 할 듯
3. (웹) HTTP요청을 할 때 try-catch쓰면 되겠지 싶었는데 상황에 따라 뱉는 응답코드가 다 달라서 try-catch는 쓰면 안될 듯
4. (웹) 요청은 axios나 fetch중에 아무거나 써도 되는데, fetch쓰신다고 하셨으니 그거 기준으로 쓰겠습니다
5. Firebase에 앱/웹을 등록해서 사용하는 방법도 있지 않나 싶을텐데, 그건 클라이언트에서 Firebase에 직접 접촉하는거라 클라이언트쪽 코드가 복잡해 지기 때문에 http요청을 써서 DB의 데이터를 가져오는 겁니다.
---
## 사용자 인증(Authentication)
<br />

### 회원가입 (method : POST, endpoint : /signup)
#### 요청
- 회원가입 페이지는 아이디(이메일), 비밀번호, 닉네임, 생년월일, 성별 데이터를 입력받습니다.
- 웹(React)의 경우에는 state를 다음과 같이 구성합니다
```
// 여기서 중요한건, 속성 이름(email, password, ...)은 바뀌면 안됩니다. 바뀌면 서버가 데이터를 못받아서 에러가 납니다
const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
    gender: '',
});
```
- 앱(Flutter)의 경우에는 TextField를 다음과 같이 구성합니다
```
TextEditingController emailController = TextEditingController(); // 컨트롤러

TextField(
  controller: emailController,
  decoration: InputDecoration(labelText: '이메일'),
)
```
- 입력 받은 데이터를 요청본문(body)에 담아 ```/signup```경로로 ```POST```요청을 하면 됩니다
<br />

#### 응답
- 사용자 생성에 성공하는 경우, ```201(Created)```코드를 반환합니다
- 이후 다음과 같은 내용이 들어 있는 이메일 인증 링크를 입력했던 이메일로 전송합니다
![스크린샷 2024-05-08 131938](https://github.com/ljtq20/smokEnd-cloud-functions/assets/155207532/1b222155-d0e9-4731-a053-af650a66d34e)
- 이 링크를 클릭했는지 여부는 로그인에 영향을 줍니다
- 어떤 이유로든 에러가 발생한 경우 ```500(Internal Server Error)```코드를 반환합니다
<br />

#### 사용
- (React) 웹에서 요청은 다음과 같이 전송합니다
```
// URL은 Firebase를 참고합시다
await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if(response.status === 201) {

        // 회원가입이 정상적으로 이루어진 경우의 동작
        console.log(response.text());

      } else if(response.status === 500) {

        // 회원가입이 정상적으로 이루어지지 않은 경우의 동작
        console.log(response.text());

      } else {

        // 여기 있는거 실행되면 매우 큰 문제가 있는거임
        console.log('???');
        
      }
    }).catch(err => {
      // fetch호출 자체가 실패한 경우
    })
```
- 이건 회원가입에 성공했냐 실패했냐 여부만 판단하면 되는거라, if문 안의 내용을 수정하면 됩니다
<br />

- (Flutter) 플러터에서 요청은 다음과 같이 전송합니다
1. 우선 ```pubspec.yaml```파일에 다음과 같은 내용을 추가합니다
```
dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.1 // 요거
```
2. dart파일에 이런 내용을 추가합니다
```
import 'package:http/http.dart' as http;
```
3. 요청을 보낼 함수를 만듭니다. 반환형은 무조건 ```Future<void>```입니다
```
// URL은 Firebase를 참고합시다
Future<void> signUp() async {
    final response = await http.post(
      Uri.parse('/signup'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{ // 역시 속성 이름은 바뀌면 안됩니다
        'email': emailController.text,
        'password': passwordController.text,
        'name': nameController.text,
        'birth': birthController.text,
        'gender': genderController.text,
      }),
    );

    if (response.statusCode == 201) {
      // 회원가입 성공
      
    } else {
      // 회원가입 실패
      
    }
  }
```
- if문 안의 내용을 수정해서 결과에 따라 다른 처리를 하면 됩니다
<br />

### 로그인 (method : POST, endpoint : (웹)/w/login  (앱)/m/login)
Q. 왜 웹이랑 앱이랑 엔드포인트가 다르죠  
A. 세션을 따로 관리해야 하기 때문입니다
<br />

#### 요청
- 로그인 페이지는 아이디(이메일), 비밀번호, 로그인 유지 여부(checkbox) 데이터를 입력받습니다.
- 웹(React)의 경우에는 state를 다음과 같이 구성합니다
```
// 속성이름은 바꾸면 에러나니까 바꾸지 맙시다
const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false, // 체크박스에 따라 값이 변해야 합니다
});
```
- 앱(Flutter)의 경우, 웹이랑 다르게 로그아웃을 하지 않는 한 무조건 로그인 유지가 되어야 하기 때문에 웹 처럼 remember_me를 따로 구성할 필요는 없고, 그냥 이메일이랑 비밀번호 입력받는 TextField 2개 만드시면 됩니다
<br />

#### 응답
- 로그인이 정상적으로 이루어진 경우, ```200(OK)```코드와 함께 다음과 같은 JSON데이터를 반환합니다
```
{
  "sessionId":"5253f6dv1d-375a-466c-b03a-8ebc0svc8cf24bb", // 랜덤으로 생성되는 세션 id
  "remember_me":true // 로그인 유지 여부
}
```
- 이 데이터를 웹은 쿠키로, 앱은 Shared Preference에 저장해야 합니다. 자세한건 밑의 ```사용```부분에 작성해 두겠습니다
- 비밀번호가 일치하지 않는 경우, 또는 이메일 인증이 완료되지 않은 사용자인 경우 ```403(Forbidden)```코드와 함께 다음과 같은 메세지를 반환합니다
```
res.status(403).send('비밀번호가 일치하지 않습니다');
res.status(403).send('인증이 완료되지 않은 사용자입니다');
```
- 가입된 이메일이 없는 경우, ```404(Not Found)```코드와 함께 다음과 같은 메세지를 반환합니다
```
res.status(404).send('사용자를 찾을 수 없습니다');
```
<br />

#### 사용
- (React) 웹에서 요청은 다음과 같이 전송합니다
```
await fetch('/w/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if(response.status === 200) {

        // 로그인 성공
        return response.json();

      } else if(response.status === 401) {

        // 이메일 인증 안함 OR 비밀번호 다름
        return response.text();

      } else if(response.status === 404) {

        // 가입된 메일 없음
        return response.text();

      } else if(response.status === 500) {

        // 에러
        return response.text();
        
      } else {

        // 여기 있는거 실행되면 매우 큰 문제가 있는거임
        console.log('???');

      }
    }).then(result => {

      // 쿠키 만들기
       if(result && result.sessionId) {
          if(result.remember_me) {
            // remember_me가 true이면 쿠키의 유효기간을 더 길게 설정
            const now = new Date();
            const expirationDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
            document.cookie = `sessionId=${result.sessionId}; expires=${expirationDate.toUTCString()};`;
          } else {
            document.cookie = `sessionId=${result.sessionId}`;
          }
       } else {
        // 로그인 실패시 동작
        console.log('로그인 실패')
       }
    }).catch(err => {
      // fetch호출 자체가 실패한 경우
    })
```
- then을 두 번을 사용해 전송된 데이터(JSON, 텍스트)를 참조하면서 쿠키를 생성하고 있습니다. 쿠키의 유효성은 테스트를 해 봐야 알 수 있겠지만, 지금은 이정도면 될겁니다
- 역시 if문 안의 내용(쿠키 만드는거 빼고)을 수정하면 됩니다
<br />

- (Flutter) 앱에서 요청은 다음과 같이 전송합니다
1. 우선 ```pubspec.yaml```파일에 다음과 같은 내용을 추가합니다
```
dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.1
  shared_preferences: ^2.2.3 // 요거
```
2. dart파일에 이런 내용을 추가합니다
```
import 'package:shared_preferences/shared_preferences.dart';
```
3. 요청을 보낼 함수를 만듭니다. 반환형은 무조건 ```Future<void>```입니다
```
// URL은 Firebase를 참고합시다
Future<void> mobileLogin() async {
    final response = await http.post(
      Uri.parse('/m/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': emailController.text,
        'password': passwordController.text,
      }),
    );

    if (response.statusCode == 200) {
      // 로그인 성공
      _showAlert(response.body); // 이건 임의로 만든 alert창 띄우는 함수입니다.

      // 데이터 저장
      SharedPreferences prefs = await SharedPreferences.getInstance();
      Map<String, dynamic> responseData = json.decode(response.body);
      String sessionId = responseData['sessionId'];
      await prefs.setString('sessionId', sessionId);

    } else {
      // 로그인 실패
      _showAlert(response.body); // response.body에 서버가 반환한 값('비밀번호가 일치하지 않습니다'같은거)이 들어갑니다
    }
  }
```
- if문 안에 SharedPreference를 사용하는 코드가 적혀 있습니다. 'sessionId'라는 이름으로 반환받은 값을 저장한 겁니다. 이 값은 로그인한 사용자 식별에 사용합니다
- 나중에 필요할 때 prefs.getString('sessionId') 같은 식으로 가져올겁니다
