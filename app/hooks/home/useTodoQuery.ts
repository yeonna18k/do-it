import { fetchTodo, fetchTodos } from "@/app/services/todo";
import { useQuery } from "@tanstack/react-query";

const useTodoQuery = (id: string) => {
  const { data: todos, error: isTodosError } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  });

  const {
    data: todo,
    error: isTodoError,
    isPending: isTodoPending,
  } = useQuery({
    queryKey: ["todos", Number(id)],
    queryFn: () => fetchTodo(Number(id)),
  });

  return { todos, todo, isTodoPending };
};
export default useTodoQuery;
