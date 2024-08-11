import { fetchTodo, fetchTodos } from "@/app/services/todo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 10;

const useTodoListQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: ({ pageParam }) => fetchTodos(pageParam),
    refetchOnMount: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length < PAGE_SIZE ? undefined : pages.length + 1;
    },
  });

  const todos = data?.pages.flat();

  return { todos, fetchNextPage, hasNextPage, isFetchingNextPage };
};
export default useTodoListQuery;
