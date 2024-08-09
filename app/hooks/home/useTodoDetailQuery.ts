import { fetchTodo, fetchTodos } from "@/app/services/todo";
import { useQuery } from "@tanstack/react-query";

const useTodoDetailQuery = (id: string) => {
  const {
    data: todo,
    error: isTodoError,
    isPending: isTodoPending,
  } = useQuery({
    queryKey: ["todos", Number(id)],
    queryFn: () => fetchTodo(Number(id)),
  });

  return { todo, isTodoPending };
};
export default useTodoDetailQuery;
