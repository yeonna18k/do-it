import React from "react";
import Link from "next/link";
import DefaultBoxIcon from "../../../public/icons/checkbox_default.svg";
import CheckedBoxIcon from "../../../public/icons/checkbox_checked.svg";

interface TodoProps {
  id: number;
  isCompleted: boolean;
  name: string;
}

export const TodoRow: React.FC<TodoProps> = ({ id, isCompleted, name }) => {
  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Link href={`/items/${id}`}>
      <div
        className={`flex items-center border-2 border-black rounded-[27px] p-2 gap-4 ${isCompleted ? "line-through bg-violet-100" : "bg-white"}`}
      >
        <div
          className="transition ease-linear hover:cursor-pointer hover:opacity-25 rounded-full"
          onClick={handleIconClick}
        >
          {isCompleted ? <CheckedBoxIcon /> : <DefaultBoxIcon />}
        </div>
        <div className="text-100">{name}</div>
      </div>
    </Link>
  );
};
