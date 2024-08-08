import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface MemoSectionProps {
  memo: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
}

export const MemoSection = ({ memo, setMemo }: MemoSectionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      if (textareaRef.current.scrollHeight > 211) {
        textareaRef.current.style.height = "211px";
      } else {
        console.log(textareaRef.current.scrollHeight);
        console.log(textareaRef.current.style.height);
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  return (
    <div className="relative w-full h-[311px] flex flex-col justify-between items-center">
      <Image src={"/images/memo.svg"} fill alt="memo" style={{ borderRadius: "24px", zIndex: "-1" }} />
      <div className=" text-amber-800 text-300 my-6">Memo</div>
      <div className=" w-full h-[245px] p-6 pt-0 flex justify-center items-center">
        <textarea
          ref={textareaRef}
          placeholder="할 일에 대한 메모를 입력해보세요"
          defaultValue={memo}
          onInput={autoResize}
          onChange={() => {
            textareaRef.current?.value && setMemo(textareaRef.current?.value);
          }}
          className={`bg-transparent w-full focus:outline-none resize-none flex items-center justify-center ${textareaRef.current?.scrollHeight && textareaRef.current?.scrollHeight > 48 ? "text-start" : "text-center"}  p-0 m-auto`}
        ></textarea>
      </div>
    </div>
  );
};
