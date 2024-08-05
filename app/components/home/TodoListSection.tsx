"use client";

import TodoIcon from "../../../public/images/todo.svg";
import DoneIcon from "../../../public/images/done.svg";

import todoApi from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { TodoRow } from "./TodoRow";

const fetchTodos = async () => {
  const response = await todoApi.get("/items");
  return response.data;
};

export const TodoListSection = () => {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  });
  console.log(todosQuery.data);

  return (
    <div>
      <TodoIcon />

      <TodoRow />
    </div>
  );
};

export default TodoListSection;
