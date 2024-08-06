"use client";

import { useState } from "react";
import { Button as Button } from "../Button";

export const AddSection = () => {
  const [input, setInput] = useState("");
  return (
    <div className="p-4 flex gap-4 justify-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력해주세요"
        className="w-full px-6 py-4 bg-slate-100 border-2 border-black rounded-[24px] shadow-input text-100 max-w-[1016px]"
      />
      <Button icon={"addDefault"} content={"추가하기"} bgColor={"gray"} />
    </div>
  );
};

export default AddSection;
