import React from "react";
import CheckedBoxIcon from "../../../public/icons/checkbox_checked.svg";

export const DoneRow = () => {
  return (
    <div className="flex items-center border-2 bg-violet-100 border-black rounded-[27px] p-2 gap-4">
      <CheckedBoxIcon />
      <div className="text-100">은행 다녀오기</div>
    </div>
  );
};
