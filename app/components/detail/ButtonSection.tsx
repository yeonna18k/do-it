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
      <Button
        icon={"complete"}
        content={"수정 완료"}
        bgColor={`${isCompleted ? "green" : "gray"}`}
        textColor={"black"}
        isDetail={true}
        onClick={editHandler}
      />
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
