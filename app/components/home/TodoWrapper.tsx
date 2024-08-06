"use client";

import React from "react";
import { TodoRow } from "./TodoRow";
import todoApi from "@/config/axios";
import { ApiResponse } from "@/type";
import TodoIcon from "@/public/images/todo.svg";
import DoneIcon from "@/public/images/done.svg";
import { useQuery } from "@tanstack/react-query";

interface TodoWrapperProps {
  isDone: boolean;
}

const fetchTodos = async (): Promise<ApiResponse[]> => {
  const response = await todoApi.get<ApiResponse[]>("/items");
  return response.data;
};

export const TodoWrapper: React.FC<TodoWrapperProps> = ({ isDone: isDone }) => {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  });

  return (
    <div className="w-full lg:max-w-[588px] flex flex-col gap-y-4">
      {isDone ? <DoneIcon /> : <TodoIcon />}
      {todosQuery?.data
        ?.filter((item) => item.isCompleted === isDone)
        .map((todo) => <TodoRow key={todo.id} id={todo.id} isCompleted={todo.isCompleted} name={todo.name} />)}
    </div>
  );
};
