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

const useTodoMutation = (isDetail?: Pick<TodoProps, "isDetail">) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const switchTodoMutation = useMutation({
    mutationFn: switchTodo,
    onMutate: async ({ id, isCompleted }: Omit<TodoProps, "name">) => {
      // Omit: TodoProps에서 부분만 사용
      if (isDetail) {
        // Optimistic Updates: Detail 페이지에서 사용
        await queryClient.cancelQueries({ queryKey: ["todos", id] });
        const previousTodo = queryClient.getQueryData<ApiResponse>(["todos", id]);
        if (previousTodo) {
          const newTodo = { ...previousTodo, isCompleted };
          queryClient.setQueryData<ApiResponse>(["todos", id], newTodo);
          return { newTodo };
        }
      } else {
        // Optimistic Updates: Home 페이지에서 사용
        await queryClient.cancelQueries({ queryKey: ["todos"] });
        const previousTodo = queryClient.getQueryData<ApiResponse[]>(["todos"]) || [];
        const newTodoList = previousTodo?.map((todo) => (todo.id === id ? { ...todo, isCompleted } : todo));
        queryClient.setQueryData<ApiResponse[]>(["todos"], newTodoList);
        return { newTodoList };
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodo = queryClient.getQueryData<ApiResponse[]>(["todos"]) || [];
      const newTodoList = previousTodo.filter((todo) => todo.id !== id);

      queryClient.setQueryData<ApiResponse[]>(["todos"], newTodoList);
      return { newTodoList };
    },
  });

  const { mutateAsync: editTodoMutation, isPending: isEditTodoPending } = useMutation({
    mutationFn: editTodo,
    onMutate: async ({ id, name, memo, imageUrl }) => {
      await queryClient.cancelQueries({ queryKey: ["todos", id] });
      const previousTodo = queryClient.getQueryData<ApiResponse>(["todos", id]);
      if (previousTodo) {
        const newTodo = { ...previousTodo, name, memo, imageUrl };
        queryClient.setQueryData<ApiResponse>(["todos", id], newTodo);
      }
      return { previousTodo };
    },
    onSuccess: (todo) => {
      queryClient.invalidateQueries({ queryKey: ["todos", todo.id] });
      router.push("/");
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadImg(file),
    onError: (error) => {
      console.error("파일 업로드 실패:", error);
    },
  });

  return { switchTodoMutation, deleteTodoMutation, editTodoMutation, isEditTodoPending, uploadMutation };
};
export default useTodoMutation;
