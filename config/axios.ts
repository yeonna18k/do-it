import axios from "axios";

const todoApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

export default todoApi;
