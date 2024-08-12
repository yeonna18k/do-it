"use client";

import React, { useEffect, useState } from "react";
import { TodoRow } from "../home/TodoRow";
import { MemoSection } from "./MemoSection";
import { ImageSection } from "./ImageSection";
import { ButtonSection } from "./ButtonSection";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../common/LoadingSpinner";
import useTodoMutation from "@/app/hooks/detail/useTodoMutation";
import useTodoDetailQuery from "@/app/hooks/detail/useTodoDetailQuery";

export const DetailContainer = ({ id }: { id: string }) => {
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");

  const router = useRouter();

  // 할 일 수정, 삭제, 업로드를 위한 커스텀 훅 사용
  const { deleteTodoMutation, editTodoMutation, isEditTodoPending, uploadMutation } = useTodoMutation();
  // 할 일 상세 정보를 가져오는 커스텀 훅 사용
  const { todo, isTodoPending } = useTodoDetailQuery(id);

  // 수정 버튼 클릭 시 호출되는 함수: 할 일 수정 처리 및 이미지 업로드
  const editHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let imgUrl = todo?.imageUrl || "";
    if (imgFile) {
      const result = await uploadMutation.mutateAsync(imgFile as File);
      imgUrl = result.url;
    }
    editTodoMutation({ id: Number(id), name, memo, imageUrl: imgUrl });
  };

  // 삭제 버튼 클릭 시 호출되는 함수: 할 일 삭제 후 홈으로 리다이렉트
  const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteTodoMutation(Number(id));
    router.push("/");
  };

  // 컴포넌트가 마운트될 때 할 일 상세 정보를 상태에 설정
  useEffect(() => {
    if (todo) {
      setName(todo.name);
      if (todo.memo) setMemo(todo.memo);
    }
  }, [todo]);

  // 할 일 데이터를 가져오는 중이면 로딩 스피너를 표시
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
      {/* 할 일 목록: 상세페이지에서는 input 형태로 보여줌 */}
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
        {/* 이미지 섹션: 할 일에 첨부된 이미지 관리 */}
        <ImageSection imgUrl={todo?.imageUrl} setImgFile={setImgFile} />
        {/* 메모 섹션: 할 일에 대한 메모 관리 */}
        <MemoSection memo={todo?.memo || ""} setMemo={setMemo} />
      </div>
      {/* 버튼 섹션: 할 일 수정 및 삭제 버튼 */}
      <ButtonSection isCompleted={todo?.isCompleted} editHandler={editHandler} deleteHandler={deleteHandler} />
    </div>
  );
};
