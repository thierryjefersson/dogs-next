import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "800px",
        },
      },
      fontFamily: {
        primary: "Helvetica, Arial, sans-serif",
        secundary: ["var(--font-spectral)"],
      },
      colors: {
        primary: "#fb1",
        secundary: "#764701",
        "default-txt-color": "#333",
      },
      keyframes: {
        left: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { transform: "initial", opacity: "1" },
        },
      },
      animation: {
        left: "left .3s forwards",
      },
    },
  },
  plugins: [],
};
export default config;
