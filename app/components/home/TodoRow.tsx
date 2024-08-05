import React from "react";
import DefaultBoxIcon from "../../../public/icons/checkbox_default.svg";

export const TodoRow = () => {
  return (
    <div className="flex items-center border-2 border-black rounded-[27px] p-2 gap-4">
      <DefaultBoxIcon />
      <div className="text-100">비타민 챙겨먹기</div>
    </div>
  );
};
