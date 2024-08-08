import localFont from "@next/font/local";

export const nanumSquare = localFont({
  src: [
    {
      path: "../../public/font/NanumSquareB.otf",
      weight: "700",
    },
    {
      path: "../../public/font/NanumSquareEB.otf",
      weight: "800",
    },
    {
      path: "../../public/font/NanumSquareR.otf",
      weight: "400",
    },
  ],
  variable: "--font-nanumSquare",
});
