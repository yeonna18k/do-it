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
  // 완료 여부에 따라 할 일 목록을 필터링
  const filteredTodos = todos?.filter((item: ApiResponse) => item.isCompleted === isDone);

  return (
    <div className={`w-full flex flex-col ${filteredTodos?.length === 0 ? "" : "gap-y-4"}`}>
      {/* 완료된 할 일과 미완료된 할 일에 따라 다른 아이콘 표시 */}
      {isDone ? <DoneIcon /> : <TodoIcon />}
      {/* 필터링된 할 일이 없을 경우 빈 목록을 보여주는 컴포넌트 표시 */}
      {filteredTodos?.length === 0 && <EmptyTodo isDone={isDone} />}
      {/* 필터링된 할 일 목록을 순회하며 TodoRow 컴포넌트로 표시 */}
      {filteredTodos?.map((todo: ApiResponse) => (
        <TodoRow key={todo.id} id={todo.id} isCompleted={todo.isCompleted} name={todo.name} />
      ))}
    </div>
  );
};
