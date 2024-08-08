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
  memo: string;
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

export const fetchTodos = async (): Promise<ApiResponse[]> => {
  const response = await todoApi.get<ApiResponse[]>("/items");
  console.log(response);
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
  console.log(response.data);
  return response.data;
};
