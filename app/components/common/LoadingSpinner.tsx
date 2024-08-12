import React from "react";
import * as animationData from "@/app/utils/animation.json";
import Lottie from "lottie-react";

export const LoadingSpinner = () => {
  return (
    <div className="h-full flex justify-start items-center">
      <Lottie animationData={animationData} />
    </div>
  );
};
