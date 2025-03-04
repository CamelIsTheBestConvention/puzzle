/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        loadingBar: "loadingBar 2s infinite ease-in-out",
      },
      keyframes: {
        loadingBar: {
          "0%": { width: "0%" },
          "50%": { width: "80%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
}
