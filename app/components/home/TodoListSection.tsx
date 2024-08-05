import { TodoWrapper } from "./TodoWrapper";

export const TodoListSection = () => {
  return (
    <>
      <TodoWrapper isDone={false} />
      <TodoWrapper isDone={true} />
    </>
  );
};

export default TodoListSection;
