/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: { 
    extend: {
        colors: {
            "black-100": "#202020",
            "black-80": "#66666E",
            "black-50": "#9999A1",
            "black-20": "#E6E6E9",
            "black-10": "#F4F4F6",
            "yellow-100": "#FFB800",
            "yellow-80": "#FFD100",
            "red-100": "#FF3D00"
        },
        fontFamily: { 
            "inter": ['Inter', 'sans-serif']
        } 
    }, 
}, 
  plugins: [],
}