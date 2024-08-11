import React from "react";
import AddSection from "./AddSection";
import TodoListSection from "./TodoListSection";

export const HomeContainer = () => {
  return (
    <main className="px-4 md:px-6 lg:px-[360px]">
      <AddSection />
      <TodoListSection />
    </main>
  );
};
