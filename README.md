# 사용 가이드
적어둔 코드 그대로 복사해서 쓰시면 됩니다. URL이랑 세부 동작은 직접 정의하시구요

## Functions
- Firebase 프로젝트의 ```Functions```에 들어가 보시면 몇가지의 함수가 정의되어 있습니다.
![스크린샷 2024-05-12 175859](https://github.com/ljtq20/smokEnd-cloud-functions/assets/155207532/6e5892b3-bbad-4ba6-8a12-5e5a6394d251)
- 각 기능 옆에 ```Functions : 함수이름``` 같은 식으로 작성해 둘 테니, 요청을 보낼 때는 그 URL뒤에 작성해놓은 엔드포인트를 붙여서 method에 맞게 전송하시면 됩니다.
- ```https://test-testurl-uc.a.run.app/signup``` 같은 식으로요
<br />

## Flutter
- 사전 준비가 좀 필요합니다
1. ```pubspec.yaml```파일의 ```dependencies```부분에 다음과 같은 내용을 추가합니다
```
dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.1 // 요청을 보낼 때 사용합니다
  shared_preferences: ^2.2.3 // 로그인한 사용자가 '유효한' 사용자인지 체크하기 위해 쓸겁니다
```
2. 요청을 보내는 함수가 있는 파일, Shared Preferences를 사용하는 파일 상단에 다음과 같은 내용을 추가합니다
```
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
```
<br />

## Notice
1. (React) Fetch는 서버가 400번 이상의 응답코드를 반환하면 함수 실행중에 에러가 났다고 처리합니다. 기본적으로 then~catch를 사용하면 되는데, 응답코드가 400번 이상이면 catch문 안의 내용도 같이 실행되니까 주의합시다
2. 쓸데도 없는 설명은 가져다 버리고, 코드(함수)만 써 놓았습니다. 복붙하여 사용하되, 세부적인 동작은 직접 정의합시다

---
## 사용자 인증
<br />

### 회원가입 (method : POST | Functions: express | endpoint : /signup)
#### React
- URL은 ```Firebase Functions```에서 확인하시고, IF문 안의 동작은 알아서 정의합니다.
```
const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
    gender: ''
  });
const [response, setResponse] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(async response => {
        if(response.status === 201) { // 회원가입 완료

          const resData = await response.text(); 
          setResponse(resData); // response에 메세지가 담깁니다

        } else if(response.status === 500) { // 서버에러 or 이메일 중복

          const resData = await response.text(); 
          setResponse(resData); // response에 메세지가 담깁니다

        } else { // 실행안될...걸요? 

          const resData = await response.text();
          setResponse(resData); // response에 메세지가 담깁니다
          
        }
      })
  };
```
<br />

#### Flutter
- URL은 ```Firebase Functions```에서 확인하시고, IF문 안의 동작은 알아서 정의합니다. 지금은 예시로 코드를 써 놨습니다
```
// TextField에 controller로 집어넣습니다
TextEditingController _emailController = TextEditingController();
TextEditingController _passwordController = TextEditingController();
TextEditingController _nameController = TextEditingController();
TextEditingController _birthController = TextEditingController();
TextEditingController _genderController = TextEditingController(); // 직접 입력받는 형태를 취하고 있습니다. 나중에 바꿔주세요

Future<void> _signup() async {
    String email = _emailController.text;
    String password = _passwordController.text;
    String name = _nameController.text;
    String birth = _birthController.text;
    String gender = _genderController.text; // 직접 입력받는 형태를 취하고 있습니다. 나중에 바꿔주세요

    try {
      var url = Uri.parse('/signup');
      var response = await http.post(url, body: {
        'email': email,
        'password': password,
        'name': name,
        'birth': birth,
        'gender': gender,
      });

      if (response.statusCode == 201) { // 회원가입 성공 시

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );


      } else { // 회원가입 실패 or 서버오류

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      }
    } catch (error) { // 네트워크 오류 (클라이언트의 오류입니다)

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('오류가 발생했습니다. 다시 시도해주세요.'),
        ),
      );

    }
  }
```
<br />

---
### 로그인 (method : POST | Functions: express | endpoint : (웹)/w/login  (앱)/m/login)
- 엔드포인트가 다르다는 점에 주의합니다
<br />

#### React
- 두 번째 then문에 동작을 정의합니다. 쿠키 만드는 코드는 건드리지 않습니다
```
const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember_me: false, // 체크박스에 따라 값이 변해야 합니다
});
const [response, setResponse] = useState('');

const handleLogin = async (e) => {
    e.preventDefault();
    await fetch('/w/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(async response => {
        if(response.status === 200) { // 로그인 성공

          const resData = await response.json();
          setResponse(JSON.stringify(resData)); // response에 세션정보가 담깁니다
          return resData;
  
        } else if(response.status === 403) { // 이메일 인증 안함 OR 비밀번호 다름

          const resData = await response.text();
          setResponse(resData); // response에 메세지가 담깁니다
          return resData;
  

        } else if(response.status === 404) { // 가입된 메일 없음
          const resData = await response.text();
          setResponse(resData); // response에 메세지가 담깁니다
          return resData;
  
        } else if(response.status === 500) { // 서버 문제 입니다

          const resData = await response.text();
          setResponse(resData); // response에 메세지가 담깁니다
          return resData;
          
        } else { // 이 안에 있는건 아마 실행 안될겁니다. 안되어야 합니다
          console.log('???');
        }
      }).then(result => { // 로그인 성공시의 동작을 정의하면 됩니다.

        // 쿠키 만들기 (필수)
         if(result && result.sessionId) {
            if(result.remember_me) { // remember_me가 true이면 쿠키의 유효기간을 더 길게 설정
              const now = new Date();
              const expirationDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
              document.cookie = `sessionId=${result.sessionId}; expires=${expirationDate.toUTCString()};`;
            } else {
              document.cookie = `sessionId=${result.sessionId}`;
            }
         } else { // 로그인 실패시 동작을 정의하면 됩니다
          alert(result);
         }
      })
  };
```
<br />

#### Flutter
- 반환받은 sessionId를 SharedPreferences에 저장합니다.
- if문 안에 적힌 SnackBar는 예시 코드입니다. 지워도 됩니다
```
import 'dart:convert'; // 코드 맨 위에 추가합니다

TextEditingController _emailController = TextEditingController();
TextEditingController _passwordController = TextEditingController();

Future<void> _signin() async {
    String email = _emailController.text;
    String password = _passwordController.text;

    try {
      var url = Uri.parse('/m/login');
      var response = await http.post(url, body: {
        'email': email,
        'password': password,
      });

      if (response.statusCode == 200) { // 로그인 성공시의 동작

        // SharedPreferences에 저장합니다 지우지 맙시다
        SharedPreferences prefs = await SharedPreferences.getInstance();
        Map<String, dynamic> responseData = json.decode(response.body);
        String sessionId = responseData['sessionId'];
        await prefs.setString('sessionId', sessionId);

      } else if(response.statusCode == 403){ // 비밀번호 불일치 or 인증 안함

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      } else { // 서버 에러입니다

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      }
    } catch (error) { // 네트워크 오류 (클라이언트의 오류입니다)

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('오류가 발생했습니다. 다시 시도해주세요.'),
        ),
      );

    }
  }
```
<br />

---
### 로그아웃 (method : POST | Functions: express | endpoint : (웹)/w/logout  (앱)/m/logout)
- 엔드포인트가 다르다는 점에 주의합니다
<br />

#### React
- 로그인과 마찬가지로, 쿠키 삭제하는 코드는 건드리지 맙시다
- if문 안에 동작을 추가하면 됩니다
```
const [response, setResponse] = useState('');

const handleLogout = async () => {
  // 쿠키에 저장된 값을 참조하는 겁니다. 꼭 있어야 합니다.
  const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  
  if (!sessionId) { // 로그인이 필요함을 알려주시면 됩니다. 경고창 같은거 띄워도 됩니다
    setResponse('로그인이 필요합니다');
    return;
  }

  await fetch('/w/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sessionId })
  })
    .then(async response => {
      if (response.status === 200) { // 로그아웃 완료

          document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // 쿠키를 삭제합니다
          const resData = await response.text();
          setResponse(resData); // response에 메세지가 담깁니다

      } else if(response.status === 404) { // 세션이 유효하지 않은 경우입니다

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

#### Flutter
- 뭐 입력받고 어쩌고 할 필요는 없습니다.
```
Future<void> _logout() async {
    try {
      var url = Uri.parse('/m/logout');
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String sessionId = prefs.getString('sessionId') ?? "";

      if(sessionId == "") { // 로그인이 안되어 있는 경우입니다
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('로그인이나 합시다'),
          ),
        );
        return;
      }
      
      var response = await http.post(url, body: {
        'sessionId': sessionId
      });

      if (response.statusCode == 200) { // 로그아웃 완료

        await prefs.remove('sessionId'); // 로그인하면서 저장했던 값을 삭제합니다. 이 코드는 지우지 맙시다

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      } else if(response.statusCode == 404) { // 세션이 유효하지 않은 경우입니다

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      } else { // 서버 에러입니다

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      }
    } catch (error) { // 네트워크 오류 (클라이언트의 오류입니다)

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('오류가 발생했습니다. 다시 시도해주세요.'),
        ),
      );

    }
  }
