module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'slide-down': 'slideDown 0.5s ease-out forwards'
      }, screens: {
        'lg': '1000px',  
      },
      colors: {
        brandBrown: '#6e260e',
      }
    }
  },
  plugins: [],
}
