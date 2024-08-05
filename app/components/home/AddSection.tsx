"use client";

import { useState } from "react";

export const AddSection = () => {
  const [input, setInput] = useState("");
  return (
    <div className="p-2 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className="w-full max-w-[1000px] h-[56px] p-5 bg-slate-100 border-2 border-black rounded-3xl shadow-xl"
      />
      <button className="h-[56px] w-[164px] bg-slate-200 border-2 border-black rounded-3xl shadow-xl">추가하기</button>
    </div>
  );
};

export default AddSection;
