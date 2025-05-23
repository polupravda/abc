import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
// import defaultTheme from "tailwindcss/defaultTheme"; // Reverted: defaultTheme import removed

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: "#440C7E",
        "persian-indigo": "#330C67",
        "electric-purple": "#CC00EF",
        "chrysler-blue": "#2500DF",
        mauveine: "#8D00A6",
        "magenta-dye": "#D20682",
        raspberry: "#DB034B",
        ochre: "#C67200",
        "princeton-orange": "#F68D00",
        aureolin: "#FAED1A",
      },
      // fontFamily: { // Reverted: fontFamily extension removed
      //   sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      // },
      animation: {
        "bounce-custom": "bounce-slower 1.5s infinite",
        "pulse-custom": "pulse-mic 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
      },
      keyframes: {
        "bounce-slower": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "pulse-mic": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-outline-ochre": {
          textShadow: `-1px -1px 0 ${theme("colors.ochre")}, 1px -1px 0 ${theme(
            "colors.ochre"
          )}, -1px 1px 0 ${theme("colors.ochre")}, 1px 1px 0 ${theme(
            "colors.ochre"
          )}`,
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};

export default config;
