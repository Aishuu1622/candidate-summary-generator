/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#050816",
        panel: "#0b1120",
        primary: "#6366f1",
        violet: "#8b5cf6",
        success: "#22c55e",
        warning: "#f59e0b",
      },
      boxShadow: {
        glow: "0 18px 80px rgba(99, 102, 241, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
