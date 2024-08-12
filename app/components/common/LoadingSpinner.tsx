import React from "react";
import * as animationData from "@/app/utils/animation.json";
import Lottie from "lottie-react";

// LoadingSpinner 컴포넌트: 로딩 상태를 나타내기 위한 스피너 애니메이션을 렌더링
export const LoadingSpinner = () => {
  return (
    <div className="h-full flex justify-start items-center">
      {/* Lottie 컴포넌트를 사용하여 JSON 애니메이션 데이터를 렌더링 */}
      <Lottie animationData={animationData} />
    </div>
  );
};
