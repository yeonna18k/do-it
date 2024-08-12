"use client";

import React, { useEffect, useState } from "react";
import { TodoRow } from "../home/TodoRow";
import { MemoSection } from "./MemoSection";
import { ImageSection } from "./ImageSection";
import { ButtonSection } from "./ButtonSection";
import { useRouter } from "next/navigation";
import useTodoMutation from "@/app/hooks/detail/useTodoMutation";
import { LoadingSpinner } from "../common/LoadingSpinner";
import useTodoDetailQuery from "@/app/hooks/detail/useTodoDetailQuery";

export const DetailContainer = ({ id }: { id: string }) => {
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");

  const router = useRouter();

  const { deleteTodoMutation, editTodoMutation, isEditTodoPending, uploadMutation } = useTodoMutation();
  const { todo, isTodoPending } = useTodoDetailQuery(id);

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
    await deleteTodoMutation(Number(id));
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
    <div
      className={`h-screen lg:max-w-[1200px] mx-auto ${isEditTodoPending ? "opacity-50 pointer-events-none " : ""} flex flex-col gap-4 md:gap-6 bg-white p-4 md:p-6 lg:px-[102px]`}
    >
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
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <ImageSection imgUrl={todo?.imageUrl} setImgFile={setImgFile} />
        <MemoSection memo={todo?.memo || ""} setMemo={setMemo} />
      </div>

      <ButtonSection isCompleted={todo?.isCompleted} editHandler={editHandler} deleteHandler={deleteHandler} />
    </div>
  );
};
