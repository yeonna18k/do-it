import React from "react";
import AddSection from "./AddSection";
import TodoListSection from "./TodoListSection";

export const HomeContainer = () => {
  return (
    <main className="bg-[#F9FAFB]">
      <AddSection />
      <TodoListSection />
    </main>
  );
};
