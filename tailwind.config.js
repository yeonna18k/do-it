/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "744px",
        lg: "1200px",
      },
      boxShadow: {
        input: "1px 3px black",
      },
      backgroundImage: {
        memo: "url('/images/memo.svg')",
        emptyimg: "url('/images/img.svg')",
      },
      fontFamily: {
        sans: ["var(--font-nanumSquare)"],
      },
    },
  },
  mode: "jit",
  plugins: [],
};
