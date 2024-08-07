"use client";

import { useState } from "react";
import { Button } from "../Button";
import { createTodo } from "@/app/services/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/app/types/type";

export const AddSection = () => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async ({ name }: { name: string }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodo = queryClient.getQueryData<ApiResponse[]>(["todos"]) || [];
      queryClient.setQueryData(["todos"], [...previousTodo, { name, isCompleted: false, id: 0 }]);
      return { previousTodo };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setInput("");
    },
  });

  return (
    <form
      className="p-4 flex gap-4 justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        createTodoMutation.mutate({ name: input });
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className="w-full px-6 py-4 bg-slate-100 border-2 border-black rounded-[24px] shadow-input text-100 max-w-[1016px]"
      />
      <Button icon={"addDefault"} content={"추가하기"} bgColor={"gray"} />
    </form>
  );
};

export default AddSection;
