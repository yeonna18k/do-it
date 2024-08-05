import React from "react";
import DefaultBoxIcon from "../../../public/icons/checkbox_default.svg";

export const TodoRow: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex items-center border-2 border-black rounded-[27px] p-2 gap-4">
      <DefaultBoxIcon className="transition ease-linear hover:cursor-pointer hover:opacity-25 rounded-full" />
      <div className="text-100">{name}</div>
    </div>
  );
};
