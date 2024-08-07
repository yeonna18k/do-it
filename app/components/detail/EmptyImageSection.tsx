"use client";

import React, { useRef } from "react";
import AddDarkIcon from "@/public/icons/add_dark.svg";
import { uploadImg } from "@/app/services/todo";
import { useMutation } from "@tanstack/react-query";
import DefaultImg from "@/public/images/img.svg";

interface ImageSectionProps {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const EmptyImageSection = ({ imgUrl, setImgUrl }: ImageSectionProps) => {
  const imgRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadImg(file),
    onSuccess: (data) => {
      setImgUrl(data.url);
      // alert("파일 업로드 성공");
    },
    onError: (error) => {
      console.error("파일 업로드 실패:", error);
      // alert("파일 업로드 실패");
    },
  });

  const handleUploadImg = async () => {
    if (imgRef.current?.files && imgRef.current?.files[0]) {
      const file = imgRef.current.files[0];
      uploadMutation.mutate(file);
    }
  };
  return (
    <div>
      <div className="relative w-full h-[311px] bg-slate-50 border-dashed border-2 rounded-3xl border-slate-300">
        <img src={imgUrl && imgUrl} />
        <DefaultImg />
        <input type="file" id="file" className="hidden" accept="image/*" ref={imgRef} onChange={handleUploadImg} />
        <label
          htmlFor="file"
          className="absolute flex bottom-4 right-4 w-16 h-16 bg-slate-200 rounded-full justify-center hover:cursor-pointer"
        >
          <AddDarkIcon width={24} heigh={24} />
        </label>
      </div>
    </div>
  );
};
