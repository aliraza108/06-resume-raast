/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        primary: "#0D0D0D",
        surface: "#1A1A2E",
        accentHot: "#E94560",
        accentGlow: "#F5A623",
        accentCool: "#00F5D4",
        textPrimary: "#FFFFFF",
        textSecondary: "#A0A0B0"
      },
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 20px rgba(233, 69, 96, 0.5)"
      },
      backgroundImage: {
        hotGlow: "linear-gradient(135deg, #E94560, #F5A623)"
      }
    }
  },
  plugins: []
};
