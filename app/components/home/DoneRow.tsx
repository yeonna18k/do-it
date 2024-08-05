import React from "react";
import CheckedBoxIcon from "../../../public/icons/checkbox_checked.svg";
import { ApiResponse } from "@/type";

export const DoneRow: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex items-center border-2 bg-violet-100 border-black rounded-[27px] p-2 gap-4">
      <CheckedBoxIcon className="transition ease-linear hover:cursor-pointer hover:opacity-25 rounded-full" />
      <div className="text-100 line-through ">{name}</div>
    </div>
  );
};
