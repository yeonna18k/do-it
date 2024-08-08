"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { switchTodo } from "@/app/services/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DefaultBoxIcon from "../../../public/icons/checkbox_default.svg";
import CheckedBoxIcon from "../../../public/icons/checkbox_checked.svg";
import { ApiResponse } from "@/app/types/type";
import { cn } from "@/app/utils/tailwind";

interface TodoProps {
  id: number;
  isCompleted: boolean;
  name: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  isDetail?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}
0;

export const TodoRow = ({ id, isCompleted, name, setName, isDetail, className }: TodoProps) => {
  const queryClient = useQueryClient();
  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    SwitchTodoMutation.mutate({ id, isCompleted: !isCompleted });
  };

  const SwitchTodoMutation = useMutation({
    mutationFn: switchTodo,
    onMutate: async ({ id, isCompleted }: Omit<TodoProps, "name">) => {
      // Omit: TodoProps에서 부분만 사용
      if (isDetail) {
        // Optimistic Updates: Detail 페이지에서 사용
        await queryClient.cancelQueries({ queryKey: ["todos", id] });
        const previousTodo = queryClient.getQueryData<ApiResponse>(["todos", id]);
        if (previousTodo) {
          const newTodo = { ...previousTodo, isCompleted };
          queryClient.setQueryData<ApiResponse>(["todos", id], newTodo);
          return { newTodo };
        }
      } else {
        // Optimistic Updates: Home 페이지에서 사용
        await queryClient.cancelQueries({ queryKey: ["todos"] });
        const previousTodo = queryClient.getQueryData<ApiResponse[]>(["todos"]) || [];
        const newTodoList = previousTodo?.map((todo) => (todo.id === id ? { ...todo, isCompleted } : todo));
        queryClient.setQueryData<ApiResponse[]>(["todos"], newTodoList);
        return { newTodoList };
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const rowContent = (
    <div
      className={cn(
        `flex items-center border-2 border-black rounded-[27px] p-2 gap-4`,
        { "line-through bg-violet-100": isCompleted },
        { "justify-center underline": isDetail },
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
          style={{ width: name.length * 15 + "px" }}
          className="bg-transparent w-fit"
          onChange={(event) => {
            if (setName) {
              event.currentTarget.style.width = event.currentTarget.value.length * 11 + "px";
              setName(event.currentTarget.value);
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
