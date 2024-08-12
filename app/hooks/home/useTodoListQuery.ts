import { fetchTodos } from "@/app/services/todo";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 10;

const useTodoListQuery = () => {
  // useInfiniteQuery 훅을 사용하여 할 일 목록을 페이징 처리하면서 가져옴
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: ({ pageParam }) => fetchTodos(pageParam),
    refetchOnMount: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length < PAGE_SIZE ? undefined : pages.length + 1;
    },
  });

  const todos = data?.pages.flat(); // 모든 페이지의 데이터를 하나의 배열로 저장

  // 할 일 목록, 다음 페이지를 가져오는 함수, 다음 페이지가 있는지 여부, 다음 페이지 로딩 상태를 반환
  return { todos, fetchNextPage, hasNextPage, isFetchingNextPage };
};
export default useTodoListQuery;
