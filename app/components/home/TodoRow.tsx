import React from "react";
import Link from "next/link";
import { switchTodo } from "@/services/todo";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/config/ReactQueryClientProvider";
import DefaultBoxIcon from "../../../public/icons/checkbox_default.svg";
import CheckedBoxIcon from "../../../public/icons/checkbox_checked.svg";
import { ApiResponse } from "@/type";

interface TodoProps {
  id: number;
  isCompleted: boolean;
  name: string;
}

export const TodoRow = ({ id, isCompleted, name }: TodoProps) => {
  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    SwitchTodoMutation.mutate({ id, isCompleted: !isCompleted });
  };

  const SwitchTodoMutation = useMutation({
    mutationFn: switchTodo,
    onMutate: async ({ id, isCompleted }: Omit<TodoProps, "name">) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodo = queryClient.getQueryData<ApiResponse[]>(["todos"]) || [];
      const newTodoList = previousTodo?.map((todo) => (todo.id === id ? { ...todo, isCompleted } : todo));
      queryClient.setQueryData<ApiResponse[]>(["todos"], newTodoList);
      return { newTodoList };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Link href={`/items/${id}`}>
      <div
        className={`flex items-center border-2 border-black rounded-[27px] p-2 gap-4 ${isCompleted ? "line-through bg-violet-100" : "bg-white"}`}
      >
        <div
          className="transition ease-linear hover:cursor-pointer hover:opacity-25 rounded-full"
          onClick={handleIconClick}
        >
          {isCompleted ? <CheckedBoxIcon /> : <DefaultBoxIcon />}
        </div>
        <div className="text-100">{name}</div>
      </div>
    </Link>
  );
};
