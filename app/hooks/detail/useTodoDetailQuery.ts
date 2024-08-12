import { fetchTodo, fetchTodos } from "@/app/services/todo";
import { useQuery } from "@tanstack/react-query";

// useTodoDetailQuery 훅: 특정 할 일의 상세 정보를 가져오는 기능을 제공
const useTodoDetailQuery = (id: string) => {
  const {
    data: todo,
    error: isTodoError,
    isPending: isTodoPending,
  } = useQuery({
    queryKey: ["todos", Number(id)],
    queryFn: () => fetchTodo(Number(id)),
  });

  // 할 일 데이터와 로딩 상태를 반환
  return { todo, isTodoPending };
};
export default useTodoDetailQuery;
