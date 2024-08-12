"use client";

import useTodoListQuery from "@/app/hooks/home/useTodoListQuery";
import { TodoWrapper } from "./TodoWrapper";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useCallback, useRef } from "react";

export const TodoListSection = () => {
  // useTodoListQuery를 사용하여 할 일 목록과 페이지네이션 관련 정보 가져오기
  const { todos, fetchNextPage, hasNextPage, isFetchingNextPage } = useTodoListQuery();
  const observeRef = useRef<IntersectionObserver | null>(null);

  // 마지막 할 일 요소를 관찰하여, 화면에 나타날 때 다음 페이지 데이터를 불러오는 함수
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
  // 할 일 목록이 없을 경우 로딩 스피너를 표시
  if (!todos) return <LoadingSpinner />;

  return (
    <div className="max-h-[700px] lg:max-h-[382px] overflow-y-auto">
      <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start gap-8 lg:gap-6 mt-4 mb-10">
        {/* 미완료된 할 일과 완료된 할 일을 각각 TodoWrapper로 감싸서 표시 */}
        <TodoWrapper todos={todos} isDone={false} />
        <TodoWrapper todos={todos} isDone={true} />
      </div>
      {/* 다음 페이지 데이터를 로드 중일 때 로딩 스피너 표시 */}
      {isFetchingNextPage && <LoadingSpinner />}
      {/* 마지막 요소를 참조하여 페이지네이션 처리 */}
      <div ref={lastTodoRef} />
    </div>
  );
};

export default TodoListSection;
