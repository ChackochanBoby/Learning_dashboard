/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        "dark-background": "#1e1e1e",
        "dark-primary-text": "#eaeaea",
        "dark-secondary-text": "#b0b0b0",
        "dark-accent": "#009688",
        "dark-button-background": "#333333",
        "dark-card-background": "#333333",
        "dark-border": "#444444",
        "dark-navbar-background": "#2b2b2b",
        "dark-navbar-text": "#f5f5f5",
        "dark-navbar-border": "#3a3a3a",

        // Light mode colors
        "light-background": "#f5f5f5",
        "light-primary-text": "#333333",
        "light-secondary-text": "#666666",
        "light-accent": "#009688",
        "light-button-background": "#ffffff",
        "light-card-background": "#ffffff",
        "light-border": "#cccccc",
        "light-navbar-background": "#ffffff",
        "light-navbar-text": "#333333",
        "light-navbar-border": "#dddddd",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      borderColor: ["dark"],
    },
  },
  plugins: [],
};
