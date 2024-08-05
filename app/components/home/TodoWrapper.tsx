"use client";

import TodoIcon from "@/public/images/todo.svg";
import DoneIcon from "@/public/images/done.svg";
import React from "react";
import { TodoRow } from "./TodoRow";
import { DoneRow } from "./DoneRow";
import todoApi from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/type";

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
  console.log(todosQuery.data);

  return (
    <div className="flex flex-col gap-y-4 mx-4 mt-5 mb-10">
      {isdone ? (
        <>
          <DoneIcon />
          {todosQuery?.data
            ?.filter((item) => item.isCompleted === true)
            .map((todo) => <DoneRow key={todo.id} name={todo.name} />)}
        </>
      ) : (
        <>
          <TodoIcon />
          {todosQuery?.data
            ?.filter((item) => item.isCompleted === false)
            .map((todo) => <TodoRow key={todo.id} name={todo.name} />)}
        </>
      )}
    </div>
  );
};
