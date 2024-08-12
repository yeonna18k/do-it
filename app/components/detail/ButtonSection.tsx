import React from "react";
import { Button } from "../common/Button";

interface ButtonSectionProps {
  isCompleted?: boolean;
  editHandler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const ButtonSection = ({ isCompleted, editHandler, deleteHandler }: ButtonSectionProps) => {
  return (
    <div className=" mt-2 md:mt-0 flex gap-2 md:gap-4 justify-center lg:justify-end">
      {/* 수정 완료 버튼: 할 일이 완료되었는지에 따라 색상이 변경됨 */}
      <Button
        icon={"complete"}
        content={"수정 완료"}
        bgColor={`${isCompleted ? "green" : "gray"}`}
        textColor={"black"}
        isDetail={true}
        onClick={editHandler}
      />
      {/* 삭제 버튼: 할 일을 삭제하는 기능 */}
      <Button
        icon={"delete"}
        content={"삭제하기"}
        bgColor={"red"}
        textColor={"white"}
        isDetail={true}
        onClick={deleteHandler}
      />
    </div>
  );
};
