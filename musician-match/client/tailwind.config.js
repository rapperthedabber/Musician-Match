/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",


  // Or if using `src` directory:
],
  theme: {
    extend: {
      keyframes:{
        form: {
          '50%': {transform: 'rotateX(180deg'}
        }
      }, 
      animation: {
        vflip: 'form 2s'
      }
    },

  },
  plugins: [],
  
}