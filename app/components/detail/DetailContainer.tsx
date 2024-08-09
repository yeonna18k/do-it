"use client";

import React, { useEffect, useState } from "react";
import { TodoRow } from "../home/TodoRow";
import { MemoSection } from "./MemoSection";
import { ImageSection } from "./ImageSection";
import { ButtonSection } from "./ButtonSection";
import { useRouter } from "next/navigation";
import useTodoMutation from "@/app/hooks/detail/useTodoMutation";
import useTodoQuery from "@/app/hooks/home/useTodoQuery";
import { LoadingSpinner } from "../common/LoadingSpinner";

export const DetailContainer = ({ id }: { id: string }) => {
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");

  const router = useRouter();

  const { deleteTodoMutation, editTodoMutation, isEditTodoPending, uploadMutation } = useTodoMutation();
  const { todo, isTodoPending } = useTodoQuery(id);

  const editHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let imgUrl = todo?.imageUrl || "";
    if (imgFile) {
      const result = await uploadMutation.mutateAsync(imgFile as File);
      imgUrl = result.url;
    }
    editTodoMutation({ id: Number(id), name, memo, imageUrl: imgUrl });
  };

  const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteTodoMutation(Number(id));
    router.push("/");
  };

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      if (todo.memo) setMemo(todo.memo);
    }
  }, [todo]);
  if (isTodoPending)
    return (
      <div className="h-[calc(100vh-60px-2rem)]">
        <LoadingSpinner />
      </div>
    );

  return (
    <form className={`${isEditTodoPending ? "opacity-50 pointer-events-none " : ""}`}>
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
      <ButtonSection editHandler={editHandler} deleteHandler={deleteHandler} />
    </form>
  );
};
