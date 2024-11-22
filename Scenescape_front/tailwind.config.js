/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          50: "#f2fbf9",
          100: "#d3f4eb",
          200: "#91e3cf",
          300: "#72d6c1",
          400: "#45bca7",
          500: "#2ca08d",
          600: "#218073",
          700: "#1e675d",
          800: "#1c534c",
          900: "#1c4541",
          950: "#0a2926",
        },
      },

      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "80%": {
            width: "100%",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      animation: {
        typing: "typing 6s steps(20) infinite alternate, blink .7s infinite",
      },
    },
  },
  plugins: [],
};
