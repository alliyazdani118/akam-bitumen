/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces — the site is dark by design (≈90% dark backgrounds).
        base: '#0B0F12',
        surface: '#11171C',
        card: '#171D22',
        deep: '#080B0D',
        footer: '#050708',
        line: '#303940',
        hairline: 'rgba(255,255,255,0.06)',
        // Type
        ink: '#F5F5F5',
        muted: '#B7BEC5',
        faint: '#858E96',
        // Brand — industrial orange
        brand: {
          50: '#FFF5E8',
          100: '#FFE7C7',
          200: '#FFD08F',
          300: '#FFB44D',
          400: '#FF9800',
          500: '#FF8A00',
          600: '#E87500',
          700: '#BF5F00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '1280px',
      },
      borderRadius: {
        card: '3px',
        control: '2px',
      },
      boxShadow: {
        header: '0 14px 34px -24px rgba(0,0,0,0.95)',
        card: '0 28px 60px -40px rgba(0,0,0,0.95)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 500ms cubic-bezier(0.22,0.61,0.36,1) both',
        'fade-in': 'fade-in 400ms ease-out both',
      },
    },
  },
  plugins: [],
};
