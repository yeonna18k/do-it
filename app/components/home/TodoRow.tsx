"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/app/utils/tailwind";
import DefaultBoxIcon from "@/public/icons/checkbox_default.svg";
import CheckedBoxIcon from "@/public/icons/checkbox_checked.svg";
import useTodoMutation, { TodoProps } from "@/app/hooks/detail/useTodoMutation";

export const TodoRow = ({ id, isCompleted, name, setName, isDetail }: TodoProps) => {
  const { switchTodoMutation } = useTodoMutation(isDetail);

  // 체크박스 아이콘 클릭 시 할 일의 완료 상태를 전환하는 함수
  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    switchTodoMutation.mutate({ id, isCompleted: !isCompleted });
  };

  // 할 일 내용 또는 수정 가능한 input 필드
  const rowContent = (
    <div
      className={cn(
        `h-[50px] flex items-center border-2 border-black rounded-[27px] p-2 gap-4 bg-white`,
        { "line-through bg-violet-100": isCompleted },
        { "text-500 justify-center underline": isDetail },
      )}
    >
      {/* 완료 상태 토글 아이콘 */}
      <div
        className="transition ease-linear hover:cursor-pointer hover:opacity-25 rounded-full"
        onClick={handleIconClick}
      >
        {isCompleted ? <CheckedBoxIcon /> : <DefaultBoxIcon />}
      </div>
      {/* 할 일 내용 또는 수정 가능한 input 필드 */}
      {isDetail ? (
        <input
          defaultValue={name}
          className="bg-transparent w-fit"
          style={{
            width: name.length * 1.3 + "ch",
          }}
          onChange={(event) => {
            if (setName) {
              setName(event.currentTarget.value);
              event.currentTarget.style.width = event.currentTarget.value.length * 1.3 + "ch";
            }
          }}
        />
      ) : (
        <div className="text-100">{name}</div>
      )}
    </div>
  );
  // 홈페이지에서 할 일 항목을 링크로 감싸서 클릭 시 상세 페이지로 이동
  return isDetail ? rowContent : <Link href={`/items/${id}`}>{rowContent}</Link>;
};
