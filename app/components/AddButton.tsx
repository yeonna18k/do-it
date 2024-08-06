import React from "react";
import AddIcon from "@/public/icons/add_white.svg";
import DeleteIcon from "@/public/icons/delete.svg";
import CompleteIcon from "@/public/icons/complete.svg";

interface ButtonProps {
  icon: "addDefault" | "addPurple" | "delete" | "complete";
  content: string;
  bgColor: "red" | "purple" | "green" | "gray";
}

const bgColorMap: { [key: string]: string } = {
  red: "bg-rose-500",
  purple: "bg-violet-600",
  green: "bg-lime-300",
  gray: "bg-slate-200",
};

export const AddButton = ({ icon, content, bgColor }: ButtonProps) => {
  const bgColorClass = bgColorMap[bgColor] || "bg-slate-200";

  const renderIcon = () => {
    switch (icon) {
      case "addDefault":
        return <AddIcon width={16} height={16} color={"black"} />;
      case "addPurple":
        return <AddIcon width={16} height={16} color={"white"} />;
      case "delete":
        return <DeleteIcon />;
      case "complete":
        return <CompleteIcon />;
      default:
        return null;
    }
  };

  return (
    <button
      className={`flex items-center justify-center md:w-[162px] lg:w-[168px] gap-1 p-[18px] border-2 border-black rounded-[24px] shadow-input 
        ${bgColorClass}`}
    >
      {renderIcon()}
      <span className="hidden md:block text-100">{content}</span>
    </button>
  );
};
