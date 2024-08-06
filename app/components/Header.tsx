"use client";

import React from "react";
import LogoSmImg from "@/public/images/logo_sm.svg";
import LogoLgImg from "@/public/images/logo_lg.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="border-b border-[#e9eef4] ">
      <div className="flex py-[10px] px-4 lg:max-w-[1200px] lg:mx-auto">
        <Link href={`/`}>
          <LogoLgImg className="hidden md:block" />
          <LogoSmImg className="md:hidden" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