```

<br />

---
### 회원탈퇴 (method : POST | Functions: express | endpoint : (웹)/w/quit  (앱)/m/quit)
- 엔드포인트가 다르다는 점에 주의합니다
<br />

#### React
- 로그아웃 코드랑 별 다를건 없습니다
```
const [response, setResponse] = useState('');

const handleQuit = async () => {
  // 쿠키에 저장된 값을 참조하는 겁니다. 꼭 있어야 합니다.
  const sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  
  if (!sessionId) { // 로그인이 필요함을 알려주시면 됩니다
    setResponse('로그인이 필요합니다'); 
    return;
  }

  await fetch('/w/quit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sessionId })
  })
    .then(async response => {
      if (response.status === 200) { // 회원탈퇴 완료

          document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // 쿠키를 삭제합니다
          const resData = await response.text();
          setResponse(resData); // response에 메세지가 담깁니다
          
      } else if(response.status === 404) { // 세션이 유효하지 않은 경우입니다

          const resData = await response.text();
          setResponse(resData); // response에 메세지가 담깁니다

      } else if(response.status === 500) { // 서버 문제 입니다

          const resData = await response.text();
          setResponse(resData); // response에 메세지가 담깁니다
          
      }
    });
};
```

#### Flutter
- 이것도 로그아웃 하는 코드랑 별 다를건 없습니다
```
TextEditingController _emailController = TextEditingController();

