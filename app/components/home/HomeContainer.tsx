import React from "react";
import AddSection from "./AddSection";
import TodoListSection from "./TodoListSection";

export const HomeContainer = () => {
  return (
    <main className="px-4 md:px-6 lg:px-0 lg:w-[1200px] lg:mx-auto">
      {/* AddSection: 할 일을 추가할 수 있는 입력 필드를 포함한 섹션 */}
      <AddSection />
      {/* TodoListSection: 현재 등록된 할 일 목록을 보여주는 섹션 */}
      <TodoListSection />
    </main>
  );
};
