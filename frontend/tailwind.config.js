/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        greycliff: ['Greycliff CF', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#EEE3FF',
          600: '#8054C7',
          700: '#5A3696',
        },
        secondary: {
          600: '#63D838', // Definiendo secondary-600
        },
        gray:{
          200:'#F3F4F6',
          300:'#E5E7EB',
          400:'#6b7280',
        },
      },
    },
  },
  plugins: [],
};
