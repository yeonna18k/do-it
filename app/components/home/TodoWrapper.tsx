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

export const TodoWrapper: React.FC<TodoWrapperProps> = ({ isDone: isdone }) => {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  });

  return (
    <div className="flex flex-col gap-y-4 mx-4 mt-5 mb-10">
      {isdone ? (
        <>
          <DoneIcon />
          {todosQuery?.data
            ?.filter((item) => item.isCompleted === true)
            .map((todo) => <TodoRow key={todo.id} id={todo.id} isCompleted={todo.isCompleted} name={todo.name} />)}
        </>
      ) : (
        <>
          <TodoIcon />
          {todosQuery?.data
            ?.filter((item) => item.isCompleted === false)
            .map((todo) => <TodoRow key={todo.id} id={todo.id} isCompleted={todo.isCompleted} name={todo.name} />)}
        </>
      )}
    </div>
  );
};
