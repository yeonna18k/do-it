import todoApi from "@/config/axios";
import { ApiResponse } from "@/type";

interface PostTodo {
  name: string;
}

export const createTodo = async (todo: PostTodo) => {
  const response = await todoApi.post("/items", todo);
  return response.data;
};

export const switchTodo = async (id: number, isCompleted: boolean) => {
  const response = await todoApi.patch(`/items/${id}`, { isCompleted });
  return response.data;
};

export const fetchTodos = async (): Promise<ApiResponse[]> => {
  const response = await todoApi.get<ApiResponse[]>("/items");
  console.log(response);
  return response.data;
};
