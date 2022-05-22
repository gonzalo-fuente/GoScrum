module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": {
          50: "#ffa295",
          100: "#ff8f80",
          200: "#ff7d6b",
          300: "#ff6a55",
          400: "#ff5840",
          500: "#ff452b",
          600: "#e63e27",
          700: "#cc3722",
          800: "#b3301e",
          900: "#99291a",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
