import { useEffect } from "react";
import axios from "axios";

function Naver() {
    var count = 0; // 2번 호출 방지

    const NaverLogin = async () => {
        if(count >= 1) return;
        count++;

        const code = new URL(window.location.href).searchParams.get("code");

        // 엑세스 토큰 요청
        const tokenResponse = await axios.post(`http://${import.meta.env.VITE_URL_API}/api/auth/proxy/nid`, null, {
        params: {
            grant_type: 'authorization_code',
            client_id: `${import.meta.env.VITE_NAVER_CLIENT_ID}`,
            client_secret: `${import.meta.env.VITE_NAVER_CLIENT_SECRET}`,
            code: code
        }
        });

        const accessToken = tokenResponse.data['access_token'];
        console.log(accessToken);

        
        // 사용자 정보 요청
        const userInfoResponse = await axios.get(`http://${import.meta.env.VITE_URL_API}/api/auth/proxy/openapi`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const userId = userInfoResponse.data;
        
        await fetch(`http://${import.meta.env.VITE_URL_API}/api/auth/w/klogin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId.response['id'],
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
            document.cookie = `type=naver;`;
            document.cookie = `token=${accessToken};`;
            window.location.href = "/SocialSignup";
        } else {
            // 에러남
        }
        });
        
    }

    useEffect(() => {
        NaverLogin();
    }, []);

    return (
        <>
            <h3>테스트</h3>
        </>
    )
}

export default Naver;