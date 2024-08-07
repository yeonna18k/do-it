import React, { useRef, useState } from "react";
import AddDarkIcon from "@/public/icons/add_dark.svg";
import Image from "next/image";

const DEFAULT_IMG = "/images/img.svg";

export const ImageSection = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>(DEFAULT_IMG);

  const handleUploadImg = async () => {
    setPreviewImg(DEFAULT_IMG);
    if (imgRef.current?.files && imgRef.current?.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
    }
  };

  return (
    <div className="relative w-full h-[311px] flex justify-center bg-slate-50 border-dashed border-2 rounded-3xl border-slate-300">
      <Image
        src={previewImg}
        fill
        style={{ objectFit: previewImg === DEFAULT_IMG ? "none" : "cover" }}
        alt={"default img"}
      />
      <input type="file" id="file" className="hidden" accept="image/*" ref={imgRef} onChange={handleUploadImg} />
      <label
        htmlFor="file"
        className="absolute flex bottom-4 right-4 w-16 h-16 bg-slate-200 rounded-full justify-center hover:cursor-pointer"
      >
        <AddDarkIcon width={24} heigh={24} />
      </label>
    </div>
  );
};
