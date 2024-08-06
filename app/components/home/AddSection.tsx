"use client";

import { useState } from "react";
import { Button } from "../Button";
import { createTodo } from "@/services/todo";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/config/ReactQueryClientProvider";

export const AddSection = () => {
  const [input, setInput] = useState("");

  const createTodoMutation = useMutation({
    mutationFn: () => createTodo({ name: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setInput("");
      console.log("성공");
    },
  });

  return (
    <form
      className="p-4 flex gap-4 justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        createTodoMutation.mutate();
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
