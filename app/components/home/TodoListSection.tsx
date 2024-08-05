"use client";

import todoApi from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { TodoWrapper } from "./TodoWrapper";

const fetchTodos = async () => {
  const response = await todoApi.get("/items");
  return response.data;
};

export const TodoListSection = () => {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  });
  console.log(todosQuery.data);

  return (
    <>
      <TodoWrapper isdone={false} />
      <TodoWrapper isdone={true} />
    </>
  );
};

export default TodoListSection;
