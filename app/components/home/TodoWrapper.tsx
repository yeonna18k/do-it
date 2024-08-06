"use client";

import React from "react";
import { TodoRow } from "./TodoRow";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/services/todo";
import { ApiResponse } from "@/type";
import { EmptyTodo } from "./EmptyTodo";

export interface TodoWrapperProps {
  isDone: boolean;
}

export const TodoWrapper = ({ isDone }: TodoWrapperProps) => {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  });

  const filteredTodos = todosQuery?.data?.filter((item: ApiResponse) => item.isCompleted === isDone);

  return (
    <div className="w-full lg:max-w-[588px] flex flex-col gap-y-4">
      {filteredTodos?.length === 0 && <EmptyTodo isDone={isDone} />}

      {filteredTodos?.map((todo: ApiResponse) => (
        <TodoRow key={todo.id} id={todo.id} isCompleted={todo.isCompleted} name={todo.name} />
      ))}
    </div>
  );
};
