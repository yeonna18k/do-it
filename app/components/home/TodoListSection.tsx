import { TodoWrapper } from "./TodoWrapper";

export const TodoListSection = () => {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start gap-8 mx-4 mt-5 mb-10 ">
      <TodoWrapper isDone={false} />
      <TodoWrapper isDone={true} />
    </div>
  );
};

export default TodoListSection;
