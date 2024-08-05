"use client";

import TodoIcon from "@/public/images/todo.svg";
import DoneIcon from "@/public/images/done.svg";
import React from "react";
import { TodoRow } from "./TodoRow";
import { DoneRow } from "./DoneRow";

interface TodoWrapperProps {
  isdone: boolean;
}

export const TodoWrapper: React.FC<TodoWrapperProps> = ({ isdone }) => {
  return (
    <div className="flex flex-col gap-y-4 mx-4 ">
      {isdone ? (
        <>
          <DoneIcon />
          <DoneRow />
        </>
      ) : (
        <>
          <TodoIcon />
          <TodoRow />
        </>
      )}
    </div>
  );
};
