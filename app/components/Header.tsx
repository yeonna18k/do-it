"use client";

import React from "react";
import LogoImg from "@/public/images/logo_sm.svg";

export const Header = () => {
  return (
    <div className="py-[10px] px-4 border-b">
      <LogoImg />
    </div>
  );
};

export default Header;
