import { createTodo } from "@/app/services/todo";
import { ApiResponse } from "@/app/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { SetStateAction } from "react";

interface TodosData {
  pages: ApiResponse[][];
  pageParams: any[];
}

const useCreateTodo = (setInput: React.Dispatch<SetStateAction<string>>) => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async ({ name }: { name: string }) => {
      setInput("");
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousPageTodo = queryClient.getQueryData<TodosData>(["todos"]);

      if (previousPageTodo && Array.isArray(previousPageTodo.pages)) {
        const previousTodo: ApiResponse[] = previousPageTodo?.pages.flat();
        queryClient.setQueryData(["todos"], {
          ...previousPageTodo,
          pages: [[{ name, isCompleted: false, id: 0 }, ...previousTodo]],
        });
        return { previousTodo };
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log("mutation 실패", error);
    },
  });
  return { createTodoMutation };
};

export default useCreateTodo;
