/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — architectural deep navy
        navy: {
          50: '#F4F7FA',
          100: '#E7EEF5',
          200: '#C9D8E6',
          300: '#9DB6CB',
          400: '#63839F',
          500: '#3F6183',
          600: '#2A4761',
          700: '#1C344C',
          800: '#12273C',
          900: '#0C1E33',
          950: '#071526',
        },
        // Accent — muted champagne / subtle gold
        champagne: {
          50: '#FBF8F2',
          100: '#F5EFE2',
          200: '#EBDCC2',
          300: '#DCC5A0',
          400: '#CBAA7C',
          500: '#B9905D',
          600: '#9C7648',
        },
        ink: '#0A1A2A',
        paper: '#FBFAF7',
        mist: '#F1F4F8',
        line: '#E4E8EE',
      },
      fontFamily: {
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '6px',
        control: '3px',
      },
      boxShadow: {
        card: '0 20px 45px -32px rgba(10, 26, 42, 0.55)',
        lift: '0 34px 70px -34px rgba(10, 26, 42, 0.55)',
        header: '0 10px 30px -22px rgba(10, 26, 42, 0.45)',
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-scale': {
          from: { opacity: '0', transform: 'scale(1.03)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.85s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'hero-scale': 'hero-scale 1.6s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
