"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/app/utils/tailwind";
import DefaultBoxIcon from "@/public/icons/checkbox_default.svg";
import CheckedBoxIcon from "@/public/icons/checkbox_checked.svg";
import useTodoMutation, { TodoProps } from "@/app/hooks/detail/useTodoMutation";

export const TodoRow = ({ id, isCompleted, name, setName, isDetail }: TodoProps) => {
  const { switchTodoMutation } = useTodoMutation(isDetail);

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    switchTodoMutation.mutate({ id, isCompleted: !isCompleted });
  };

  const rowContent = (
    <div
      className={cn(
        `flex items-center border-2 border-black rounded-[27px] p-2 gap-4 bg-white`,
        { "line-through bg-violet-100": isCompleted },
        { "text-500 justify-center underline": isDetail },
      )}
    >
      <div
        className="transition ease-linear hover:cursor-pointer hover:opacity-25 rounded-full"
        onClick={handleIconClick}
      >
        {isCompleted ? <CheckedBoxIcon /> : <DefaultBoxIcon />}
      </div>
      {isDetail ? (
        <input
          defaultValue={name}
          className="bg-transparent w-fit"
          style={{
            width: name.length + "ch",
          }}
          onChange={(event) => {
            if (setName) {
              setName(event.currentTarget.value);
              event.currentTarget.style.width = event.currentTarget.value.length + "ch";
            }
          }}
        />
      ) : (
        <div className="text-100">{name}</div>
      )}
    </div>
  );

  return isDetail ? rowContent : <Link href={`/items/${id}`}>{rowContent}</Link>;
};
