import axios from "axios";

// 개발 환경에서는 Vite 프록시를 사용 (/api), 프로덕션에서는 실제 URL 사용
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const instance = axios.create({
  baseURL,
  timeout: 60000, // 운세 분석은 시간이 걸릴 수 있으므로 타임아웃 증가
  headers: {
    "ngrok-skip-browser-warning": "true", // ngrok 브라우저 경고 스킵
  },
  // Content-Type을 설정하지 않아 axios가 자동으로 적절한 헤더를 설정하도록 함
  // (FormData는 multipart/form-data, 일반 객체는 application/json)
});
