"use client";

import React from "react";
import AddIcon from "@/public/icons/add_white.svg";
import DeleteIcon from "@/public/icons/delete.svg";
import CompleteIcon from "@/public/icons/complete.svg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: "addDefault" | "addPurple" | "delete" | "complete";
  bgColor: "red" | "purple" | "green" | "gray";
  textColor: "black" | "white";
  isDetail?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

// 배경색과 텍스트 색상을 매핑하는 객체
const bgColorMap: { [key: string]: string } = {
  red: "bg-rose-500",
  purple: "bg-violet-600",
  green: "bg-lime-300",
  gray: "bg-slate-200",
};

const textColorMap: { [key: string]: string } = {
  black: "text-black",
  white: "text-white",
};

// Button 컴포넌트 정의
export const Button = ({ icon, content, bgColor, textColor, isDetail, onClick }: ButtonProps) => {
  // 클래스 이름을 배경색과 텍스트 색상에 따라 설정
  const bgColorClass = bgColorMap[bgColor] || "bg-slate-200";
  const textColorClass = textColorMap[textColor] || "black";

  // 아이콘을 렌더링하는 함수
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
      onClick={onClick}
      className={`h-[56px] flex items-center justify-center ${isDetail ? "w-[168px]" : "md:min-w-[162px] lg:min-w-[168px]"} gap-1 p-[18px] border-2 border-black rounded-[24px] shadow-input 
        ${bgColorClass} `}
    >
      {renderIcon()} {/* 아이콘 렌더링 */}
      <span className={`${content === "추가하기" && "hidden md:block"} ${textColorClass} text-100`}>
        {content} {/* 버튼 텍스트 */}
      </span>
    </button>
  );
};
