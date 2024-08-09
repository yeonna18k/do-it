import { createTodo } from "@/app/services/todo";
import { ApiResponse } from "@/app/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { SetStateAction } from "react";

const useCreateTodo = (setInput: React.Dispatch<SetStateAction<string>>) => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async ({ name }: { name: string }) => {
      setInput("");
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodo = queryClient.getQueryData<ApiResponse[]>(["todos"]) || [];
      queryClient.setQueryData(["todos"], [{ name, isCompleted: false, id: 0 }, ...previousTodo]);
      return { previousTodo };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return { createTodoMutation };
};

export default useCreateTodo;
