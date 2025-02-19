// tailwind.config.js
@type {import('tailwindcss').Config}
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelPink: "#ffd1dc",
        pastelBlue: "#a2d5f2",
        pastelGreen: "#c2f0c2",
        pastelYellow: "#fff4c2",
        vibrantPurple: "#9d4edd",
      },
      fontFamily: {
        handwriting: ["Indie Flower", "cursive"],
      },
    },
  },
  darkMode: "class", // Enables dark mode using a class
  theme: {
    extend: {},
  },
  plugins: [],
};
