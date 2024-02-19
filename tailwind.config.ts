import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#9333ea",
          secondary: "#22d3ee",
          accent: "#a5f3fc",
          neutral: "#130208",
          "base-100": "#fff2ea",
          info: "#00e1ff",
          success: "#009f5c",
          warning: "#e9be00",
          error: "#d1003d",
          body: {
            "background-color": "#f9fafb"
          }
        },
      },
    ],
  },
};
export default config;
