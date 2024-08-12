import { deleteTodo, editTodo, switchTodo, uploadImg } from "@/app/services/todo";
import { ApiResponse } from "@/app/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface TodoProps {
  id: number;
  isCompleted: boolean;
  name: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  isDetail?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

interface TodosData {
  pages: ApiResponse[][];
  pageParams: any[];
}

// useTodoMutation 훅: 할 일(todo)에 대한 다양한 mutation 작업을 처리하는 훅
const useTodoMutation = (isDetail?: boolean) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 할 일 완료 상태를 전환하는 mutation
  const switchTodoMutation = useMutation({
    mutationFn: switchTodo,
    onMutate: async ({ id, isCompleted }: Omit<TodoProps, "name">) => {
      if (isDetail) {
        // Detail 페이지에서의 Optimistic Updates
        await queryClient.cancelQueries({ queryKey: ["todos", id] });
        const previousTodo = queryClient.getQueryData<ApiResponse>(["todos", id]);
        if (previousTodo) {
          const newTodo = { ...previousTodo, isCompleted };
          queryClient.setQueryData<ApiResponse>(["todos", id], newTodo);
          return { newTodo };
        }
      } else {
        // Home 페이지에서의 Optimistic Updates
        await queryClient.cancelQueries({ queryKey: ["todos"] });
        const previousPageTodo = queryClient.getQueryData<TodosData>(["todos"]);
        if (previousPageTodo && Array.isArray(previousPageTodo.pages)) {
          const previousTodo: ApiResponse[] = previousPageTodo?.pages.flat();

          const newTodoList = previousTodo?.map((todo) => (todo.id === id ? { ...todo, isCompleted } : todo));
          console.log(newTodoList);
          if (newTodoList) {
            queryClient.setQueryData(["todos"], {
              ...previousPageTodo,
              pages: [newTodoList],
            });
          }
          return { newTodoList };
        }
      }
    },
  });

  // 할 일을 삭제하는 mutation
  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousPageTodo = queryClient.getQueryData<TodosData>(["todos"]);
      if (previousPageTodo && Array.isArray(previousPageTodo.pages)) {
        const newPages = previousPageTodo.pages.map((page) => page.filter((todo) => todo.id !== id));
        queryClient.setQueryData(["todos"], {
          ...previousPageTodo,
          pages: newPages,
        });
        return { previousPageTodo };
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // 할 일을 수정하는 mutation
  const { mutateAsync: editTodoMutation, isPending: isEditTodoPending } = useMutation({
    mutationFn: editTodo,
    onMutate: async ({ id, name, memo, imageUrl }) => {
      await queryClient.cancelQueries({ queryKey: ["todos", id] });

      const previousPageTodo = queryClient.getQueryData<TodosData>(["todos"]);
      const previousTodo = queryClient.getQueryData<ApiResponse>(["todos", id]);

      if (previousTodo) {
        const newTodo = { ...previousTodo, name, memo, imageUrl };
        if (previousPageTodo && Array.isArray(previousPageTodo.pages)) {
          const updatedPages = previousPageTodo.pages.map((page) =>
            page.map((todo) => (todo.id === id ? newTodo : todo)),
          );

          queryClient.setQueryData(["todos"], {
            ...previousPageTodo,
            pages: updatedPages,
          });
        } else {
          queryClient.setQueryData(["todos", id], newTodo);
        }
        return { previousTodo };
      }
    },
    onSuccess: (todo) => {
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["todos", todo.id] });
    },
  });

  // 이미지 파일을 업로드하는 mutation
  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadImg(file),
    onError: (error) => {
      console.error("파일 업로드 실패:", error);
    },
  });

  // 다양한 할 일 mutation 함수들을 반환
  return { switchTodoMutation, deleteTodoMutation, editTodoMutation, isEditTodoPending, uploadMutation };
};
export default useTodoMutation;
