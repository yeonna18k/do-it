import React from "react";
import DefaultBoxIcon from "../../../public/icons/checkbox_default.svg";
import CheckedBoxIcon from "../../../public/icons/checkbox_default.svg";

export const TodoRow = () => {
  return (
    <div className="flex items-center border-2 border-black rounded-3xl p-2 gap-2">
      <DefaultBoxIcon />

      <div>비타민 챙겨먹기</div>
    </div>
  );
};
