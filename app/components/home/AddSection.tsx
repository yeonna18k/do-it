"use client";

import { useState } from "react";
import { Button } from "../common/Button";
import useTodoListQuery from "@/app/hooks/home/useTodoListQuery";
import useCreateTodo from "@/app/hooks/home/useCreateTodoMutation";

export const AddSection = () => {
  const [input, setInput] = useState("");

  // todos: 현재 등록된 할 일 목록을 가져오는 쿼리
  const { todos } = useTodoListQuery();
  // createTodoMutation: 새로운 할 일을 생성하는 뮤테이션 함수
  const { createTodoMutation } = useCreateTodo(setInput);

  return (
    <form
      className="py-4 md:py-6 flex gap-2 md:gap-4 justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        createTodoMutation.mutate({ name: input });
      }}
    >
      {/* 할 일을 입력받는 텍스트 필드 */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className="w-full h-[56px] px-6 py-4 bg-slate-100 border-2 border-black rounded-[24px] shadow-input text-100"
      />
      {/* 할 일을 추가하는 버튼 */}
      <Button
        icon={todos?.length === 0 ? "addPurple" : "addDefault"}
        content={"추가하기"}
        bgColor={todos?.length === 0 ? "purple" : "gray"}
        textColor={todos?.length === 0 ? "white" : "black"}
      />
    </form>
  );
};

export default AddSection;
