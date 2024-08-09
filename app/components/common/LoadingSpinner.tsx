import React from "react";
import * as animationData from "@/app/utils/animation.json";
import Lottie from "react-lottie";

export const LoadingSpinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className="h-full flex justify-start items-center">
      <Lottie options={defaultOptions} />
    </div>
  );
};
