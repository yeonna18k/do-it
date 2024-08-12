import React, { useEffect, useRef, useState } from "react";
import AddDarkIcon from "@/public/icons/add_dark.svg";
import EditIcon from "@/public/icons/edit.svg";
import Image from "next/image";

const DEFAULT_IMG = "/images/img.svg";

export const ImageSection = ({
  imgUrl,
  setImgFile,
}: {
  imgUrl: string | undefined | null;
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>(DEFAULT_IMG);

  // 이미지 업로드 및 미리보기 처리 함수
  const handleUploadImg = async () => {
    setPreviewImg(DEFAULT_IMG);
    if (imgRef.current?.files && imgRef.current?.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      setImgFile(file);
    }
  };

  // imgUrl 변경 시 미리보기 이미지 설정
  useEffect(() => {
    imgUrl && setPreviewImg(imgUrl);
  }, [imgUrl]);

  return (
    <div
      className={`relative w-full lg:w-[384px] h-[311px] flex justify-center bg-slate-50 ${imgUrl ? "border-none" : "border-dashed"} border-2 rounded-3xl border-slate-300`}
    >
      {/* 미리보기 이미지, imgUrl의 이미지 렌더링 */}
      <Image
        src={previewImg}
        fill
        priority
        sizes="width: full"
        style={{ objectFit: previewImg === DEFAULT_IMG ? "none" : "cover", borderRadius: "24px" }}
        alt={"default img"}
      />
      {/* 이미지 파일 입력 필드, 숨겨져 있음 */}
      <input type="file" id="file" className="hidden" accept="image/*" ref={imgRef} onChange={handleUploadImg} />
      {/* 업로드된 이미지가 있을 경우 편집 아이콘, 없을 경우 추가 아이콘 표시 */}
      {imgUrl ? (
        <label
          htmlFor="file"
          className="absolute flex bottom-4 right-4 w-16 h-16 bg-slate-800/60 border-2 border-black rounded-full justify-center items-center hover:cursor-pointer"
        >
          <EditIcon width={24} heigh={24} className="opacity-100" />
        </label>
      ) : (
        <label
          htmlFor="file"
          className="absolute flex bottom-4 right-4 w-16 h-16 bg-slate-200 rounded-full justify-center hover:cursor-pointer"
        >
          <AddDarkIcon width={24} heigh={24} />
        </label>
      )}
    </div>
  );
};