Future<void> _quit() async {
  try {
    var url = Uri.parse('/m/quit');
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String sessionId = prefs.getString('sessionId') ?? "";

    if(sessionId == "") { // 로그인이 안되어 있는 경우입니다
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('로그인이나 합시다'),
        ),
      );
      return;
    }

    var response = await http.post(url, body: {
      'sessionId': sessionId
    });

    if (response.statusCode == 200) { // 회원탈퇴 완료

      await prefs.remove('sessionId'); // 로그인하면서 저장했던 값을 삭제합니다. 지우지 맙시다

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(response.body),
        ),
      );

    } else if(response.statusCode == 404) { // 세션이 유효하지 않은 경우입니다

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(response.body),
        ),
      );

    } else { // 서버 에러입니다

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(response.body),
        ),
      );

    }
  } catch (error) { // 네트워크 오류 (클라이언트의 오류입니다)

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('오류가 발생했습니다. 다시 시도해주세요.'),
      ),
    );

  }
}
```
<br />

---
### 비밀번호 재설정 (method : GET | Functions: express | endpoint : /resetpw)
- 이메일 날아가는거니까 이상한 이메일 입력받지 않게 조심합니다
<br />

#### React
- 요청 본문에 이메일을 담는게 아니라 url에 담는다는 점에 주의합니다
```
const [formData, setFormData] = useState({
        email: ''
    });
const [response, setResponse] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/resetpw?email=${formData.email}`)
    .then(async response => {
      if(response.status === 200) { // 전송 완료

        const resData = await response.text();
        setResponse(resData);
    
      } else if(response.status === 404) { // 가입된 메일없음

            const resData = await response.text();
            setResponse(resData);

      } else if(response.status === 500) { // 서버에러
        
            const resData = await response.text();
            setResponse(resData);
      }
    });
  };
```
<br />

#### Flutter
- 요청 본문에 이메일을 담는게 아니라 url에 담는다는 점에 주의합니다
```
Future<void> _signin() async {
    String email = _emailController.text;

    try {
      var url = Uri.parse('/resetpw?email=$email');
      var response = await http.get(url);

      if (response.statusCode == 200) { // 전송완료

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      } else if(response.statusCode == 404){ // 가입된 메일 없음ㅣ

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      } else { // 서버 에러입니다

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(response.body),
          ),
        );

      }
    } catch (error) { // 네트워크 오류 (클라이언트의 오류입니다)

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('오류가 발생했습니다. 다시 시도해주세요.'),
        ),
      );

    }
  }
```
