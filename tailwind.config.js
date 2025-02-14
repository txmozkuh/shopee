/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shopee: '#ee4d2d'
      },
      backgroundImage: {
        'shopee-99': 'url("/shopee9.9.png")'
      }
    }
  }
  // plugins: [require('@tailwindcss/line-clamp')]
}
