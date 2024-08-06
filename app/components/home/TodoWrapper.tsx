"use client";

import React from "react";
import { TodoRow } from "./TodoRow";
import TodoIcon from "@/public/images/todo.svg";
import DoneIcon from "@/public/images/done.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/services/todo";
import DoneLgImg from "@/public/images/done_lg.svg";
import TodoLgImg from "@/public/images/todo_lg.svg";
import DoneSmImg from "@/public/images/done_sm.svg";
import TodoSmImg from "@/public/images/todo_sm.svg";
import { ApiResponse } from "@/type";

interface TodoWrapperProps {
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
      {isDone ? (
        <>
          <DoneIcon />
          {filteredTodos?.length === 0 && (
            <div className="flex flex-col justify-center items-center p-2">
              <DoneLgImg className="hidden md:block" />
              <DoneSmImg className="md:hidden" />
              <div className="flex text-100 text-center text-slate-400">
                아직 다 한 일이 없어요.
                <br /> 해야 할 일을 체크해보세요!
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <TodoIcon />
          {filteredTodos?.length === 0 && (
            <div className="flex flex-col justify-center items-center p-2">
              <TodoLgImg className="hidden md:block" />
              <TodoSmImg className="md:hidden" />
              <div className="flex text-100 text-center text-slate-400">
                할 일이 없어요.
                <br /> TODO를 새롭게 추가해주세요!
              </div>
            </div>
          )}
        </>
      )}

      {filteredTodos?.map((todo: ApiResponse) => (
        <TodoRow key={todo.id} id={todo.id} isCompleted={todo.isCompleted} name={todo.name} />
      ))}
    </div>
  );
};
