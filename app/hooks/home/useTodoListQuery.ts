import { fetchTodo, fetchTodos } from "@/app/services/todo";
import { useQuery } from "@tanstack/react-query";

const useTodoListQuery = () => {
  const { data: todos, error: isTodosError } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
    refetchOnMount: false,
  });

  return { todos };
};
export default useTodoListQuery;
