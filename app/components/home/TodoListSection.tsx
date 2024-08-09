"use client";

import useTodoListQuery from "@/app/hooks/home/useTodoListQuery";
import { TodoWrapper } from "./TodoWrapper";
import { LoadingSpinner } from "../common/LoadingSpinner";

export const TodoListSection = () => {
  const { todos } = useTodoListQuery();

  if (!todos) return <LoadingSpinner />;
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start gap-8 mx-4 mt-5 mb-10 ">
      <TodoWrapper todos={todos} isDone={false} />
      <TodoWrapper todos={todos} isDone={true} />
    </div>
  );
};

export default TodoListSection;
