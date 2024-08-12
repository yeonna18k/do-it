import { createTodo } from "@/app/services/todo";
import { ApiResponse } from "@/app/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { SetStateAction } from "react";

interface TodosData {
  pages: ApiResponse[][];
  pageParams: any[];
}

// useCreateTodo 훅: 새로운 할 일을 생성하는 로직을 처리
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
        return { previousTodo }; // Optimistic Update를 위해 이전 데이터를 반환
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log("mutation 실패", error);
    },
  });
  // 할 일 생성 뮤테이션 반환
  return { createTodoMutation };
};

export default useCreateTodo;
