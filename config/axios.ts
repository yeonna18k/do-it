import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
