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

export const createTodo = async (todo: PostTodo) => {
  const response = await todoApi.post("/items", todo);
  return response.data;
};

export const switchTodo = async ({ id, isCompleted }: SwitchTodo) => {
  const response = await todoApi.patch(`/items/${id}`, { isCompleted });
  return response.data;
};

export const fetchTodos = async (pageParam: number): Promise<ApiResponse[]> => {
  const response = await todoApi.get<ApiResponse[]>(`/items?page=${pageParam}`);
  return response.data;
};

export const fetchTodo = async (id: number): Promise<ApiResponse> => {
  const response = await todoApi.get<ApiResponse>(`/items/${id}`);
  return response.data;
};

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

export const editTodo = async ({ id, name, memo, imageUrl }: EditTodo) => {
  const response = await todoApi.patch(`/items/${id}`, { name, memo, imageUrl });
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await todoApi.delete(`/items/${id}`);
  return response.data;
};
