"use client";

import React, { useEffect, useState } from "react";
import { TodoRow } from "../home/TodoRow";
import { deleteTodo, editTodo, fetchTodo, uploadImg } from "@/app/services/todo";
import { Button } from "../Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MemoSection } from "./MemoSection";
import { ImageSection } from "./ImageSection";
import { useRouter } from "next/navigation";

export const DetailContainer = ({ id }: { id: string }) => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");

  const router = useRouter();

  const { data: todo, error } = useQuery({
    queryKey: ["todos", Number(id)],
    queryFn: () => fetchTodo(Number(id)),
  });

  const { mutateAsync: editTodoMutation, isPending } = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      console.log("성공");
      setName("");
      setMemo("");
      setImgFile(null);
      router.push("/");
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadImg(file),

    onError: (error) => {
      console.error("파일 업로드 실패:", error);
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      console.log("삭제 성공");
    },
  });

  useEffect(() => {
    todo && setName(todo.name);
  }, [todo]);

  return (
    <form>
      {todo && (
        <TodoRow
          id={todo.id}
          isCompleted={todo.isCompleted}
          name={todo.name}
          setName={setName}
          isDetail={true}
          className="justify-center underline"
        />
      )}
      <ImageSection imgUrl={todo?.imageUrl} setImgFile={setImgFile} />
      <MemoSection memo={todo?.memo || ""} setMemo={setMemo} />
      <div className="flex gap-4 justify-center">
        <Button
          icon={"complete"}
          content={"수정 완료"}
          bgColor={"gray"}
          textColor={"black"}
          disabled={isPending}
          className={isPending ? "opacity-50" : ""}
          onClick={async (e) => {
            e.preventDefault();
            console.log("click");
            let imgUrl = "";
            if (imgFile) {
              const result = await uploadMutation.mutateAsync(imgFile as File);
              imgUrl = result.url;
              console.log(result);
            }
            editTodoMutation({ id: Number(id), name, memo, imageUrl: imgUrl });
          }}
        />
        <Button
          icon={"delete"}
          content={"삭제하기"}
          bgColor={"red"}
          textColor={"white"}
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            deleteTodoMutation(Number(id));
            router.push("/");
          }}
        />
      </div>
    </form>
  );
};
