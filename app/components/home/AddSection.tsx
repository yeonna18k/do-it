"use client";

import { useState } from "react";
import PlusIcon from "@/public/icons/plus2.svg";

export const AddSection = () => {
  const [input, setInput] = useState("");
  return (
    <div className="p-4 flex gap-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className="w-full px-6 py-4 bg-slate-100 border-2 border-black rounded-[24px] shadow-input text-100"
      />
      <button className="p-[18px] bg-slate-200 border-2 border-black rounded-[24px]  shadow-input">
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  );
};

export default AddSection;
