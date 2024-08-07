"use client";

import React from "react";
import { TodoRow } from "../home/TodoRow";
import { fetchTodo } from "@/app/services/todo";
import { Button } from "../Button";
import { useQuery } from "@tanstack/react-query";

export const DetailContainer = ({ id }: { id: string }) => {
  const { data: todo, error } = useQuery({
    queryKey: ["todos", Number(id)],
    queryFn: () => fetchTodo(Number(id)),
  });

  return (
    <div>
      {todo && (
        <TodoRow
          id={todo.id}
          isCompleted={todo.isCompleted}
          name={todo.name}
          isDetail={true}
          className="justify-center"
        />
      )}
      <div></div>
      <div className="bg-memo w-full h-[311px] m-4"></div>
      <div>
        <Button icon={"complete"} content={"수정 완료"} bgColor={"gray"} />
        <Button icon={"delete"} content={"삭제하기"} bgColor={"red"} />
      </div>
    </div>
  );
};
