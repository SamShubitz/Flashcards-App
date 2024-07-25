import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "white",
        secondary: "black",
        background: "#CBC1AE",
        accent: "#cec0d1",
        text: "#2c3e50",
      },
    },
  },
  plugins: [],
};
export default config;
