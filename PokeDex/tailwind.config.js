export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'pokedex-title': "url('/src/assets/imgs/Pokédex_logo.png')",
        'pokeball' : "url('/src/assets/imgs/pokeball.png')",
      }),
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        ping: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '75%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}