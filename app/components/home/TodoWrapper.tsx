"use client";

import React from "react";
import { TodoRow } from "./TodoRow";
import { EmptyTodo } from "./EmptyTodo";
import TodoIcon from "@/public/images/todo.svg";
import DoneIcon from "@/public/images/done.svg";
import { ApiResponse } from "@/app/types/type";

export interface TodoWrapperProps {
  isDone: boolean;
  todos: ApiResponse[];
}

export const TodoWrapper = ({ todos, isDone }: TodoWrapperProps) => {
  const filteredTodos = todos?.filter((item: ApiResponse) => item.isCompleted === isDone);

  return (
    <div className={`w-full flex flex-col ${filteredTodos?.length === 0 ? "" : "gap-y-4"}`}>
      {isDone ? <DoneIcon /> : <TodoIcon />}
      {filteredTodos?.length === 0 && <EmptyTodo isDone={isDone} />}
      {filteredTodos?.map((todo: ApiResponse) => (
        <TodoRow key={todo.id} id={todo.id} isCompleted={todo.isCompleted} name={todo.name} />
      ))}
    </div>
  );
};
