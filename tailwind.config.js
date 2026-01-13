/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        md: "700px",
        mlg: "1100px",
        lg: "1200px",
      },
      colors: {
        "tech-gold": "#B3A369",
        "navy-blue": "#003057",
        'light-default': '#FFFFFF',
        'dark-default': '#18181B',
        'gray-default': '#31313A',
        'cc-tan': '#D8C9B8',
        'cc-red': '#FF6F6F',
        'cc-blue': '#796FFF',
        'cc-orange': '#FFBE64',
        'linkedin-blue': '#0077B5',

        'std-red': '#FF5252',
        'std-green': '#2d6c2f'
      },
      textColor: {
        'light-primary': '#000000',
        'dark-primary': '#FFFFFF',
        'dark-secondary': '#E0E0E0',
      },
      fontFamily: {
        mohave: ['Mohave', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif']
      },
      backgroundImage: {
        'main': "url('./assets/stars.svg')"  
      }
    },
  },
  plugins: [],
} 