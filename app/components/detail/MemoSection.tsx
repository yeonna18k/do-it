import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface MemoSectionProps {
  memo: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
}

export const MemoSection = ({ memo, setMemo }: MemoSectionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트 영역의 크기를 자동으로 조절하는 함수
  const autoResize = () => {
    if (textareaRef.current) {
      if (textareaRef.current.scrollHeight > 211) {
        textareaRef.current.style.height = "211px";
      } else {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  // 컴포넌트가 마운트될 때 초기 크기 조정
  useEffect(() => {
    autoResize();
  }, []);

  return (
    <div className="relative w-full lg:w-[588px] h-[311px] flex flex-col justify-between items-center ">
      {/* 메모 섹션의 배경 이미지 */}
      <Image
        src={"/images/memo.svg"}
        fill
        priority
        alt="memo"
        style={{ objectFit: "cover", borderRadius: "24px", zIndex: "1" }}
      />
      <div className="text-amber-800 text-300 my-6 z-10">Memo</div>
      <div className="w-full h-[245px] p-6 pt-0 flex justify-center items-center">
        {/* 텍스트 입력 영역 */}
        <textarea
          ref={textareaRef}
          placeholder="할 일에 대한 메모를 입력해보세요"
          style={{ zIndex: "10" }}
          defaultValue={memo}
          onInput={autoResize}
          onChange={() => {
            textareaRef.current?.value && setMemo(textareaRef.current?.value);
          }}
          className={`text-100 scrollbar scroll-auto bg-transparent w-full focus:outline-none resize-none flex items-center justify-center ${textareaRef.current?.scrollHeight && textareaRef.current?.scrollHeight > 48 ? "text-start" : "text-center"}  p-0 m-auto`}
        ></textarea>
      </div>
    </div>
  );
};
