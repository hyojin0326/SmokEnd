import { useEffect } from "react";
import axios from "axios";

function Kakao() {
    var count = 0; // 2번 호출 방지

    const kakaoLogin = async () => {
        if(count >= 1) return;
        count++;

        const code = new URL(window.location.href).searchParams.get("code");

        // 엑세스 토큰 요청
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
        params: {
            grant_type: 'authorization_code',
            client_id: 'dfc81385849e19dc0b2d855a6ccaf98c',
            redirect_uri: 'http://localhost:5173/oAuthkakao',
            code: code
        }
        });

        const accessToken = tokenResponse.data.access_token;

        // 사용자 정보 요청
        const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
        });

        const userId = userInfoResponse.data.id;

        await fetch(`http://${import.meta.env.VITE_URL_API}/api/auth/w/klogin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            token: accessToken
        }),
        }).then(async (response) => {
        if (response.status === 200) {
            // 로그인 성공. 쿠키 만들면 됨
            const resData = await response.json();
            document.cookie = `token=${accessToken};`;
            document.cookie = `userStats=${JSON.stringify(resData)};`;
            window.location.href = "/";
        } else if (response.status === 401) {
            // 토큰 오류
        } else if (response.status === 404) {
            console.log(response.status);
            // 회원가입 해야 됨
            document.cookie = `type=kakao;`;
            document.cookie = `token=${accessToken};`;
            window.location.href = "/SocialSignup";
        } else {
            // 에러남
        }
        });
    }

    useEffect(() => {
        kakaoLogin();
    }, []);

    return (
        <>
            <h3>테스트</h3>
        </>
    )
}

export default Kakao;