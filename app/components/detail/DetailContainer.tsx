"use client";

import React, { useState } from "react";
import { TodoRow } from "../home/TodoRow";
import { fetchTodo } from "@/app/services/todo";
import { Button } from "../Button";
import { useQuery } from "@tanstack/react-query";
import { MemoSection } from "./MemoSection";
import { ImageSection } from "./ImageSection";
import { EmptyImageSection } from "./EmptyImageSection";

export const DetailContainer = ({ id }: { id: string }) => {
  const [isEditing, setIsEditing] = useState();

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
          className="justify-center underline"
        />
      )}
      {todo?.imageUrl ? <ImageSection /> : <EmptyImageSection />}
      <MemoSection />
      <div className="flex gap-4 justify-center">
        <Button icon={"complete"} content={"수정 완료"} bgColor={"gray"} textColor={"black"} />
        <Button icon={"delete"} content={"삭제하기"} bgColor={"red"} textColor={"white"} />
      </div>
    </div>
  );
};
