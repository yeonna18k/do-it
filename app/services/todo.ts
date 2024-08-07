import todoApi from "@/config/axios";
import { ApiResponse } from "../types/type";

interface PostTodo {
  name: string;
}
interface SwitchTodo {
  id: number;
  isCompleted: boolean;
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
