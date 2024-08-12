import React from "react";
import DoneLgImg from "@/public/images/done_lg.svg";
import TodoLgImg from "@/public/images/todo_lg.svg";
import DoneSmImg from "@/public/images/done_sm.svg";
import TodoSmImg from "@/public/images/todo_sm.svg";

export const EmptyTodo = ({ isDone }: { isDone: boolean }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 md:gap-6 lg:mt-16">
        {/* 완료된 할 일인지 여부에 따라 다른 이미지를 표시 */}
        {isDone ? (
          <>
            <DoneLgImg className="hidden md:block" />
            <DoneSmImg className="md:hidden" />
          </>
        ) : (
          <>
            <TodoLgImg className="hidden md:block" />
            <TodoSmImg className="md:hidden" />
          </>
        )}
        {/* 완료 여부에 따라 다른 메시지 표시 */}
        <div className="flex text-100 text-center text-slate-400">
          {isDone ? (
            <>
              아직 다 한 일이 없어요.
              <br /> 해야 할 일을 체크해보세요!
            </>
          ) : (
            <>
              할 일이 없어요.
              <br /> TODO를 새롭게 추가해주세요!
            </>
          )}
        </div>
      </div>
    </>
  );
};
