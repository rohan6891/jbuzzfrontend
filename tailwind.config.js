/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f6f0',
          100: '#e6eadb',
          200: '#d1d9bc',
          300: '#b5c396',
          400: '#9aad77',
          500: '#839760',
          600: '#67784c',
          700: '#4f5c3b',
          800: '#3d462e',
          900: '#2f3624',
        },
        secondary: {
          50: '#fdf5f3',
          100: '#fae7e3',
          200: '#f5cec5',
          300: '#eeab9d',
          400: '#e47e6a',
          500: '#d85c45',
          600: '#c14631',
          700: '#a03829',
          800: '#852f25',
          900: '#6f2921',
        },
        neutral: {
          50: '#f8f7f4',
          100: '#efeae4',
          200: '#dfd5ca',
          300: '#cbb9a8',
          400: '#b39784',
          500: '#a07e69',
          600: '#8b6755',
          700: '#735447',
          800: '#60463d',
          900: '#513c35',
        }
      }
    }
  },
  plugins: []
};