"use client";

import React, { useState } from "react";
import { TodoRow } from "../home/TodoRow";
import { editTodo, fetchTodo } from "@/app/services/todo";
import { Button } from "../Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MemoSection } from "./MemoSection";
import { ImageSection } from "./ImageSection";

export const DetailContainer = ({ id }: { id: string }) => {
  const [isEditing, setIsEditing] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");

  const { data: todo, error } = useQuery({
    queryKey: ["todos", Number(id)],
    queryFn: () => fetchTodo(Number(id)),
  });

  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      console.log("성공");
    },
  });

  return (
    <form>
      {todo && (
        <TodoRow
          id={todo.id}
          isCompleted={todo.isCompleted}
          name={todo.name}
          isDetail={true}
          className="justify-center underline"
        />
      )}
      <ImageSection />
      <MemoSection />
      <div className="flex gap-4 justify-center">
        <Button
          icon={"complete"}
          content={"수정 완료"}
          bgColor={"gray"}
          textColor={"black"}
          onClick={(e) => {
            e.preventDefault();
            console.log("click");
            editTodoMutation.mutate({ id: Number(id), name, memo, imageUrl: imgUrl });
          }}
        />
        <Button icon={"delete"} content={"삭제하기"} bgColor={"red"} textColor={"white"} />
      </div>
    </form>
  );
};
