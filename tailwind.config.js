/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          "0%, 100%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        bounceIn: "bounceIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
