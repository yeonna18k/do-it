import React from "react";
import { Button } from "../common/Button";

interface ButtonSectionProps {
  editHandler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const ButtonSection = ({ editHandler, deleteHandler }: ButtonSectionProps) => {
  return (
    <div className="flex gap-4 justify-center">
      <Button icon={"complete"} content={"수정 완료"} bgColor={"gray"} textColor={"black"} onClick={editHandler} />
      <Button icon={"delete"} content={"삭제하기"} bgColor={"red"} textColor={"white"} onClick={deleteHandler} />
    </div>
  );
};
