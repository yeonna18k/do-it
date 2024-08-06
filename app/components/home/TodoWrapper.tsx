"use client";

import React from "react";
import { TodoRow } from "./TodoRow";
import TodoIcon from "@/public/images/todo.svg";
import DoneIcon from "@/public/images/done.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/services/todo";

interface TodoWrapperProps {
  isDone: boolean;
}

export const TodoWrapper = ({ isDone }: TodoWrapperProps) => {
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
