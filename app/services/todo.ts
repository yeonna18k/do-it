import todoApi from "@/config/axios";
import { ApiResponse } from "../types/type";

interface PostTodo {
  name: string;
}
interface SwitchTodo {
  id: number;
  isCompleted: boolean;
}
interface EditTodo {
  id: number;
  name: string;
  memo: string | null;
  imageUrl: string;
}

// createTodo 함수: 새로운 할 일을 생성하기 위한 API 호출
export const createTodo = async (todo: PostTodo) => {
  const response = await todoApi.post("/items", todo);
  return response.data;
};

// switchTodo 함수: 할 일의 완료 상태를 전환하기 위한 API 호출
export const switchTodo = async ({ id, isCompleted }: SwitchTodo) => {
  const response = await todoApi.patch(`/items/${id}`, { isCompleted });
  return response.data;
};

// fetchTodos 함수: 할 일 목록을 페이지네이션하여 가져오기 위한 API 호출
export const fetchTodos = async (pageParam: number): Promise<ApiResponse[]> => {
  const response = await todoApi.get<ApiResponse[]>(`/items?page=${pageParam}`);
  return response.data;
};

// fetchTodo 함수: 특정 ID의 할 일 상세 정보를 가져오기 위한 API 호출
export const fetchTodo = async (id: number): Promise<ApiResponse> => {
  const response = await todoApi.get<ApiResponse>(`/items/${id}`);
  return response.data;
};

// uploadImg 함수: 이미지 파일을 서버에 업로드하기 위한 API 호출
export const uploadImg = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await todoApi.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data; charset=utf-8",
    },
  });
  return response.data;
};

// editTodo 함수: 기존 할 일의 내용을 수정하기 위한 API 호출
export const editTodo = async ({ id, name, memo, imageUrl }: EditTodo) => {
  const response = await todoApi.patch(`/items/${id}`, { name, memo, imageUrl });
  return response.data;
};

// deleteTodo 함수: 특정 ID의 할 일을 삭제하기 위한 API 호출
export const deleteTodo = async (id: number) => {
  const response = await todoApi.delete(`/items/${id}`);
  return response.data;
};
