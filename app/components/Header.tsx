"use client";

import React from "react";
import LogoImg from "@/public/images/logo_sm.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex py-[10px] px-4 border-b border-[#e9eef4]">
      <Link href={`/`}>
        <LogoImg />
      </Link>
    </div>
  );
};

export default Header;
