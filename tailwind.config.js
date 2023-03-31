/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width:{
        '1px':'1px',
        '375':'375px',
        '1024':'1024px'
      },
      height:{
        '500px':'500px'
      },
      backgroundImage: {
        'user-vip': "url('/src/assets/user_vip.png')",
      }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#294E80',
      'secondary': '#ffed4a',
      'danger': '#FBFBFB',
      'black-opacity-500':'rgba(0,0,0,.5)',
      'origan':'#FE7738',
      'red':'red',
      
     }),
     textColor: theme => ({
      ...theme('colors'),
      'primary': '#FFA700',
      'plead':'#555555',
      'red':'red',
      'AE5A2A':'#AE5A2A'
     }),
     gradientColorStops: theme => ({
      ...theme('colors'),
      'primary': '#FF9344',
      'secondary': '#FE5D2D',
     }),
     borderRadius:{
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      '4xl':'3rem'
     }
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // 引入插件
  ],
}
