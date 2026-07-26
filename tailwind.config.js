/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm gold / champagne — the boutique luxury accent
        gold: {
          50: '#FBF7F0',
          100: '#F5EDDD',
          200: '#EBD9B5',
          300: '#DFC28A',
          400: '#D4A85E',
          500: '#C9933F',
          600: '#A8762F',
          700: '#875C26',
          800: '#664420',
          900: '#4A3217',
        },
        // Deep wine / burgundy — the elegant primary
        wine: {
          50: '#FBF3F4',
          100: '#F7E8EA',
          200: '#EFD1D5',
          300: '#E0AAB1',
          400: '#CC7A85',
          500: '#B85161',
          600: '#993D4D',
          700: '#7A2F3D',
          800: '#5C2430',
          900: '#3D1920',
        },
        // Neutral warm stone
        stone: {
          50: '#FAF9F7',
          100: '#F2F0EB',
          200: '#E5E1D8',
          300: '#D2CBC0',
          400: '#B5AB9C',
          500: '#948877',
          600: '#756B5D',
          700: '#5A5247',
          800: '#3F3A33',
          900: '#292622',
        },
        success: {
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          400: '#FACC15',
          500: '#EAB308',
        },
        error: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-down': 'fadeDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'slow-zoom': 'slowZoom 20s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
};
