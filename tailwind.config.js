/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#005CA9',
          red: '#E30613',
        },
        accent: {
          green: '#25D366', // WhatsApp Brand Color for the button
          hover: '#1DA851', // Darker shade on hover
        },
      }
    },
  },
  plugins: [],
}