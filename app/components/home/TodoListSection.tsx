"use client";

import useTodoListQuery from "@/app/hooks/home/useTodoListQuery";
import { TodoWrapper } from "./TodoWrapper";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useCallback, useRef } from "react";

export const TodoListSection = () => {
  const { todos, fetchNextPage, hasNextPage, isFetchingNextPage } = useTodoListQuery();
  const observeRef = useRef<IntersectionObserver | null>(null);

  const lastTodoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observeRef.current) {
        observeRef.current.disconnect();
      }
      observeRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log(hasNextPage);

          if (hasNextPage) fetchNextPage();
        }
      });
      if (node) observeRef.current?.observe(node);
    },
    [fetchNextPage, hasNextPage],
  );

  if (!todos) return <LoadingSpinner />;
  return (
    <div className="max-h-[700px] lg:max-h-[382px] overflow-y-auto">
      <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start gap-8 lg:gap-6 mt-4 mb-10">
        <TodoWrapper todos={todos} isDone={false} />
        <TodoWrapper todos={todos} isDone={true} />
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={lastTodoRef} />
    </div>
  );
};

export default TodoListSection;
